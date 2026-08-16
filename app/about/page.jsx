"use client";

import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      title: "Fresh Food",
      desc: "প্রতিদিন তাজা উপকরণ দিয়ে স্বাস্থ্যসম্মত খাবার প্রস্তুত করা হয়।",
      icon: "🍲",
    },
    {
      title: "Fast Delivery",
      desc: "দ্রুত এবং নিরাপদভাবে আপনার কাছে খাবার পৌঁছে দেওয়া হয়।",
      icon: "🚚",
    },
    {
      title: "Affordable Price",
      desc: "সবার জন্য ন্যায্য ও সাশ্রয়ী মূল্যে খাবার।",
      icon: "💰",
    },
    {
      title: "Customer Support",
      desc: "যেকোনো সমস্যায় আমরা আছি আপনার পাশে।",
      icon: "🎧",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <section className="bg-green-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Khawa.Online
          </h1>

          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            সুস্বাদু, স্বাস্থ্যকর এবং সাশ্রয়ী খাবার আপনার দোরগোড়ায় পৌঁছে দেওয়াই
            আমাদের লক্ষ্য।
          </p>

          <Link href="/">
            <button className="mt-8 bg-white text-green-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              🍽️ Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src="/about-food.jpg"
            alt="About"
            className="rounded-2xl shadow-xl"
          />

          <div>
            <h2 className="text-4xl font-bold mb-5">
              About Us
            </h2>

            <p className="text-gray-600 leading-8">
              Khawa.Online একটি আধুনিক অনলাইন ফুড অর্ডারিং প্ল্যাটফর্ম।
              প্রতিদিন তাজা উপকরণ দিয়ে রান্না করা সুস্বাদু খাবার দ্রুত আপনার
              কাছে পৌঁছে দেওয়াই আমাদের উদ্দেশ্য।
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-white shadow rounded-xl p-5 text-center">
                <h3 className="text-3xl font-bold text-green-600">
                  1000+
                </h3>
                <p>Happy Customers</p>
              </div>

              <div className="bg-white shadow rounded-xl p-5 text-center">
                <h3 className="text-3xl font-bold text-green-600">
                  5000+
                </h3>
                <p>Meals Delivered</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition p-6 text-center"
              >
                <div className="text-5xl mb-4">
                  {item.icon}
                </div>

                <h3 className="font-bold text-xl mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-green-700 py-20 text-white text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready to Order?
        </h2>

        <p className="mb-8 text-lg">
          আপনার পছন্দের খাবার এখনই অর্ডার করুন।
        </p>

        <Link href="/">
          <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-100">
            🍛 Order Now
          </button>
        </Link>

      </section>

    </div>
  );
}