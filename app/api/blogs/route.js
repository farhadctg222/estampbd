import { NextResponse } from "next/server";
import database from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await database.execute(`
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
        created_at,
        updated_at
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("BLOG API ERROR:", error);

    return NextResponse.json(
      {
        error: "Blog load failed",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}