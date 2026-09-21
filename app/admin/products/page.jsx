'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [stock, setStock] = useState('100');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ]);
      if (prodRes.data.success) setProducts(prodRes.data.products);
      if (catRes.data.success) {
        setCategories(catRes.data.categories);
        if (catRes.data.categories.length > 0) setCategoryId(catRes.data.categories[0]._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setPrice('');
    setSalePrice('');
    setStock('100');
    setImage('');
    setShowModal(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setName(p.name);
    setDescription(p.description);
    setCategoryId(p.category?._id || p.category);
    setPrice(p.price);
    setSalePrice(p.salePrice || 0);
    setStock(p.stock);
    setImage(p.images?.[0] || '');
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const payload = {
        name,
        description,
        category: categoryId,
        price: Number(price),
        salePrice: Number(salePrice) || 0,
        stock: Number(stock),
        images: image ? [image] : ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80']
      };

      if (editingId) {
        payload._id = editingId;
        await axios.put('/api/admin/products', payload, { headers });
      } else {
        await axios.post('/api/admin/products', payload, { headers });
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      await axios.delete(`/api/admin/products?id=${id}`, { headers });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  if (loading) return <div className="text-center py-20 text-xs font-bold text-slate-400">Loading Product Catalog...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Products Catalog Management</h1>
          <p className="text-xs text-slate-500">Add new products, adjust pricing, category tags & inventory stock levels.</p>
        </div>

        <button onClick={openCreateModal} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold">
              <th className="py-3 px-2">Product</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Stock</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p._id}>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 border" />
                    <div>
                      <span className="font-bold text-slate-900 block truncate max-w-xs">{p.name}</span>
                      <span className="text-[10px] text-slate-400">SKU: {p.sku}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 font-bold text-emerald-600">{p.category?.name || 'Category'}</td>
                <td className="py-3 px-2 font-black text-slate-900">Rs. {p.salePrice > 0 ? p.salePrice : p.price}</td>
                <td className="py-3 px-2 font-bold">{p.stock} units</td>
                <td className="py-3 px-2 text-right space-x-2">
                  <button onClick={() => openEditModal(p)} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">{editingId ? 'Edit Product' : 'Add New Product'}</h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category *</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-semibold">
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regular Price (Rs.) *</label>
                  <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sale Price (Rs.)</label>
                  <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Stock Quantity *</label>
                <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" placeholder="https://..." />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
