import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Star, Award, Zap, Bug, HeartHandshake } from 'lucide-react';
import API, { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import Loader from '../components/common/Loader';

const Home = () => {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [activeTab, setActiveTab] = useState('featured');
  const [loading, setLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.allSettled([
        API.get('/categories'),
        API.get('/products?limit=20')
      ]);

      if (catRes.status === 'fulfilled' && Array.isArray(catRes.value.data) && catRes.value.data.length > 0) {
        setCategories(catRes.value.data);
      }
      if (prodRes.status === 'fulfilled' && prodRes.value.data?.products && Array.isArray(prodRes.value.data.products) && prodRes.value.data.products.length > 0) {
        setProducts(prodRes.value.data.products);
      }
    } catch (err) {
      console.warn('API error, using fallback catalog:', err);
    }
  };

  const shoeCareProducts = products.filter(p => p.category?.slug === 'shoe-care' || p.category === 'shoe-care').slice(0, 4);
  const homeCleaningProducts = products.filter(p => p.category?.slug === 'home-cleaning' || p.category?.slug === 'laundry-care').slice(0, 4);
  const mosquitoProducts = products.filter(p => p.category?.slug === 'mosquito-protection').slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const filteredProducts = products.filter(p => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}

      {/* 1. Full-Width Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 rounded-b-[40px] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.18),transparent_60%)]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
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
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-950/50 hover:shadow-emerald-600/40 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Shop Full Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/category/shoe-care"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all text-center"
              >
                Shop Kick Whito Sneaker Cleaner
              </Link>
            </div>

            {/* Metrics */}
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

          {/* Right Product Composition */}
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

      {/* 2. Trust / Service Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="flex items-center space-x-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Quality Formulations</h4>
              <p className="text-xs text-slate-500 mt-0.5">Reliable active home-care ingredients</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Fast Delivery</h4>
              <p className="text-xs text-slate-500 mt-0.5">Quick courier across all Pakistan cities</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Secure Shopping</h4>
              <p className="text-xs text-slate-500 mt-0.5">Safe Cash on Delivery at doorstep</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Customer Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Dedicated WhatsApp & Phone help</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Shop By Category Visual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Organized Home Solutions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Shop By Category</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl border border-slate-200/70 p-4 shadow-card hover:shadow-card-hover transition-all duration-300 text-center flex flex-col items-center justify-between space-y-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 overflow-hidden p-2 group-hover:scale-110 transition-transform">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">{cat.name}</h3>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{cat.productCount || 0} Products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Handpicked Essentials</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Featured Products</h2>
          </div>

          <div className="flex space-x-2 mt-4 sm:mt-0 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'featured' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'bestsellers' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'new' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. Dedicated SHOE CARE Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-[10px] uppercase rounded-full">
              FOOTWEAR PRESERVATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Kick Shoe Care — Restore & Polish Footwear
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From white sneaker scuff removers (<strong className="text-emerald-400">Kick Whito</strong>) to wax polishes, shiner sponges, and horsehair buffing brushes.
            </p>
            <Link
              to="/category/shoe-care"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg transition-all"
            >
              <span>Explore Shoe Care Range</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shoeCareProducts.slice(0, 2).map((p) => (
              <ProductCard key={p._id} product={p} onQuickView={(prod) => setQuickViewProduct(prod)} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Dedicated HOME CLEANING & LAUNDRY Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Hygiene & Whitening</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Home Cleaning & Laundry Care</h2>
          </div>
          <Link to="/category/home-cleaning" className="text-xs font-bold text-emerald-600 hover:underline">View All →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {homeCleaningProducts.map((p) => (
            <ProductCard key={p._id} product={p} onQuickView={(prod) => setQuickViewProduct(prod)} />
          ))}
        </div>
      </section>

      {/* 7. Dedicated MOSQUITO PROTECTION Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bug className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-white">45-Night Mosquito Protection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Odorless electric refills and skin-safe aloe vera lotions for continuous family safety against dengue mosquitoes.
            </p>
            <Link to="/category/mosquito-protection" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs">
              Shop Insect Repellents
            </Link>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mosquitoProducts.map((p) => (
              <ProductCard key={p._id} product={p} onQuickView={(prod) => setQuickViewProduct(prod)} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Our Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Customer Favorites</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Our Best Sellers</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p._id} product={p} onQuickView={(prod) => setQuickViewProduct(prod)} />
          ))}
        </div>
      </section>

      {/* 9. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Brand Assurance</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Why Choose Kick Home Care?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Trusted Quality</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Formulated with concentrated active ingredients for peak cleaning power.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Effective Products</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Instant whitening scuff removal for shoes and 15-minute liquid drain clog clearing.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Fast Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Prompt courier delivery to Lahore, Karachi, Islamabad, and across Pakistan.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Customer Satisfaction</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Dedicated support team ensuring smooth shopping and cash on delivery verification.</p>
          </div>
        </div>
      </section>

      {/* 10. Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Verified Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">What Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 text-xs">Rayyan Ansari</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Kick Whito worked like magic on my white Adidas sneakers! Removed dirty scuffs in 2 minutes. Highly recommend!"
            </p>
            <span className="text-[10px] text-emerald-700 font-bold block">Purchased: Kick Whito White Sneaker Cleaner</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 text-xs">Saman Malik</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Best liquid bleach in Pakistan. Bleached my white bedsheets without damaging fabric fibers or making them yellow."
            </p>
            <span className="text-[10px] text-emerald-700 font-bold block">Purchased: Kick Bleach Liquid Ultra Clean</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
