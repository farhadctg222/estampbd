"use client";

import Image from "next/image";
import { useState } from "react";

export default function StaffPage() {
  const [hovered, setHovered] = useState(null);

  const staff = [
    {
      id: 1,
      role: "Founder & Managing Director",
      name: "Mohammad Farhad Uddin",
      desc: "স্ট্যাম্প, কোর্ট ফি, ডকুমেন্টেশন ও eStampBD.com-এর সার্বিক ব্যবস্থাপনা।",
      image: "/staff/founder.jpg",
    },
    {
      id: 2,
      role: "Income Tax Return Specialist",
      name: "আপনার ভাইয়ের নাম",
      desc: "আয়কর রিটার্ন ফর্ম পূরণ, রিটার্ন প্রস্তুত এবং আয়কর সংক্রান্ত প্রয়োজনীয় সহায়তা।",
      image: "/staff/tax.jpg",
    },
    {
      id: 3,
      role: "Stamp & Documentation Specialist",
      name: "তৃতীয় সদস্যের নাম",
      desc: "স্ট্যাম্প, কোর্ট ফি, প্রয়োজনীয় ডকুমেন্ট ও ড্রাফটিং সংক্রান্ত সেবা।",
      image: "/staff/document.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-gray-50 px-4 py-16">

      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl text-center">

        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
          eStampBD.com
        </span>

        <h1 className="mt-4 text-3xl font-bold text-gray-800 md:text-4xl">
          আমাদের বিশেষজ্ঞ টিম
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
          স্ট্যাম্প, ডকুমেন্টেশন ও আয়কর রিটার্ন সংক্রান্ত
          প্রয়োজনীয় সেবা প্রদানে আমাদের টিম আপনাদের পাশে রয়েছে।
        </p>

      </div>

      {/* Team Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">

        {staff.map((member) => (
          <div
            key={member.id}
            onMouseEnter={() => setHovered(member.id)}
            onMouseLeave={() => setHovered(null)}
            className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-500 ${
              hovered === member.id
                ? "-translate-y-2 shadow-2xl"
                : "hover:shadow-xl"
            }`}
          >

            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-gray-100">

              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover transition-transform duration-700 ${
                  hovered === member.id
                    ? "scale-110"
                    : "scale-100"
                }`}
              />

              {/* Image Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 ${
                  hovered === member.id
                    ? "opacity-100"
                    : "opacity-60"
                }`}
              />

              {/* Number */}
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-green-700 shadow">
                {String(member.id).padStart(2, "0")}
              </div>

            </div>

            {/* Content */}
            <div className="p-6 text-center">

              <h2 className="text-lg font-bold text-gray-800">
                {member.role}
              </h2>

              <p className="mt-1 text-sm font-semibold text-green-600">
                {member.name}
              </p>

              <p className="mt-3 min-h-[60px] text-sm leading-6 text-gray-500">
                {member.desc}
              </p>

              {/* Bottom Line */}
              <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-green-600 transition-all duration-300 group-hover:w-20" />

            </div>

          </div>
        ))}

      </div>

      {/* Bottom Message */}
      <div className="mx-auto mt-12 max-w-2xl text-center">

        <p className="text-sm leading-6 text-gray-500">
          আপনার প্রয়োজনীয় স্ট্যাম্প, ডকুমেন্টেশন ও আয়কর রিটার্ন
          সংক্রান্ত সেবার জন্য
          <span className="font-semibold text-green-600">
            {" "}eStampBD.com
          </span>
          {" "}এর সাথে যোগাযোগ করুন।
        </p>

      </div>

    </section>
  );
}