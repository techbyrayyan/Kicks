'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Star, Award, Zap, Bug, HeartHandshake } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';

const FALLBACK_CATEGORIES = [
  {
    name: 'Shoe Care',
    slug: 'shoe-care',
    description: 'Premium shoe shiners, white sneaker cleaners, polish sponges, shoe wax, deodorizers, and brushes.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Laundry Care',
    slug: 'laundry-care',
    description: 'High performance bleach liquid, blue whitening agents, and fabric conditioners for brilliant clothes.',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Home Cleaning',
    slug: 'home-cleaning',
    description: 'All-purpose surface cleaners, descaling bathroom sprays, and heavy duty toilet cleaner power gels.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dish Care',
    slug: 'dish-care',
    description: 'Tough grease-cutting dishwashing liquids infused with lemon oil and heavy duty dish sponges.',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Drain Care',
    slug: 'drain-care',
    description: 'Fast acting liquid drain openers and pipe clog unblocker powders for sinks and bathroom drains.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mosquito Protection',
    slug: 'mosquito-protection',
    description: 'Electric liquid mosquito repellents, anti-mosquito skin lotions, coils, and multi-insect sprays.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  }
];

export default function HomePage() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.allSettled([
        axios.get('/api/categories'),
        axios.get('/api/products')
      ]);

      if (catRes.status === 'fulfilled' && catRes.value.data.success && Array.isArray(catRes.value.data.categories)) {
        setCategories(catRes.value.data.categories);
      }

      if (prodRes.status === 'fulfilled' && prodRes.value.data.success && Array.isArray(prodRes.value.data.products)) {
        setProducts(prodRes.value.data.products);
      }
    } catch (err) {
      console.warn('API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const shoeCareProducts = products.filter(p => p.category?.slug === 'shoe-care').slice(0, 4);
  const homeCleaningProducts = products.filter(p => p.category?.slug === 'home-cleaning' || p.category?.slug === 'laundry-care').slice(0, 4);
  const mosquitoProducts = products.filter(p => p.category?.slug === 'mosquito-protection').slice(0, 4);

  const filteredProducts = products.filter(p => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    return true;
  }).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}

      <main className="flex-1 space-y-16 pb-16">
        
        {/* 1. Hero Banner */}
        <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 rounded-b-[40px] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.18),transparent_60%)]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black tracking-wider uppercase shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kara Asani Zindagi Main • Premium Hygiene & Shoe Care</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                Powerful Home Care. <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  Impeccable Footwear Polish.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 font-normal">
                Experience Pakistan's top-rated cleaning solutions — from instant whitening <strong className="text-white">Kick Whito</strong> sneaker restorers to heavy duty liquid bleaches, drain openers, and 45-night electric mosquito repellents.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-950/50 hover:shadow-emerald-600/40 transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Shop Full Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/category/shoe-care"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all text-center"
                >
                  Shop Kick Whito Sneaker Cleaner
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="block text-2xl font-black text-white">99.9%</span>
                  <span className="text-[11px] text-slate-400 font-medium">Bacteria Elimination</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">Instant</span>
                  <span className="text-[11px] text-slate-400 font-medium">Sneaker White Restorer</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">100k+</span>
                  <span className="text-[11px] text-slate-400 font-medium">Happy Pakistani Homes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl space-y-4 relative">
                <div className="aspect-square w-full rounded-2xl bg-slate-900/80 overflow-hidden relative border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
                    alt="Kick Whito Sneaker Cleaner"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow-md">
                    HOT ITEM
                  </div>
                </div>

                <div className="flex justify-between items-center text-white pt-1">
                  <div>
                    <h3 className="text-base font-extrabold text-white">Kick Whito White Cleaner</h3>
                    <p className="text-xs text-slate-300">White Sneaker Restorer & Scuff Remover</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block">Rs. 250</span>
                    <span className="text-lg font-black text-emerald-400">Rs. 220</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Trust Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="flex items-center space-x-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Nationwide Delivery</h4>
                <p className="text-[11px] text-slate-500">Fast shipping across Pakistan</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Cash on Delivery</h4>
                <p className="text-[11px] text-slate-500">Pay at your door with safety</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Guaranteed Quality</h4>
                <p className="text-[11px] text-slate-500">100% genuine formulation</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Dedicated Support</h4>
                <p className="text-[11px] text-slate-500">WhatsApp & Phone assistance</p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Authentic Categories Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Product Categories</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Explore Kick Home Care Solutions</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group bg-white rounded-3xl border border-slate-200/80 p-4 text-center hover:shadow-card-hover transition-all duration-300 flex flex-col items-center justify-between"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 bg-slate-50 border border-slate-100 p-2">
                  <img src={c.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'} alt={c.name} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">{c.name}</h3>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Tabbed Product Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Featured Range</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Trending Kick Products</h2>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              {['featured', 'bestsellers', 'new'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id || p.slug} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </section>

        {/* 5. Shoe Care Spotlight Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Footwear Maintenance</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Kick Shoe Care & Whito Spotlight</h2>
                <p className="text-xs text-slate-300 mt-1">Restore white sneakers, polish formal leather, and protect boots from wear.</p>
              </div>
              <Link href="/category/shoe-care" className="mt-4 md:mt-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all">
                View All Shoe Care →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shoeCareProducts.map((p) => (
                <ProductCard key={p._id || p.slug} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Mosquito & Pest Control Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-full tracking-wider">
                PEST DEFENSE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">45-Night Electric Mosquito Repellents & Lotions</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Protect your family from dengue and vector mosquitoes. Odorless electric liquid refills and skin-safe aloe vera repellent lotions.
              </p>
              <Link href="/category/mosquito-protection" className="inline-block px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all">
                Shop Mosquito Defense →
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mosquitoProducts.map((p) => (
                <ProductCard key={p._id || p.slug} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
