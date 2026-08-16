"use client";

import { useState, useEffect, use } from "react";

export default function OrderPage({ params }) {
  const { id } = use(params);  // Next.js latest

  const [packageData, setPackageData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    area_id: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [areas, setAreas] = useState([]);
  console.log(areas)

  // ✅ Fetch package data from backend
  useEffect(() => {
    if (!id) return;

    fetch(`/api/packages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPackageData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
  fetch("/api/areas")
    .then((res) => res.json())
    .then((data) => setAreas(data))
    .catch((err) => console.error(err));
}, []);

  // ✅ Validation
  const validate = () => {
    if (!form.name || !form.phone || !form.area_id) {
      alert("❌ অনুগ্রহ করে সমস্ত প্রয়োজনীয় তথ্য পূরণ করুন।");
      return false;
    }
    return true;
  };

  // ✅ Submit order
  const submit = async () => {
    if (!validate()) return;

    const total = form.quantity * (packageData?.price || 0);
    setTotalPrice(total);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          package_id: id,
          total,
        }),
      });

      const data = await res.json();

      if (data.insertId) {
        setOrderId(data.insertId);
        setShowModal(true);
        // ✅ Reset form
        setForm({
          name: "",
          phone: "",
          address: "",
          area_id: "",
          quantity: 1,
        });
      } else {
        alert("❌ অর্ডার করতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      alert("❌ সার্ভার এ সমস্যা হয়েছে।");
    }
  };

  if (loading) return <p className="text-center p-10">Loading package...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="bg-green-600 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Sebamiles Food Order</h2>
          <p className="mb-6 text-lg">দ্রুত এবং নিরাপদে আপনার অর্ডার সম্পন্ন করুন।</p>
          <div className="space-y-2 text-sm">
            <p>✔ Fresh Food</p>
            <p>✔ Fast Delivery</p>
            <p>✔ Trusted Service</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 md:p-10 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h3>

          {/* Package Info */}
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="font-semibold">{packageData.name}</p>
            <p>Price: ৳ {packageData.price}</p>
          </div>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Full Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <select
  className="w-full border rounded-lg p-3"
  value={form.area_id}
  onChange={(e) => setForm({ ...form, area_id: e.target.value })}
>
  <option value="">Select Area</option>

  {areas.map((area) => (
    <option key={area.id} value={area.id}>
      {area.name}
    </option>
  ))}
</select>

          <input
            type="number"
            min="1"
            className="w-full border rounded-lg p-3"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
          />

          {/* Dynamic Total */}
          <div className="bg-gray-100 p-3 rounded-lg flex justify-between font-semibold">
            <span>Total</span>
            <span>৳ {form.quantity * packageData.price}</span>
          </div>

          <button
            onClick={submit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Confirm Order
          </button>
        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-2xl font-bold mb-2">🎉 অর্ডার সফল! 🎉</h2>
            <p className="mb-2">
              অর্ডার নম্বর: <span className="font-semibold">{orderId}</span>
            </p>
             <p className="mb-4">প্যাকেজ:{packageData.name}</p>
            <p className="mb-4">মোট: ৳{totalPrice}</p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}