"use client";
import { useState } from "react";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const steps = ["pending", "confirmed", "cooking", "delivered"];

  const normalizeStatus = (status) => status?.toLowerCase() || "pending";
  const getStepIndex = (status) => {
    const index = steps.indexOf(normalizeStatus(status));
    return index === -1 ? 0 : index;
  };

  const fetchOrder = async () => {
    setError("");
    setOrder(null);

    if (!orderId) {
      setError("অর্ডার নম্বর দিন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Order not found");
      } else {
        setOrder(data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl mt-10">

      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">📦 Order Tracking</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-3 rounded-lg"
          placeholder="Order Number লিখুন"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          onClick={fetchOrder}
          className="bg-green-600 text-white px-4 rounded-lg"
        >
          Track
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {order && (
        <div className="mt-6 space-y-6">

          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Name:</strong> {order.customer_name}</p>
            <p><strong>Total:</strong> ৳{order.total_price}</p>
          </div>

          {normalizeStatus(order.status) === "cancelled" ? (
            <div className="text-center text-red-600 font-bold text-lg">
              ❌ Order Cancelled
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const active = index <= getStepIndex(order.status);

                return (
                  <div key={step} className="flex-1 flex flex-col items-center relative">
                    {index !== 0 && (
                      <div
                        className={`absolute top-4 left-0 w-full h-1 ${active ? "bg-green-500" : "bg-gray-300"}`}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
                      ${active ? "bg-green-600" : "bg-gray-400"}`}>
                      {active ? "✓" : ""}
                    </div>
                    <p className="text-xs mt-2 capitalize">{step}</p>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-lg font-semibold text-green-600">
            Status: {normalizeStatus(order.status).toUpperCase()}
          </p>

        </div>
      )}
    </div>
  );
}