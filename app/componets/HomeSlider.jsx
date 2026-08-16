"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeSlider() {
  const [sliders, setSliders] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD SLIDERS
  // =========================

  useEffect(() => {
    const loadSliders = async () => {
      try {
        const res = await fetch("/api/sliders", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || "Slider load failed"
          );
        }

        if (Array.isArray(data)) {
          setSliders(data);
        } else {
          setSliders([]);
        }

      } catch (error) {
        console.error("Slider Error:", error);
        setSliders([]);

      } finally {
        setLoading(false);
      }
    };

    loadSliders();
  }, []);

  // =========================
  // AUTO SLIDE
  // =========================

  useEffect(() => {
    if (sliders.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        (prev + 1) % sliders.length
      );
    }, 5000);

    return () => clearInterval(timer);

  }, [sliders.length]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="w-full">

        <div className="w-full h-[220px] md:h-[420px] bg-gray-100 flex items-center justify-center">

          <div className="text-center">

            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto" />

            <p className="text-gray-500 mt-3">
              Loading...
            </p>

          </div>

        </div>

      </section>
    );
  }

  // =========================
  // NO SLIDER
  // =========================

  if (sliders.length === 0) {
    return null;
  }

  const slider = sliders[current];

  // =========================
  // NEXT
  // =========================

  const nextSlide = () => {
    setCurrent(
      (prev) => (prev + 1) % sliders.length
    );
  };

  // =========================
  // PREVIOUS
  // =========================

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + sliders.length) %
        sliders.length
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">

      {/* ================= IMAGE ================= */}

      {slider.link_url ? (
        <Link
          href={slider.link_url}
          className="block"
        >

          <img
            key={slider.id}
            src={slider.image_url}
            alt={slider.title || "eStampBD"}
            className="w-full h-[220px] md:h-[420px] object-cover transition-all duration-700"
          />

        </Link>
      ) : (

        <img
          key={slider.id}
          src={slider.image_url}
          alt={slider.title || "eStampBD"}
          className="w-full h-[220px] md:h-[420px] object-cover transition-all duration-700"
        />

      )}

      {/* ================= DARK OVERLAY ================= */}

      {(slider.title || slider.subtitle) && (

        <div className="absolute inset-0 bg-black/20 flex items-center">

          <div className="max-w-7xl mx-auto w-full px-6">

            <div className="max-w-xl text-white">

              {slider.title && (
                <h2 className="text-2xl md:text-5xl font-bold drop-shadow-lg">
                  {slider.title}
                </h2>
              )}

              {slider.subtitle && (
                <p className="mt-3 text-sm md:text-xl leading-7 drop-shadow-lg">
                  {slider.subtitle}
                </p>
              )}

            </div>

          </div>

        </div>

      )}

      {/* ================= PREVIOUS ================= */}

      {sliders.length > 1 && (
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-gray-800 text-2xl"
        >
          ‹
        </button>
      )}

      {/* ================= NEXT ================= */}

      {sliders.length > 1 && (
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-gray-800 text-2xl"
        >
          ›
        </button>
      )}

      {/* ================= DOTS ================= */}

      {sliders.length > 1 && (

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

          {sliders.map((item, index) => (

            <button
              key={item.id}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60"
              }`}
            />

          ))}

        </div>

      )}

    </section>
  );
}