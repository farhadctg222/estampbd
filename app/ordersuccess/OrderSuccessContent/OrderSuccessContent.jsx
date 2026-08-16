"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("id");

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-green-100 p-7 text-center">

        {/* ================= ICON ================= */}
        <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
          <span className="text-5xl">🎉</span>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="text-3xl font-bold text-green-700">
          Order Confirmed!
        </h1>

        <p className="text-gray-500 mt-2">
          আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।
        </p>

        {/* ================= ORDER NUMBER ================= */}
        {orderId && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-6">

            <p className="text-sm text-gray-500">
              আপনার Order Number
            </p>

            <p className="text-2xl font-bold text-green-700 mt-1">
              #{orderId}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              এই Order Number সংরক্ষণ করুন।
            </p>

          </div>
        )}

        {/* ================= SUCCESS MESSAGE ================= */}
        <div className="bg-gray-50 border rounded-2xl p-4 mt-5 text-left">

          <p className="font-semibold text-gray-800 mb-2">
            📦 অর্ডার প্রসেসিং
          </p>

          <p className="text-sm text-gray-600 leading-6">
            আপনার অর্ডারটি আমাদের কাছে পৌঁছেছে।
            অর্ডার যাচাই করার পর আমাদের টিম কাজ শুরু করবে।
          </p>

        </div>

        {/* ================= DELIVERY INFO ================= */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-4 text-left">

          <p className="font-semibold text-blue-800 mb-2">
            🚚 Delivery Information
          </p>

          <p className="text-sm text-blue-700 leading-6">
            📍 আপনার দেওয়া ঠিকানা অনুযায়ী অর্ডার
            ডেলিভারি/সরবরাহ করা হবে।
          </p>

          <p className="text-sm text-blue-700 mt-2 leading-6">
            ⏱️ আনুমানিক সময়: অর্ডারের ধরন ও
            ঠিকানার উপর নির্ভর করে সময় পরিবর্তিত হতে পারে।
          </p>

        </div>

        {/* ================= IMPORTANT NOTICE ================= */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4 text-left">

          <p className="font-semibold text-amber-800 mb-2">
            ⚠️ গুরুত্বপূর্ণ নোটিশ
          </p>

          <p className="text-sm text-amber-700 leading-6">
            অর্ডার করার সময় আপনার নাম, মোবাইল নম্বর
            এবং সম্পূর্ণ ঠিকানা সঠিকভাবে প্রদান করুন।
          </p>

          <p className="text-sm text-amber-700 mt-2 leading-6">
            Stamp Paper / Stamp Entry / Court Fee
            সংক্রান্ত অর্ডারের ক্ষেত্রে প্রয়োজনীয় তথ্য
            যাচাই করে কাজ সম্পন্ন করা হবে।
          </p>

        </div>

        {/* ================= CONTACT ================= */}
        <div className="bg-gray-100 rounded-2xl p-4 mt-5 text-left">

          <p className="font-bold text-gray-800 mb-2">
            📞 Contact Support
          </p>

          <p className="text-sm text-gray-700">
            📱 01305573617
          </p>

          <p className="text-sm text-gray-700 mt-1">
            📍 Shop No: 121/B, 1st Floor
          </p>

          <p className="text-sm text-gray-700">
            Doel Bhaban, Court Hill
          </p>

          <p className="text-sm text-gray-700">
            Chattogram Court Premises
          </p>

        </div>

        {/* ================= BUTTONS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

          <button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            🛍️ Continue Shopping
          </button>

          {orderId && (
            <button
              onClick={() =>
                router.push(`/ordertracking?id=${orderId}`)
              }
              className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition"
            >
              📦 Track Order
            </button>
          )}

        </div>

        {/* ================= FOOTER ================= */}
        <p className="text-xs text-gray-400 mt-6">
          eStampBD.com
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Thank you for your order.
        </p>

      </div>

    </main>
  );
}