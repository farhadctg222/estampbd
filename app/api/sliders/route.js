import { NextResponse } from "next/server";
import database from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await database.execute(`
      SELECT
        id,
        title,
        subtitle,
        image_url,
        link_url,
        status,
        sort_order,
        created_at
      FROM home_sliders
      WHERE status = 'active'
      ORDER BY sort_order ASC, id DESC
    `);

    return NextResponse.json(rows);

  } catch (error) {
    console.error("SLIDER API ERROR:", error);

    return NextResponse.json(
      {
        error: "Slider load failed",
      },
      {
        status: 500,
      }
    );
  }
}