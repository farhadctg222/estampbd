import Link from "next/link";
import { notFound } from "next/navigation";

async function getBlog(slug) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";

    const res = await fetch(
      `${baseUrl}/api/blogs/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (error) {
    console.error("Blog details error:", error);
    return null;
  }
}

export default async function BlogDetailsPage({ params }) {

  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">

      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border overflow-hidden">

        {/* IMAGE */}

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[450px] object-cover"
          />
        )}

        <div className="p-6 md:p-10">

          {/* CATEGORY */}

          {blog.category && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
          )}

          {/* TITLE */}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 leading-tight">
            {blog.title}
          </h1>

          {/* META */}

              <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
      <span>
        ✍️ {blog.author || "eStampBD"}
      </span>

      <span>
        👁️ {blog.views || 0} views
      </span>

      {blog.created_at && (
        <span>
          📅{" "}
          {new Date(blog.created_at).toLocaleDateString("bn-BD")}
        </span>
      )}
    </div>

          {/* EXCERPT */}

          {blog.excerpt && (
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mt-6 rounded">
              <p className="text-gray-700 leading-7">
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* CONTENT */}

          <div className="mt-8">

            <div
              className="prose prose-lg max-w-none text-gray-700 leading-8 whitespace-pre-line"
            >
              {blog.content}
            </div>

          </div>

          {/* BACK */}

          <div className="mt-10 pt-6 border-t">

            <Link
              href="/blog"
              className="inline-flex bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              ← সকল Blog দেখুন
            </Link>

          </div>

        </div>

      </article>

    </main>
  );
}