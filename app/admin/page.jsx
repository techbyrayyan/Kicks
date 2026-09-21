'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { LayoutDashboard, ShoppingBag, Package, Users, DollarSign, Layers } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const { data } = await axios.get('/api/admin/stats', { headers });
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-xs font-bold text-slate-400">Loading SaaS Dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Admin Control Center</h1>
        <p className="text-xs text-slate-500">Real-time store performance, revenue metrics, and inventory stats.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <span className="text-xs font-bold uppercase text-slate-400">Total Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">Rs. {stats?.totalRevenue || 0}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-blue-600">
            <span className="text-xs font-bold uppercase text-slate-400">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.totalOrders || 0}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-purple-600">
            <span className="text-xs font-bold uppercase text-slate-400">Products</span>
            <Package className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.totalProducts || 0}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <span className="text-xs font-bold uppercase text-slate-400">Pending Orders</span>
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.pendingOrders || 0}</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-extrabold text-slate-900">Recent Customer Orders</h3>
          <Link href="/admin/orders" className="text-xs text-emerald-600 font-bold hover:underline">Manage All Orders →</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentOrders.map(o => (
                <tr key={o._id}>
                  <td className="py-3 px-2 font-bold text-slate-900">{o.orderId}</td>
                  <td className="py-3 px-2">{o.shippingAddress?.fullName || o.user?.name}</td>
                  <td className="py-3 px-2 font-black text-emerald-600">Rs. {o.grandTotal}</td>
                  <td className="py-3 px-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
