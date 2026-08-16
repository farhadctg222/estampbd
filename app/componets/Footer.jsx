"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-950 text-white">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">

        {/* About */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="text-emerald-400">eStamp</span>
              <span className="text-white">BD</span>
            </h2>

            <p className="mt-1 text-xs font-medium tracking-widest text-slate-400">
              STAMP • DOCUMENT • TAX SERVICES
            </p>
          </div>

          <p className="text-sm leading-6 text-slate-400">
            eStampBD.com-এ নন-জুডিশিয়াল স্ট্যাম্প, কোর্ট ফি,
            রেভিনিউ স্ট্যাম্প, স্ট্যাম্প পেপার, ডকুমেন্টেশন
            এবং আয়কর রিটার্ন সংক্রান্ত সেবা পাওয়া যায়।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">
            দ্রুত লিংক
          </h3>

          <ul className="space-y-3 text-sm text-slate-400">

            <li>
              <Link
                href="/"
                className="transition hover:text-emerald-400"
              >
                হোম
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="transition hover:text-emerald-400"
              >
                আমাদের সম্পর্কে
              </Link>
            </li>

            <li>
              <Link
                href="/faq"
                className="transition hover:text-emerald-400"
              >
                সাধারণ জিজ্ঞাসা
              </Link>
            </li>

            <li>
              <Link
                href="/privacy"
                className="transition hover:text-emerald-400"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition hover:text-emerald-400"
              >
                যোগাযোগ
              </Link>
            </li>

          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">
            আমাদের সেবা
          </h3>

          <ul className="space-y-3 text-sm text-slate-400">
            <li>নন-জুডিশিয়াল স্ট্যাম্প</li>
            <li>কোর্ট ফি</li>
            <li>রেভিনিউ স্ট্যাম্প</li>
            <li>স্ট্যাম্প পেপার</li>
            <li>ডকুমেন্টেশন ও ড্রাফটিং</li>
            <li>আয়কর রিটার্ন সহায়তা</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">
            যোগাযোগ
          </h3>

          <div className="space-y-4 text-sm text-slate-400">

            <p className="flex gap-3">
              <span className="text-emerald-400">📞</span>
              <span>+880 1305573617</span>
            </p>

            <p className="flex gap-3 break-all">
              <span className="text-emerald-400">✉</span>
              <span>farhadctg222@gmail.com</span>
            </p>

            <p className="flex gap-3 leading-6">
              <span className="text-emerald-400">📍</span>
              <span>
                Shop No. 121/B, 1st Floor,
                <br />
                Doel Bhaban, Court Hill,
                <br />
                Chattogram, Bangladesh
              </span>
            </p>

          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-slate-800" />

      {/* Bottom Bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-slate-500 md:flex-row md:text-left">

        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-emerald-400">
            eStampBD.com
          </span>
          . All rights reserved.
        </p>

        <p>
          Trusted Stamp & Documentation Service
        </p>

      </div>

    </footer>
  );
}