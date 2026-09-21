'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import {
  ShoppingBag,
  Heart,
  Search,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Layers,
  Phone,
  LogOut,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';

const FALLBACK_CATEGORIES = [
  { name: 'Shoe Care', slug: 'shoe-care' },
  { name: 'Laundry Care', slug: 'laundry-care' },
  { name: 'Home Cleaning', slug: 'home-cleaning' },
  { name: 'Dish Care', slug: 'dish-care' },
  { name: 'Drain Care', slug: 'drain-care' },
  { name: 'Mosquito Protection', slug: 'mosquito-protection' }
];

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount, setIsCompareOpen } = useCompare();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);

  useEffect(() => {
    fetchCategories();

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
        setCategories(data.categories);
      } else {
        setCategories(FALLBACK_CATEGORIES);
      }
    } catch (err) {
      setCategories(FALLBACK_CATEGORIES);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const { data } = await axios.get(`/api/products?search=${encodeURIComponent(searchQuery)}`);
          if (data.success && Array.isArray(data.products)) {
            setSuggestions(data.products.slice(0, 5));
            setShowSuggestions(true);
          }
        } catch (err) {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full relative z-40">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-emerald-500/30">
              Kara Asani Zindagi Main
            </span>
            <span className="hidden sm:inline text-slate-400">
              Free Shipping Across Pakistan on Orders Over Rs. 2,000!
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="tel:+923210009008" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>0321 0009008</span>
            </a>
            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>
            <Link href="/track-order" className="hover:text-white transition-colors hidden sm:inline">
              Track Order
            </Link>
            {isAdmin && (
              <>
                <div className="h-3 w-px bg-slate-700"></div>
                <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin SaaS</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className={`w-full transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-4 border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  KICK<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-500 -mt-1">
                  Home Care
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar with Auto Suggestions */}
          <div className="hidden md:flex flex-1 max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center">
              <input
                type="text"
                placeholder="Search shoe care, bleach, drain openers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-slate-400 border-b border-slate-100 uppercase tracking-wider px-3">
                  Matching Products
                </div>
                <div className="divide-y divide-slate-50">
                  {suggestions.map(p => (
                    <Link
                      key={p._id}
                      href={`/product/${p.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-emerald-50/50 transition-colors"
                    >
                      <img
                        src={p.images?.[0] || 'https://via.placeholder.com/100'}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-800 truncate">{p.name}</div>
                        <div className="text-xs font-bold text-emerald-600">Rs. {p.salePrice > 0 ? p.salePrice : p.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2 text-slate-700 hover:text-emerald-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2 text-slate-700 hover:text-emerald-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative group">
                <Link
                  href="/account"
                  className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold hidden md:inline truncate max-w-[100px]">
                    {user.name?.split(' ')[0]}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-full border border-slate-200 hover:border-emerald-300 transition-all"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-full shadow-sm shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              <span className="bg-white text-emerald-700 text-xs font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Categories Bar (Desktop) */}
        <div className="hidden lg:block border-t border-slate-100 mt-3 pt-3">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <nav className="flex items-center gap-8">
              <Link
                href="/shop"
                className={`text-sm font-bold flex items-center gap-1.5 transition-colors ${pathname === '/shop' ? 'text-emerald-600' : 'text-slate-800 hover:text-emerald-600'}`}
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>All Products</span>
              </Link>

              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`text-sm font-medium transition-colors ${pathname === `/category/${cat.slug}` ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            <div className="text-xs font-medium text-slate-500">
              Need help? <a href="https://wa.me/923210009008" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    K
                  </div>
                  <span className="font-extrabold text-xl text-slate-900">KICK<span className="text-emerald-600">.</span></span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </form>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Categories
              </div>
              <nav className="flex flex-col space-y-2 mb-6">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  All Products
                </Link>
                {categories.map(c => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                  >
                    {c.name}
                  </Link>
                ))}
              </nav>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Quick Links
              </div>
              <div className="flex flex-col space-y-2">
                <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="p-2 text-sm text-slate-600">
                  Track Order
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2 text-sm text-slate-600">
                  Contact Us
                </Link>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="p-2 text-sm text-emerald-600 font-bold">
                    Admin SaaS Panel
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800">{user.name}</div>
                  <button onClick={logout} className="text-xs text-red-500 font-semibold flex items-center gap-1">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center bg-slate-900 text-white font-bold py-2.5 rounded-xl text-sm"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
