import { useState } from "react";
import type { Product } from "../Types/Types";

interface Props {
  product: Product;
  onBuyNow: (product: Product) => void;
}

const CONDITION_STYLES: Record<string, string> = {
  new: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  used: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  refurbished: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-[11px] ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
      <span className="text-[11px] text-gray-400 ml-1">
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
  const label =
    product.condition.charAt(0).toUpperCase() + product.condition.slice(1);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm">

      <div className="bg-gray-50 flex items-center justify-center text-4xl aspect-[4/3] select-none">
        {product.emoji}
      </div>


      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${CONDITION_STYLES[product.condition]}`}
          >
            {label}
          </span>
          {discount > 0 && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-200">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900 leading-snug">
            {product.name}
          </p>
          <p className="text-[12px] text-gray-400 mt-0.5">{product.category}</p>
        </div>

        <Stars rating={product.rating} />
        <p className="text-[11px] text-gray-400">
          {product.reviews.toLocaleString()} reviews
        </p>

        <div className="flex items-baseline gap-1.5 mt-auto pt-1">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>


      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={() => onBuyNow(product)}
          className="flex-1 py-2 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-700 active:scale-[0.98] transition-all duration-100"
        >
          Buy Now
        </button>
        <button
          onClick={() => setLiked((l) => !l)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-9 h-9 flex items-center justify-center rounded-xl border text-sm transition-all duration-100
            ${liked
              ? "bg-rose-50 border-rose-200 text-rose-500"
              : "border-gray-200 text-gray-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400"
            }`}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
