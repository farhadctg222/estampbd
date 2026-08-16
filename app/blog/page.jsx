import Link from "next/link";

async function getBlogs() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Blog API Error:", res.status);
      return [];
    }

    const data = await res.json();

    // API সরাসরি [] দিলে
    if (Array.isArray(data)) {
      return data;
    }

    // API { blogs: [] } দিলে
    if (Array.isArray(data.blogs)) {
      return data.blogs;
    }

    return [];
  } catch (error) {
    console.error("Blog fetch error:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <section className="bg-green-700 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-green-200 font-semibold mb-2">
            eStampBD.com
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Blog & Articles
          </h1>

          <p className="mt-4 text-green-100 max-w-2xl mx-auto leading-7">
            আইন, স্ট্যাম্প, কোর্ট ফি, চাকরি, বিদেশে যাওয়া
            এবং প্রয়োজনীয় তথ্য সম্পর্কে আমাদের বিভিন্ন
            লেখা পড়ুন।
          </p>

        </div>
      </section>

      {/* ================= BLOG LIST ================= */}

      <section className="max-w-6xl mx-auto px-4 py-10">

        {blogs.length === 0 ? (

          <div className="bg-white rounded-2xl border p-10 text-center">

            <div className="text-5xl mb-4">
              📝
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              এখনো কোনো Blog প্রকাশিত হয়নি
            </h2>

            <p className="text-gray-500 mt-2">
              Admin Panel থেকে নতুন Blog প্রকাশ করুন।
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {blogs.map((blog) => (

              <article
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
              >

                {/* ================= IMAGE ================= */}

                <Link href={`/blog/${blog.slug}`}>

                  {blog.image_url ? (

                    <img
                      src={blog.image_url}
                      alt={blog.title || "Blog Image"}
                      className="w-full h-52 object-cover hover:scale-105 transition duration-500"
                    />

                  ) : (

                    <div className="w-full h-52 bg-green-100 flex items-center justify-center">

                      <span className="text-6xl">
                        📝
                      </span>

                    </div>

                  )}

                </Link>

                {/* ================= CONTENT ================= */}

                <div className="p-5">

                  {/* CATEGORY */}

                  {blog.category && (

                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>

                  )}

                  {/* TITLE */}

                  <Link href={`/blog/${blog.slug}`}>

                    <h2 className="text-xl font-bold text-gray-800 mt-3 line-clamp-2 hover:text-green-600 transition">
                      {blog.title}
                    </h2>

                  </Link>

                  {/* EXCERPT */}

                  {blog.excerpt && (

                    <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-6">
                      {blog.excerpt}
                    </p>

                  )}

                  {/* AUTHOR + DATE */}

                  <div className="flex items-center justify-between mt-4">

                    <p className="text-xs text-gray-400">
                      ✍️ {blog.author || "eStampBD"}
                    </p>

                    {blog.created_at && (

                      <p className="text-xs text-gray-400">
                        {new Date(
                          blog.created_at
                        ).toLocaleDateString("bn-BD")}
                      </p>

                    )}

                  </div>

                  {/* BUTTON */}

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition"
                  >
                    বিস্তারিত পড়ুন →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}