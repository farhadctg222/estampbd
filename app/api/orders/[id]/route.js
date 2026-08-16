
// app/api/orders/[id]/route.js

import { verifyToken } from "@/app/lib/auth";
import database from "@/app/lib/db";


// ======================
// PUT - UPDATE STATUS
// ======================
export async function PUT(req, context) {
  try {
    const raw = req.headers.get("authorization");

    const token = raw?.startsWith("Bearer ")
      ? raw.replace("Bearer ", "")
      : raw;

    if (!token || !verifyToken(token)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // 🔥 👉 এইখানে বসবে তোমার code
    const body = await req.json();

    

// ✅ status update
// ✅ status update + payment update
if (body.status || body.payment_status) {
  await database.execute(
    `UPDATE orders
     SET
       status = COALESCE(?, status),
       payment_status = COALESCE(?, payment_status)
     WHERE id=?`,
    [
      body.status ?? null,
      body.payment_status ?? null,
      id,
    ]
  );
}

// ✅ edit (name + phone + address)
if (
  body.name !== undefined ||
  body.phone !== undefined ||
  body.address !== undefined
) {
  await database.execute(
    "UPDATE orders SET customer_name=?, phone=?, address=? WHERE id=?",
    [
      body.name,
      body.phone,
      body.address,
      id
    ]
  );
}

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}


// ======================
// DELETE ORDER
// ======================
export async function DELETE(req, context) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token || !verifyToken(token)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params; // 🔥 SAFE FIX
    const id = Number(params.id);

    if (!id) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    await database.execute(
      "DELETE FROM orders WHERE id=?",
      [id]
    );

    return Response.json({
      success: true,
      message: "Order deleted",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}


// export async function GET(req, { params }) {
//   const { id } = params; // ✅ FIXED

//   console.log("Fetching package with ID:", id);

//   const [rows] = await db.execute(
//     "SELECT id, name, price FROM packages WHERE id=?",
//     [id]
//   );

//   console.log("DB RESULT:", rows); // ✅ debug

//   return Response.json(rows[0] || {});
// }



export async function GET(req, { params }) {
  const { id } = await params;

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Order ID missing" }),
      { status: 400 }
    );
  }

  try {
    const [rows] = await database.execute(
      `SELECT id, customer_name, total_price, status, payment_status, phone, quantity, address, delivery_note, created_at
FROM orders WHERE id=?`,
      [id]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (err) {
    console.error("DB Error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}


