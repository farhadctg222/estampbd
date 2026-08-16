import { NextResponse } from "next/server";
import database from "../../../lib/db";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 }
      );
    }

    // =========================
    // GET BLOG
    // =========================

    const [rows] = await database.execute(
      `
      SELECT
        id,
        title,
        slug,
        excerpt,
        content,
        image_url,
        category,
        author,
        status,
        views,
        created_at,
        updated_at
      FROM blog_posts
      WHERE slug = ?
      AND status = 'published'
      LIMIT 1
      `,
      [slug]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const blog = rows[0];

    // =========================
    // INCREASE VIEW
    // =========================

    await database.execute(
      `
      UPDATE blog_posts
      SET views = views + 1
      WHERE id = ?
      `,
      [blog.id]
    );

    // নতুন view count response-এ পাঠানো
    blog.views = Number(blog.views || 0) + 1;

    return NextResponse.json(blog);

  } catch (error) {
    console.error("BLOG DETAILS API ERROR:", error);

    return NextResponse.json(
      {
        error: "Blog details failed",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}