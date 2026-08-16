"use client";

import { useState } from "react";

const faqs = [
  {
    question: "eStampBD.com থেকে কী কী সেবা পাওয়া যায়?",
    answer:
      "নন-জুডিশিয়াল স্ট্যাম্প, কোর্ট ফি, রেভিনিউ স্ট্যাম্প, স্ট্যাম্প পেপার, ডকুমেন্টেশন এবং আয়কর রিটার্ন সংক্রান্ত সেবা পাওয়া যায়।",
  },
  {
    question: "আমি কীভাবে অর্ডার করতে পারি?",
    answer:
      "প্রয়োজনীয় পণ্য নির্বাচন করে কার্টে যোগ করুন। এরপর Checkout পেজে তথ্য দিয়ে অর্ডার সম্পন্ন করুন।",
  },
  {
    question: "আয়কর রিটার্ন পূরণের সেবা পাওয়া যায় কি?",
    answer:
      "হ্যাঁ। আয়কর রিটার্ন ফর্ম পূরণ ও রিটার্ন প্রস্তুতের জন্য আমাদের বিশেষজ্ঞের সহায়তা পাওয়া যায়।",
  },
  {
    question: "পাইকারি স্ট্যাম্প পাওয়া যায় কি?",
    answer:
      "হ্যাঁ। বড় পরিমাণে স্ট্যাম্পের প্রয়োজন হলে পাইকারি অর্ডারের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।",
  },
  {
    question: "কীভাবে যোগাযোগ করব?",
    answer:
      "ফোন, ই-মেইল অথবা ওয়েবসাইটের Contact পেজের মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন।",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">

        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
          eStampBD.com
        </span>

        <h1 className="mt-4 text-3xl font-bold text-gray-800 md:text-4xl">
          সাধারণ জিজ্ঞাসা
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
          আমাদের পণ্য ও সেবা সম্পর্কে সাধারণ প্রশ্নগুলোর উত্তর
          এখানে পাওয়া যাবে।
        </p>

      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-4xl space-y-4">

        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                isOpen
                  ? "border-green-200 shadow-lg"
                  : "border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >

              {/* Question */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >

                <span
                  className={`text-sm font-semibold md:text-base ${
                    isOpen
                      ? "text-green-700"
                      : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-medium transition-all duration-300 ${
                    isOpen
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>

              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">

                  <div className="border-t border-gray-100 px-5 pb-5 pt-4">

                    <p className="text-sm leading-7 text-gray-600">
                      {faq.answer}
                    </p>

                  </div>

                </div>
              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Contact */}
      <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-green-50 px-6 py-6 text-center">

        <h3 className="text-lg font-bold text-gray-800">
          আপনার প্রশ্নের উত্তর খুঁজে পাচ্ছেন না?
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          আমাদের সাথে যোগাযোগ করুন। আমরা আপনার প্রয়োজন অনুযায়ী
          তথ্য ও সেবা দেওয়ার চেষ্টা করব।
        </p>

        <a
          href="tel:+8801305573617"
          className="mt-4 inline-block rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          📞 যোগাযোগ করুন
        </a>

      </div>

    </section>
  );
}