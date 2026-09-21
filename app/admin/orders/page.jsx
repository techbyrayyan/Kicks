'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const { data } = await axios.get('/api/orders', { headers });
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const { data } = await axios.put(`/api/admin/orders/${orderId}/status`, {
        orderStatus: newStatus
      }, { headers });

      if (data.success) {
        setOrders(prev => prev.map(o => o.orderId === orderId ? data.order : o));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePaymentChange = async (orderId, newPaymentStatus) => {
    try {
      setUpdatingId(orderId);
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const { data } = await axios.put(`/api/admin/orders/${orderId}/status`, {
        paymentStatus: newPaymentStatus
      }, { headers });

      if (data.success) {
        setOrders(prev => prev.map(o => o.orderId === orderId ? data.order : o));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update payment status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="text-center py-20 text-xs font-bold text-slate-400">Loading Order Management...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Order Management Panel</h1>
        <p className="text-xs text-slate-500">Update order fulfillment status, manage Cash on Delivery payments & restock items.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="divide-y divide-slate-100">
          {orders.map((o) => (
            <div key={o._id} className="py-4 first:pt-0 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-black text-slate-900 text-sm mr-2">{o.orderId}</span>
                  <span className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Dropdown */}
                  <select
                    value={o.orderStatus}
                    disabled={updatingId === o.orderId}
                    onChange={(e) => handleStatusChange(o.orderId, e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-1.5 outline-none focus:border-emerald-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled (Restock)</option>
                  </select>

                  {/* Payment Status Dropdown */}
                  <select
                    value={o.paymentStatus}
                    disabled={updatingId === o.orderId}
                    onChange={(e) => handlePaymentChange(o.orderId, e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-1.5 outline-none focus:border-emerald-500"
                  >
                    <option value="Pending">Payment: Pending</option>
                    <option value="Paid">Payment: Paid</option>
                    <option value="Failed">Payment: Failed</option>
                  </select>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="font-bold text-slate-700 block">Customer Info:</span>
                  <span className="text-slate-900 font-extrabold">{o.shippingAddress?.fullName}</span>
                  <span className="text-slate-500 block">Phone: {o.shippingAddress?.phone}</span>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block">Delivery Address:</span>
                  <span className="text-slate-800">{o.shippingAddress?.addressLine}, {o.shippingAddress?.city}, {o.shippingAddress?.province}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-700">Purchased Items:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {o.orderItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-8 h-8 object-contain rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-slate-800 block truncate">{item.name}</span>
                        <span className="text-slate-400 text-[10px]">Qty: {item.quantity} | Rs. {item.price} each</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right text-xs font-black text-slate-900">
                Grand Total: <span className="text-emerald-600 text-sm">Rs. {o.grandTotal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
