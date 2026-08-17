"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PACKAGING_CHARGE = 60;
const DELIVERY_CHARGE = 60;

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // FORM
  // =========================

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    delivery_note: "",

    // Empty রাখলাম
    // যাতে customer অবশ্যই payment method select করে
    payment_method: "",

    payment_number: "",
    transaction_id: "",
  });

  // =========================
  // CHECK STAMP PRODUCT
  // =========================

  const isStampOrder = cart.some((item) => {
    const name = String(item.name || "").toLowerCase();

    return (
      name.includes("stamp") ||
      name.includes("স্ট্যাম্প") ||
      name.includes("court fee") ||
      name.includes("কোর্ট ফি") ||
      name.includes("stamp paper") ||
      name.includes("স্ট্যাম্প পেপার")
    );
  });

  // =========================
  // PRICE
  // =========================

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const total =
    subtotal +
    PACKAGING_CHARGE +
    DELIVERY_CHARGE;

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PAYMENT METHOD
  // =========================

  const handlePaymentMethod = (method) => {
    // Stamp order হলে Cash allow হবে না
    if (isStampOrder && method === "cash") {
      alert(
        "Stamp Paper / Stamp Entry অর্ডারের জন্য Cash on Delivery গ্রহণ করা হয় না। bKash অথবা Nagad-এর মাধ্যমে অগ্রিম পেমেন্ট করুন।"
      );

      return;
    }

    setForm((prev) => ({
      ...prev,
      payment_method: method,

      // Cash হলে online payment তথ্য clear
      payment_number:
        method === "cash"
          ? ""
          : prev.payment_number,

      transaction_id:
        method === "cash"
          ? ""
          : prev.transaction_id,
    }));
  };

  // =========================
  // SUBMIT ORDER
  // =========================

  const handleSubmit = async () => {
    // =========================
    // CART
    // =========================

    if (cart.length === 0) {
      alert("আপনার Cart খালি!");
      return;
    }

    // =========================
    // NAME
    // =========================

    if (form.name.trim().length < 3) {
      alert("সঠিক নাম লিখুন");
      return;
    }

    // =========================
    // PHONE
    // =========================

    if (!/^01[3-9]\d{8}$/.test(form.phone)) {
      alert("সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন");
      return;
    }

    // =========================
    // ADDRESS
    // =========================

    if (form.address.trim().length < 6) {
      alert("সম্পূর্ণ ঠিকানা লিখুন");
      return;
    }

    // =========================
    // PAYMENT METHOD REQUIRED
    // =========================

    if (!form.payment_method) {
      alert(
        "অনুগ্রহ করে একটি Payment Method নির্বাচন করুন।"
      );

      return;
    }

    // =========================
    // STAMP ORDER
    // =========================

    if (
      isStampOrder &&
      form.payment_method === "cash"
    ) {
      alert(
        "Stamp Paper / Stamp Entry অর্ডারের জন্য Cash on Delivery গ্রহণ করা হয় না। bKash অথবা Nagad-এর মাধ্যমে অগ্রিম পেমেন্ট করুন।"
      );

      return;
    }

    // =========================
    // ONLINE PAYMENT
    // =========================

    if (
      form.payment_method === "bkash" ||
      form.payment_method === "nagad"
    ) {
      // Payment Number
      if (
        !/^01[3-9]\d{8}$/.test(
          form.payment_number
        )
      ) {
        alert(
          "সঠিক Payment Number দিন"
        );

        return;
      }

      // Transaction ID
      if (!form.transaction_id.trim()) {
        alert(
          "Transaction ID দিন"
        );

        return;
      }
    }

    // =========================
    // LOADING
    // =========================

    setLoading(true);

    try {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      phone: form.phone,
      address: form.address,
      delivery_note: form.delivery_note,

      payment_method: form.payment_method,

      payment_number:
        form.payment_method === "cash"
          ? null
          : form.payment_number,

      transaction_id:
        form.payment_method === "cash"
          ? null
          : form.transaction_id,

      items: cart,

      subtotal,
      packaging_charge: PACKAGING_CHARGE,
      delivery_charge: DELIVERY_CHARGE,
      total,

      is_stamp_order: isStampOrder,
    }),
  });

  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    data = {
      error: text || "Server returned invalid response",
    };
  }

  console.log("ORDER API STATUS:", res.status);
  console.log("ORDER API RESPONSE:", data);

  if (!res.ok) {
    alert(
      data?.error ||
      data?.message ||
      `Order failed! Status: ${res.status}`
    );
    return;
  }

  setOrderId(data.insertId);

  clearCart();

  setShowModal(true);

} catch (error) {
  console.error("ORDER SUBMIT ERROR:", error);

  alert(
    error?.message ||
    "Server error! আবার চেষ্টা করুন।"
  );
} finally {
  setLoading(false);
}

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-6">

          <p className="text-sm font-semibold text-green-600">
            eStampBD.com
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            🧾 Checkout
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            আপনার অর্ডার সম্পন্ন করার জন্য
            তথ্য দিন।
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* ================================================= */}
          {/* CUSTOMER INFORMATION */}
          {/* ================================================= */}

          <div className="bg-white rounded-2xl shadow-sm border p-5">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Customer Information
            </h2>

            {/* NAME */}

            <label className="text-sm font-semibold text-gray-700">
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              placeholder="আপনার পূর্ণ নাম"
              value={form.name}
              onChange={handleChange}
              className="border p-3 w-full mb-4 mt-1 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            {/* PHONE */}

            <label className="text-sm font-semibold text-gray-700">
              Mobile Number *
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="01XXXXXXXXX"
              value={form.phone}
              maxLength={11}
              inputMode="numeric"
              onChange={handleChange}
              className="border p-3 w-full mb-4 mt-1 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            {/* ADDRESS */}

            <label className="text-sm font-semibold text-gray-700">
              Complete Address *
            </label>

            <textarea
              name="address"
              rows={4}
              placeholder="সম্পূর্ণ ঠিকানা লিখুন"
              value={form.address}
              onChange={handleChange}
              className="border p-3 w-full mb-4 mt-1 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            {/* DELIVERY NOTE */}

            <label className="text-sm font-semibold text-gray-700">
              Delivery Note
            </label>

            <textarea
              name="delivery_note"
              rows={3}
              placeholder="অতিরিক্ত কোনো নির্দেশনা থাকলে লিখুন"
              value={form.delivery_note}
              onChange={handleChange}
              className="border p-3 w-full mb-4 mt-1 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            {/* ================================================= */}
            {/* PAYMENT */}
            {/* ================================================= */}

            <div className="mt-6">

              <h2 className="text-xl font-bold text-gray-800 mb-3">
                💳 Payment Method
              </h2>

              {/* REQUIRED NOTICE */}

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">

                <p className="font-bold text-red-700">
                  ⚠️ Payment Method নির্বাচন করুন
                </p>

                <p className="text-sm text-red-600 mt-1 leading-6">
                  অর্ডার সম্পন্ন করার আগে
                  Cash on Delivery, bKash অথবা
                  Nagad — যেকোনো একটি Payment Method
                  নির্বাচন করতে হবে।
                </p>

              </div>

              {/* ================= STAMP NOTICE ================= */}

              {isStampOrder && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4">

                  <p className="font-bold text-amber-800">
                    📜 Stamp Paper Order
                  </p>

                  <p className="text-sm text-amber-700 mt-1 leading-6">
                    Stamp Paper / Stamp Entry
                    অর্ডারের জন্য অগ্রিম পেমেন্ট
                    আবশ্যক। Cash on Delivery
                    প্রযোজ্য নয়।
                  </p>

                </div>
              )}

              {/* ================= NORMAL ORDER ================= */}

              {!isStampOrder && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">

                  <p className="text-sm text-blue-700 leading-6">
                    💡 সাধারণ পণ্যের জন্য
                    Cash on Delivery, bKash অথবা
                    Nagad নির্বাচন করতে পারবেন।
                    যেকোনো একটি নির্বাচন করা
                    বাধ্যতামূলক।
                  </p>

                </div>
              )}

              {/* ================================================= */}
              {/* CASH ON DELIVERY */}
              {/* ================================================= */}

              {!isStampOrder && (
                <label
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${
                    form.payment_method === "cash"
                      ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={
                      form.payment_method === "cash"
                    }
                    onChange={() =>
                      handlePaymentMethod("cash")
                    }
                  />

                  <div>

                    <p className="font-semibold text-gray-800">
                      💵 Cash on Delivery
                    </p>

                    <p className="text-xs text-gray-500">
                      পণ্য হাতে পাওয়ার সময়
                      পেমেন্ট করবেন
                    </p>

                  </div>

                </label>
              )}

              {/* ================================================= */}
              {/* BKASH */}
              {/* ================================================= */}

              <label
                className={`flex items-center gap-3 border rounded-xl p-4 ${
                  !isStampOrder
                    ? "mt-3"
                    : ""
                } cursor-pointer transition ${
                  form.payment_method === "bkash"
                    ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={
                    form.payment_method === "bkash"
                  }
                  onChange={() =>
                    handlePaymentMethod("bkash")
                  }
                />

                <div>

                  <p className="font-semibold text-gray-800">
                    📱 bKash
                  </p>

                  <p className="text-xs text-gray-500">
                    Advance Payment
                  </p>

                </div>

              </label>

              {/* ================================================= */}
              {/* NAGAD */}
              {/* ================================================= */}

              <label
                className={`flex items-center gap-3 border rounded-xl p-4 mt-3 cursor-pointer transition ${
                  form.payment_method === "nagad"
                    ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="nagad"
                  checked={
                    form.payment_method === "nagad"
                  }
                  onChange={() =>
                    handlePaymentMethod("nagad")
                  }
                />

                <div>

                  <p className="font-semibold text-gray-800">
                    📱 Nagad
                  </p>

                  <p className="text-xs text-gray-500">
                    Advance Payment
                  </p>

                </div>

              </label>

              {/* ================================================= */}
              {/* ONLINE PAYMENT DETAILS */}
              {/* ================================================= */}

              {(form.payment_method === "bkash" ||
                form.payment_method === "nagad") && (
                <>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl mt-4">

                    <h3 className="font-bold text-green-700 mb-2">
                      💳 পেমেন্ট পাঠানোর নম্বর
                    </h3>

                    <p className="font-semibold">
                      📱 bKash: 01305573617
                    </p>

                    <p className="font-semibold">
                      📱 Nagad: 01305573617
                    </p>

                    <p className="text-sm text-gray-600 mt-2 leading-5">
                      নির্বাচিত Payment Method অনুযায়ী
                      টাকা পাঠানোর পর নিচের তথ্য দিন।
                    </p>

                  </div>

                  {/* PAYMENT NUMBER */}

                  <input
                    type="tel"
                    name="payment_number"
                    placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                    value={form.payment_number}
                    maxLength={11}
                    inputMode="numeric"
                    onChange={handleChange}
                    className="border p-3 w-full mt-4 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  />

                  {/* TRANSACTION */}

                  <input
                    type="text"
                    name="transaction_id"
                    placeholder="Transaction ID"
                    value={form.transaction_id}
                    onChange={handleChange}
                    className="border p-3 w-full mt-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none uppercase"
                  />

                </>
              )}

              {/* ================================================= */}
              {/* CASH NOTICE */}
              {/* ================================================= */}

              {form.payment_method === "cash" &&
                !isStampOrder && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">

                    <p className="font-semibold text-green-700">
                      ✅ Cash on Delivery Selected
                    </p>

                    <p className="text-sm text-gray-600 mt-1 leading-5">
                      পণ্য হাতে পাওয়ার সময়
                      ডেলিভারি প্রতিনিধিকে
                      মোট টাকা পরিশোধ করবেন।
                    </p>

                  </div>
                )}

            </div>

          </div>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <div className="bg-white rounded-2xl shadow-sm border p-5 h-fit">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              🛒 Order Summary
            </h2>

            {cart.length === 0 ? (

              <p className="text-gray-500">
                আপনার Cart খালি।
              </p>

            ) : (

              <div className="space-y-3">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-3"
                  >

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {item.quantity} × ৳
                        {item.price}
                      </p>

                    </div>

                    <h3 className="font-bold">

                      ৳{" "}
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toFixed(2)}

                    </h3>

                  </div>

                ))}

              </div>

            )}

            {/* ================================================= */}
            {/* PRICE */}
            {/* ================================================= */}

            <div className="bg-green-50 rounded-xl p-4 mt-6">

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  ৳ {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between mt-3">

                <span>
                  📦 Packaging Charge
                </span>

                <span>
                  ৳ {PACKAGING_CHARGE}
                </span>

              </div>

              <div className="flex justify-between mt-3">

                <span>
                  🚚 Delivery Charge
                </span>

                <span>
                  ৳ {DELIVERY_CHARGE}
                </span>

              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">

                <span>
                  Total
                </span>

                <span className="text-green-700">
                  ৳ {total.toFixed(2)}
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* DELIVERY */}
            {/* ================================================= */}

            <div className="mt-5 bg-slate-50 rounded-xl p-4">

              <h3 className="font-bold text-gray-800">
                🚚 Delivery & Packaging
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                📍 Chattogram Delivery: ৳60
              </p>

              <p className="text-sm text-gray-600">
                📍 Chattogram-এর বাইরে Delivery: ৳60
              </p>

              <p className="text-sm text-gray-600">
                📦 Packaging Charge: ৳60
              </p>

            </div>

            {/* ================================================= */}
            {/* STAMP NOTICE */}
            {/* ================================================= */}

            <div className="mt-4 border border-amber-200 bg-amber-50 rounded-xl p-4">

              <p className="text-sm font-bold text-amber-800">
                📜 Stamp Paper Notice
              </p>

              <p className="text-xs text-amber-700 mt-1 leading-5">
                Stamp Paper Entry /
                প্রস্তুতকরণ কাজের জন্য
                অগ্রিম পেমেন্ট আবশ্যক।
                Payment confirmation-এর
                পর কাজ শুরু হবে।
              </p>

            </div>

            {/* ================================================= */}
            {/* PAYMENT SELECT WARNING */}
            {/* ================================================= */}

            {!form.payment_method && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">

                <p className="text-sm text-red-600 font-semibold">
                  ⚠️ Order করতে একটি Payment Method
                  নির্বাচন করুন।
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* PLACE ORDER */}
            {/* ================================================= */}

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                cart.length === 0
              }
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 mt-5 rounded-xl w-full font-bold transition"
            >

              {loading
                ? "Placing Order..."
                : `Place Order — ৳ ${total.toFixed(2)}`}

            </button>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* SUCCESS MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">

          <div className="bg-white p-7 rounded-2xl w-full max-w-sm text-center shadow-2xl">

            <div className="text-5xl mb-3">
              🎉
            </div>

            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Order Placed!
            </h2>

            <p className="text-gray-600 mb-4">
              আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।
            </p>

            <div className="bg-green-50 rounded-xl p-3 mb-5">

              <p className="text-sm text-gray-600">
                Order No
              </p>

              <strong className="text-xl text-green-700">
                #{orderId}
              </strong>

            </div>

            <button
              onClick={() => {
                router.push(
                  `/ordersuccess?id=${orderId}`
                );
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl w-full font-semibold"
            >
              View Order →
            </button>

          </div>

        </div>

      )}

    </main>
  );
}
}