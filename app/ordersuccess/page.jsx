"use client";

import { Suspense } from "react";
import OrderSuccessContent from "./OrderSuccessContent/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-4 text-gray-600">
              Loading order...
            </p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}