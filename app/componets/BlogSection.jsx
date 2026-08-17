"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/blogs", {
          cache: "no-store",
        });

        const data = await res.json();

        console.log("BLOG API RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data?.error || "Blog load failed");
        }

        // API সরাসরি array দিলে
        if (Array.isArray(data)) {
          setPosts(data);
        }

        // API { posts: [] } দিলে
        else if (Array.isArray(data?.posts)) {
          setPosts(data.posts);
        }

        else {
          setPosts([]);
        }

      } catch (error) {
        console.error("Blog Error:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <section className="py-14 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between mb-8">

          <div>
            <p className="text-green-600 font-semibold">
              eStampBD Blog
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
              প্রয়োজনীয় তথ্য ও পরামর্শ
            </h2>

            <p className="text-gray-500 mt-2">
              স্ট্যাম্প, কোর্ট ফি, ডকুমেন্ট ও অন্যান্য গুরুত্বপূর্ণ তথ্য জানুন।
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
          >
            সব পোস্ট →
          </Link>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-10">

            <div className="inline-block w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

            <p className="text-gray-500 mt-3">
              Blog loading...
            </p>

          </div>
        )}

        {/* ================= NO POST ================= */}

        {!loading && posts.length === 0 && (
          <div className="bg-white rounded-2xl border p-10 text-center">

            <div className="text-5xl mb-3">
              📜
            </div>

            <h3 className="text-xl font-bold text-gray-700">
              এখনো কোনো Blog Post নেই
            </h3>

            <p className="text-gray-500 mt-2">
              Admin Panel থেকে নতুন Blog Post যোগ করুন।
            </p>

          </div>
        )}

        {/* ================= BLOG CARDS ================= */}

        {!loading && posts.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {posts.slice(0, 6).map((post) => (

              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
              >

                {/* ================= IMAGE ================= */}

                <Link href={`/blog/${post.slug}`}>

                  <div className="h-52 bg-gray-100 overflow-hidden">

                    {post.image_url ? (

                      <img
                        src={post.image_url}
                        alt={post.title || "Blog Image"}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center bg-green-50">

                        <span className="text-6xl">
                          📜
                        </span>

                      </div>

                    )}

                  </div>

                </Link>

                {/* ================= CONTENT ================= */}

                <div className="p-5">

                  {/* CATEGORY */}

                  {post.category && (
                    <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}

                  {/* TITLE */}

                  <Link href={`/blog/${post.slug}`}>

                    <h3 className="text-xl font-bold text-gray-800 mt-3 line-clamp-2 hover:text-green-600 transition">
                      {post.title}
                    </h3>

                  </Link>

                  {/* EXCERPT */}

                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mt-3 line-clamp-3 leading-6">
                      {post.excerpt}
                    </p>
                  )}

                  {/* AUTHOR + DATE */}

                  <div className="flex items-center justify-between mt-5 pt-4 border-t">

                    <div>

                      <p className="text-xs text-gray-400">
                        লেখক
                      </p>

                      <p className="text-sm font-semibold text-gray-700">
                        {post.author || "eStampBD"}
                      </p>

                    </div>

                    {post.created_at && (
                      <p className="text-xs text-gray-400">
                        {new Date(post.created_at).toLocaleDateString(
                          "bn-BD"
                        )}
                      </p>
                    )}

                  </div>

                  {/* READ MORE */}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="block mt-4 text-center bg-green-50 hover:bg-green-100 text-green-700 py-2.5 rounded-xl font-semibold transition"
                  >
                    বিস্তারিত পড়ুন →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

        {/* ================= MOBILE ALL BLOG ================= */}

        {!loading && posts.length > 0 && (

          <div className="text-center mt-8 md:hidden">

            <Link
              href="/blog"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              সব ব্লগ দেখুন →
            </Link>

          </div>

        )}

      </div>

    </section>
  );
}