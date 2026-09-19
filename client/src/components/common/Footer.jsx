import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Award, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900 mt-20">
      
      {/* Brand Value Props Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Quality Formulations</h4>
              <p className="text-xs text-slate-400">100% authentic Kick products</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Fast Nationwide Delivery</h4>
              <p className="text-xs text-slate-400">Courier delivery across Pakistan</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Easy Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free 7 day replacement</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Cash on Delivery</h4>
              <p className="text-xs text-slate-400">Safe payment upon doorstep arrival</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg">
              K
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              KICK <span className="text-emerald-500">CARE</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Kick Home Care is Pakistan's premier brand for home cleaning, surface hygiene, bleach whitening, drain opener solutions, and shoe care essentials. Kara Asani Zindagi Main.
          </p>
          <div className="pt-2 text-xs text-slate-400 space-y-2">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>First Floor 1-F Block, Main Gulshan-e-Ravi, Lahore, Pakistan</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>+92 321 000 9008</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>info@kickhomecare.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Shopping</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">All Products</Link></li>
            <li><Link to="/category/home-cleaning-laundry" className="hover:text-emerald-400 transition-colors">Bleach & Dishwash</Link></li>
            <li><Link to="/category/shoe-care-essentials" className="hover:text-emerald-400 transition-colors">Shoe Care & Whito</Link></li>
            <li><Link to="/category/bathroom-drain-care" className="hover:text-emerald-400 transition-colors">Drain Openers</Link></li>
            <li><Link to="/category/pest-control-protection" className="hover:text-emerald-400 transition-colors">Pest Repellents</Link></li>
          </ul>
        </div>

        {/* Account & Help */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Account & Policies</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/account" className="hover:text-emerald-400 transition-colors">My Account</Link></li>
            <li><Link to="/account/orders" className="hover:text-emerald-400 transition-colors">Order Tracking</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-emerald-400 transition-colors">Refund & Return Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Join Newsletter</h4>
          <p className="text-xs text-slate-400">Subscribe for exclusive discount coupons and home care tips.</p>
          <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Kick Home Care!'); }}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
              />
              <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Kick Home Care. All rights reserved. Redesigned MERN E-Commerce.</p>
        <p className="mt-2 md:mt-0">Designed for conversion, speed, and premium user experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
