import React from 'react';
import { Award, ShieldCheck, Heart, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">About Kick Home Care</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">Kara Asani Zindagi Main</h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Kick Home Care is Pakistan's leading brand committed to making everyday household cleaning, liquid bleaching, drain maintenance, and footwear preservation effortless and effective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
        <img
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
          alt="Kick Home Care Story"
          className="rounded-3xl shadow-2xl object-cover h-96 w-full"
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Our Mission & Standards</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Founded with the ambition of replacing harsh or substandard chemicals with carefully engineered formulas, Kick Home Care provides high-yield products priced fairly for Pakistani families.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-3 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Dermatologically tested formulations safe for home usage</span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold text-slate-800">
              <Award className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Specialized Kick Whito product for white sneaker restoration</span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold text-slate-800">
              <Users className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Trusted by over 100,000+ happy customers nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
