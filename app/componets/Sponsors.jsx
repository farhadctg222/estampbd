"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const res = await fetch("/api/sponsors");
      const data = await res.json();
      setSponsors(data);
    };
    fetchSponsors();
  }, []);

  if (!sponsors.length) return null;

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-8">
          Our Sponsors
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.id}
              href={sponsor.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-300 flex items-center justify-center h-28 md:h-36 p-3"
            >
              {/* Logo */}
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain"
              />
            </motion.a>
          ))}

        </div>
      </div>
    </section>
  );
}