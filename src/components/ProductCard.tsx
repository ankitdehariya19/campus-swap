import { useState } from "react";
import type { Product } from "../Types/Types";
import { Button } from "./ui/Button";

interface Props {
  product: Product;
  onBuyNow: (product: Product) => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-[12px] ${i <= Math.round(rating) ? "text-amber-400" : "text-neutral-700"}`}
        >
          ★
        </span>
      ))}
      <span className="text-[11px] font-medium text-neutral-500 ml-1.5 mt-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function ProductCard({ product, onBuyNow }: Props) {
  const [liked, setLiked] = useState(false);

  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100,
  );

  const label = product.condition.charAt(0).toUpperCase() + product.condition.slice(1);

  return (
    <article className="group bg-neutral-900/40 border border-neutral-800 rounded-[24px] flex flex-col overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">

      <div className="relative aspect-16/11 overflow-hidden bg-neutral-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />


        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm
            ${product.condition === 'new' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
              product.condition === 'used' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-sky-500/20 text-sky-300 border-sky-500/30'}`}
          >
            {label}
          </span>
          {discount > 0 && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white text-black shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className={`absolute cursor-pointer top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 border
            ${liked
              ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20 scale-110"
              : "bg-black/20 text-white border-white/10 hover:bg-black/40 hover:scale-110"
            }`}
        >
          {liked ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          )}
        </button>
      </div>


      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="space-y-1">
          <p className="text-[12px] font-bold text-neutral-500 tracking-wide uppercase">
            {product.category}
          </p>
          <h3 className="text-base font-semibold text-neutral-100 line-clamp-1 group-hover:text-white transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <Stars rating={product.rating} />
          <span className="text-[11px] font-medium text-neutral-600">
            {product.reviews.toLocaleString()} reviews
          </span>
        </div>

        <div className="mt-auto pt-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-600 line-through font-medium">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-xl font-bold text-white tracking-tight">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <Button
            onClick={() => onBuyNow(product)}
            size="sm"
            className="rounded-[12px] h-10 px-5 bg-white text-black hover:bg-neutral-200"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </article>
  );
}
