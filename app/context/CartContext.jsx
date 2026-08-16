"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Add to cart (with quantity)
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ Increase Quantity
const increaseQty = (id) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};


// ✅ Decrease Quantity (minimum 1)
const decreaseQty = (id) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          }
        : item
    )
  );
};

  // ✅ Decrease / Remove
 
const removeFromCart = (id) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { 
              ...item, 
              quantity: (item.quantity || 1) - 1 
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  // ✅ পুরো item remove
  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider
      value={{cart, addToCart, increaseQty, removeFromCart, decreaseQty, deleteFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);