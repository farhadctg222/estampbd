// /app/api/packages/route.js";

import database from "@/app/lib/db";




export async function GET() {
  const [rows] = await database.execute("SELECT * FROM packages WHERE status=1");
  return Response.json(rows);
}