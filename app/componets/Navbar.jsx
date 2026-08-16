"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Navbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800 bg-slate-950/95 shadow-lg backdrop-blur-md">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center"
        >
          <div>

            <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
              <span className="text-emerald-400">
                eStamp
              </span>

              <span className="text-white">
                BD
              </span>
            </h1>

            <p className="hidden text-[8px] font-medium tracking-[0.2em] text-slate-500 sm:block">
              STAMP • DOCUMENT • TAX
            </p>

          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center">
          <Nav />
        </div>

        {/* Mobile Navigation */}
        <div className="xl:hidden">
          <MobileNav />
        </div>

      </div>

    </header>
  );
};

export default Navbar;