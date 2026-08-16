"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiAlignJustify, FiHome, FiUsers, FiFileText, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const MobileNav = () => {
  const pathname = usePathname();
  const { cart } = useCart();

  const links = [
    {
      name: "হোম",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "আমাদের টিম",
      path: "/staff",
      icon: <FiUsers />,
    },
    {
      name: "সেবা",
      path: "/services",
      icon: <FiFileText />,
    },
  ];

  return (
    <Sheet>

      {/* Menu Button */}
      <SheetTrigger
        className="relative z-50 m-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 transition hover:bg-green-100"
      >
        <FiAlignJustify className="text-2xl" />

        {/* Cart Badge */}
        {cart.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {cart.length}
          </span>
        )}
      </SheetTrigger>

      {/* Mobile Drawer */}
      <SheetContent
        side="right"
        className="flex w-[280px] flex-col border-l border-slate-800 bg-slate-950 p-0 text-white"
      >

        {/* Logo */}
        <div className="border-b border-slate-800 px-6 py-8 text-center">

          <Link href="/" className="inline-block">

            <h1 className="text-2xl font-extrabold tracking-tight">
              <span className="text-emerald-400">
                eStamp
              </span>
              <span className="text-white">
                BD
              </span>
            </h1>

            <p className="mt-1 text-[9px] font-medium tracking-[0.2em] text-slate-500">
              STAMP • DOCUMENT • TAX
            </p>

          </Link>

        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4 py-6">

          {links.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                href={link.path}
                key={link.path}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                }`}
              >
                <span className="text-lg">
                  {link.icon}
                </span>

                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* Cart */}
          <Link
            href="/cart"
            className={`relative flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              pathname === "/cart"
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
            }`}
          >

            <span className="text-lg">
              <FiShoppingCart />
            </span>

            <span>
              কার্ট
            </span>

            {cart.length > 0 && (
              <span className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                {cart.length}
              </span>
            )}

          </Link>

        </nav>

        {/* Bottom Information */}
        <div className="mt-auto border-t border-slate-800 p-5">

          <div className="rounded-xl bg-slate-900 p-4">

            <p className="text-xs font-semibold text-emerald-400">
              eStampBD.com
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              স্ট্যাম্প, কোর্ট ফি, ডকুমেন্টেশন ও
              আয়কর রিটার্ন সংক্রান্ত সেবা।
            </p>

          </div>

          <p className="mt-4 text-center text-[10px] text-slate-600">
            © {new Date().getFullYear()} eStampBD.com
          </p>

        </div>

      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;