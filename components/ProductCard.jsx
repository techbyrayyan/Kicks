'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Eye, Scale, ShoppingBag, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare } = useCompare();

  const isWishlisted = isInWishlist(product._id);
  const currentPrice = product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice = product.salePrice > 0 ? product.price : null;
  const discountPercent = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/70 p-3.5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 overflow-hidden mb-3.5 border border-slate-100">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-rose-500 text-white text-[10px] font-black uppercase rounded-full shadow-sm tracking-wider">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-emerald-700 text-white text-[10px] font-bold rounded-full shadow-sm flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Bestseller</span>
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500'}`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={() => addToCompare(product)}
            className="p-2 bg-white/90 hover:bg-white text-slate-700 hover:text-teal-600 rounded-full shadow-md backdrop-blur-md transition-all"
            title="Compare Specs"
          >
            <Scale className="w-4 h-4" />
          </button>

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="p-2 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-600 rounded-full shadow-md backdrop-blur-md transition-all"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Product Image Link */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full p-2">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="px-1 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="truncate font-bold text-emerald-700 uppercase text-[10px] tracking-wider">
              {product.category?.name || 'Home Care'}
            </span>
            <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-lg text-amber-800 font-extrabold text-[11px] border border-amber-100">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating || 5.0}</span>
              <span className="text-slate-400 font-medium">({product.numReviews || 0})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 hover:text-emerald-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action CTA */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-base font-black text-slate-900">Rs. {currentPrice}</span>
            {originalPrice && (
              <span className="ml-1.5 text-xs text-slate-400 line-through font-medium">Rs. {originalPrice}</span>
            )}
          </div>

          {product.hasVariations ? (
            <Link
              href={`/product/${product.slug}`}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-emerald-700 text-slate-800 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-sm"
            >
              <span>Options</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <button
              onClick={() => addToCart(product, '', 1)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
