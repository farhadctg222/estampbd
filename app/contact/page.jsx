"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Have a question, feedback, or need help with your order?
            We're always ready to assist you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div>

            <h2 className="text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-5 bg-white shadow rounded-2xl p-5">
                <div className="bg-green-100 p-4 rounded-xl">
                  <Phone className="text-green-600" size={30} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    +8801305573617
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white shadow rounded-2xl p-5">
                <div className="bg-green-100 p-4 rounded-xl">
                  <Mail className="text-green-600" size={30} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    farhadctg222@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white shadow rounded-2xl p-5">
                <div className="bg-green-100 p-4 rounded-xl">
                  <MapPin className="text-green-600" size={30} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Address
                  </h3>

                  <p className="text-gray-600">
                   121/b Dowel Bhaban, Court Hill, Chattogram, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white shadow rounded-2xl p-5">
                <div className="bg-green-100 p-4 rounded-xl">
                  <Clock className="text-green-600" size={30} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Opening Hours
                  </h3>

                  <p className="text-gray-600">
                    8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Send Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition"
              >
                <MessageCircle className="inline mr-2" size={20} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* Google Map */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="rounded-3xl overflow-hidden shadow-xl">

            <iframe
              src="https://www.google.com/maps/embed?pb="
              width="100%"
              height="450"
              loading="lazy"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      </section>

    </div>
  );
}