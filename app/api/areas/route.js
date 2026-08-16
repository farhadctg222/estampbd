import database from "../../lib/db";


export async function GET() {
  try {
    const [rows] = await database.execute("SELECT id, name FROM areas");
    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}