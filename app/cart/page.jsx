"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, deleteFromCart } = useCart();
  const router = useRouter();

  // ✅ total with quantity
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-4 mb-3 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>৳ {item.price}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                {/* ➖ কমানো */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>

                {/* ➕ বাড়ানো */}
                <button
                  onClick={() => addToCart(item)}
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>

                {/* ❌ delete */}
                <button
                  onClick={() => deleteFromCart(item.id)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Total */}
          <h2 className="mt-4 font-bold text-lg">
            Total: ৳ {total}
          </h2>

          {/* ✅ Checkout */}
          <button
            onClick={() => router.push("/checkout")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}