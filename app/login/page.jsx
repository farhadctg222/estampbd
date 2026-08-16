"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      alert("দয়া করে ইমেইল লিখুন।");
      return;
    }

    if (!form.password) {
      alert("দয়া করে পাসওয়ার্ড লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || "Login failed");
        return;
      }

      if (!data.token) {
        alert("Login token পাওয়া যায়নি।");
        return;
      }

      // Login information save
      localStorage.setItem("token", data.token);

      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      // Dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 text-white text-3xl shadow-lg">
            📜
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            eStampBD.com
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Admin Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Login
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              আপনার অ্যাকাউন্টে প্রবেশ করতে লগইন করুন।
            </p>
          </div>

          <form onSubmit={login} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="আপনার পাসওয়ার্ড"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-16 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3.5 rounded-xl text-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  লগইন হচ্ছে...
                </span>
              ) : (
                "Login →"
              )}
            </button>
          </form>

          {/* Notice */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800">
              🔐 নিরাপত্তা নোটিশ
            </p>

            <p className="text-xs text-amber-700 mt-1 leading-5">
              আপনার Login তথ্য অন্য কারো সাথে শেয়ার করবেন না।
              শুধুমাত্র অনুমোদিত Admin/Staff এই Panel ব্যবহার করতে পারবেন।
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            অ্যাকাউন্ট না থাকলে{" "}
            <span className="text-green-600 font-semibold">
              Admin এর সাথে যোগাযোগ করুন।
            </span>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          © {new Date().getFullYear()} eStampBD.com — All Rights Reserved
        </p>
      </div>
    </main>
  );
}