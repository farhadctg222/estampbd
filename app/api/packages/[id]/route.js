import database from "../../../lib/db";



export async function GET(req, { params }) {
  const { id } = await params; // ❌ Not awaited

  console.log("Fetching package with ID:", id);

  const [rows] = await database.execute(
    "SELECT id, name, price FROM packages WHERE id=?",
    [id]
  );

  console.log("DB Result:", rows);

  return Response.json(rows[0] || {});
}