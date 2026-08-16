"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const categories = [
  {
    id: "all",
    name: "সব পণ্য",
  },
  {
    id: "stamp",
    name: "নন-জুডিশিয়াল স্ট্যাম্প",
  },
  {
    id: "court-fee",
    name: "কোর্ট ফি",
  },
  {
    id: "revenue",
    name: "রেভিনিউ স্ট্যাম্প",
  },
  {
    id: "stamp-paper",
    name: "স্ট্যাম্প পেপার",
  },
  {
    id: "agreement",
    name: "চুক্তিপত্র",
  },
];

export default function ProductTabs({ products = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  return (
    <section className="w-full">

      {/* Heading */}
      <div className="mb-7 text-center">

        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          eStampBD পণ্যসমূহ
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          আপনার প্রয়োজনীয় স্ট্যাম্প ও লিগ্যাল পণ্য নির্বাচন করুন
        </p>

      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max justify-center gap-2 pb-2">

          {categories.map((category) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-green-600 text-white shadow-md"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {category.name}
              </button>
            );
          })}

        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      ) : (

        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">

          <div className="text-5xl">
            📦
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

        </div>

      )}

    </section>
  );
}