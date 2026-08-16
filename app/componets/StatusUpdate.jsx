"use client";
import { useState } from "react";

export default function StatusUpdate({ id, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const update = async (status) => {
  setLoading(true);

  const token = getToken();

  const body = {
    status,
  };

  // Confirm করলে Payment Paid হবে
  if (status === "confirmed") {
    body.payment_status = "paid";
  }

  await fetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  onUpdate && onUpdate();
  setLoading(false);
};

  // const deleteOrder = async () => {
  //   if (!confirm("Delete?")) return;

  //   const token = getToken();

  //   await fetch(`/api/orders/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: `Bearer ${token}`, // 🔥 FIX
  //     },
  //   });

  //   onUpdate && onUpdate();
  // };

  return (
  <div className="flex gap-2 flex-wrap">

    <button
      onClick={() => update("confirmed")}
      disabled={loading}
      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-sm"
    >
      Confirm
    </button>

    <button
      onClick={() => update("cooking")}
      disabled={loading}
      className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition text-sm"
    >
      Cooking
    </button>

    <button
      onClick={() => update("delivered")}
      disabled={loading}
      className="px-3 py-1.5 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm"
    >
      Delivered
    </button>

    <button
      onClick={() => update("cancelled")}
      disabled={loading}
      className="px-3 py-1.5 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition text-sm"
    >
      Cancel
    </button>

    

  </div>
);
}