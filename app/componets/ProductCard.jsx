"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-4">

        <img
          src={product.image || "/stamp-placeholder.jpg"}
          alt={product.name || "eStampBD Product"}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Price */}
        <div className="absolute right-3 top-3 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-bold text-white shadow-md">
          ৳{product.price}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4">

        <h2 className="line-clamp-1 text-base font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="mt-1 line-clamp-2 min-h-[40px] text-sm text-gray-500">
          {product.description || "eStampBD-এর মানসম্মত পণ্য"}
        </p>

        {/* Category */}
        {product.category && (
          <div className="mt-3">
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              {product.category}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            মূল্য
          </span>

          <span className="text-lg font-bold text-green-700">
            ৳{product.price}
          </span>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
        >
          🛒 কার্টে যোগ করুন
        </button>

      </div>
    </div>
  );
}