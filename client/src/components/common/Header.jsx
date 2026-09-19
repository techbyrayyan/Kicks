import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import API, { FALLBACK_CATEGORIES } from '../../services/api';

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

  const navigate = useNavigate();
  const location = useLocation();
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
  }, [location]);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data);
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
          const { data } = await API.get(`/products/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
          if (Array.isArray(data)) {
            setSuggestions(data);
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
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full relative z-40">
      {/* Top Banner Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1 text-emerald-400" /> Kara Asani Zindagi Main
            </span>
            <span className="hidden md:inline text-slate-400">Free Express Delivery across Pakistan on orders over Rs. 2,000</span>
          </div>
          <div className="flex items-center space-x-6 text-slate-300">
            <span className="hidden sm:flex items-center text-xs text-slate-400">
              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-400" /> +92 321 000 9008
            </span>
            {isAdmin && (
              <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 glass-nav shadow-sm border-b border-slate-200/80 py-3' : 'bg-white border-b border-slate-100 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                KICK <span className="text-emerald-600">CARE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-1">Home & Hygiene</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search bleach, dishwash, shoe polish, whito..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-transparent focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 rounded-full text-sm text-slate-800 placeholder-slate-400 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 border-b border-slate-50">
                  Products Found ({suggestions.length})
                </div>
                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {suggestions.map((p) => (
                    <Link
                      key={p._id}
                      to={`/product/${p.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center space-x-3 p-3 hover:bg-slate-50 transition-colors"
                    >
                      <img src={p.images?.[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-slate-100" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-slate-900 truncate">{p.name}</h4>
                        <span className="text-xs text-emerald-600 font-semibold">Rs. {p.salePrice > 0 ? p.salePrice : p.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-emerald-600 transition-colors">Shop All</Link>
            
            {/* Category Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-emerald-600 transition-colors py-2">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-2">
                {Array.isArray(categories) && categories.map((c) => (
                  <Link
                    key={c._id}
                    to={`/category/${c.slug}`}
                    className="flex items-center space-x-2 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors text-xs font-medium"
                  >
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" className="hover:text-emerald-600 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
          </div>

          {/* Action Icons Right */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors hidden sm:block"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <span className="hidden sm:inline text-xs font-bold">{itemCount} items</span>
              {itemCount > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative group">
                <Link to="/account" className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                </Link>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-3 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link to="/account" className="flex items-center space-x-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg">
                    <UserIcon className="w-4 h-4 text-emerald-600" /> Dashboard
                  </Link>
                  <Link to="/account/orders" className="flex items-center space-x-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" /> My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center space-x-2 px-3 py-2 text-xs text-emerald-700 font-semibold hover:bg-emerald-50 rounded-lg">
                      <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center space-x-1"
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-lg font-bold text-slate-900">Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border rounded-xl text-xs outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <nav className="mt-6 flex flex-col space-y-4 text-sm font-medium text-slate-700">
              <Link to="/" className="hover:text-emerald-600">Home</Link>
              <Link to="/shop" className="hover:text-emerald-600">Shop Catalog</Link>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</span>
                <div className="mt-2 space-y-2 pl-2">
                  {Array.isArray(categories) && categories.map((c) => (
                    <Link key={c._id} to={`/category/${c.slug}`} className="block text-xs text-slate-600 hover:text-emerald-600">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/about" className="hover:text-emerald-600 pt-2 border-t border-slate-100">About Us</Link>
              <Link to="/contact" className="hover:text-emerald-600">Contact Us</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
