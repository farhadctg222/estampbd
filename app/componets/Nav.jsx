"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiPhone,
  FiShoppingCart,
} from "react-icons/fi";

const Nav = () => {
  const pathname = usePathname();
  const { cart } = useCart();

  const links = [
    {
      name: "হোম",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "সেবা",
      path: "/services",
      icon: <FiFileText />,
    },
    {
      name: "আমাদের টিম",
      path: "/staff",
      icon: <FiUsers />,
    },
    {
      name: "যোগাযোগ",
      path: "/contact",
      icon: <FiPhone />,
    },
  ];

  return (
    <nav className="flex items-center gap-1">

      {links.map((link) => {
        const active = pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-slate-200 hover:bg-white/10 hover:text-emerald-300"
            }`}
          >
            <span className="text-base">
              {link.icon}
            </span>

            <span>{link.name}</span>
          </Link>
        );
      })}

      {/* Cart */}
      <Link
        href="/cart"
        className={`relative ml-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          pathname === "/cart"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-slate-200 hover:bg-white/10 hover:text-emerald-300"
        }`}
      >
        <FiShoppingCart className="text-base" />

        <span>কার্ট</span>

        {cart.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {cart.length}
          </span>
        )}
      </Link>

    </nav>
  );
};

export default Nav;