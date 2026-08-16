
import { verifyToken } from "@/app/lib/auth";
import database from "../../lib/db";



export async function POST(req) {
  const body = await req.json();

  const {
  name,
  phone,
  address,
  package_id,
  area_id,
  quantity,
  total,
  items,
  payment_method,
  payment_number,
  transaction_id
} = body;
// ✅ Only bKash and Nagad allowed
if (!["bkash", "nagad"].includes(payment_method)) {
  return Response.json(
    { error: "Only bKash and Nagad payment allowed" },
    { status: 400 }
  );
}

// ✅ Payment info required
if (!payment_number || !transaction_id) {
  return Response.json(
    { error: "Payment number and transaction ID required" },
    { status: 400 }
  );
}
  // ✅ Case 1: Cart Order (multiple items)
  if (items && items.length > 0) {
    if (!name || !phone) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    try {
      // 🔥 main order insert
      const [orderResult] = await database.execute(
  `INSERT INTO orders 
  (
    customer_name,
    phone,
    address,
    delivery_note,
    payment_method,
    payment_number,
    transaction_id,
    total_price
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    name,
    phone,
    address || null,
    body.delivery_note || null,
    payment_method,
    payment_number || null,
    transaction_id || null,
    Number(total || 0)
  ]
);
      const orderId = orderResult.insertId;

      // 🔥 insert each item
      for (const item of items) {
        await database.execute(
          `INSERT INTO order_items (order_id, package_id, quantity, price) 
           VALUES (?, ?, ?, ?)`,
          [
            orderId,
            Number(item.id),
             Number(item.quantity || 1),
            Number(item.price)
          ]
        );
      }

      return Response.json({ success: true, insertId: orderId });

    } catch (err) {
      console.error(err);
      return Response.json({ error: "Server error" }, { status: 500 });
    }
  }

  // ✅ Case 2: Old Single Order (your existing system)
  if (!name || !phone || !package_id || !area_id) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const [result] = await database.execute(
      `INSERT INTO orders 
      (customer_name, phone, address, package_id, area_id, quantity, total_price) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
      name,
      phone,
      address || null,
      Number(package_id),
      Number(area_id),
      Number(quantity || 1),
      payment_method,
      payment_number,
      transaction_id,
      Number(total || 0)
      ]
    );

    return Response.json({ success: true, insertId: result.insertId });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}




export async function GET(req) {
  try {
    const token = req.headers.get("authorization");

    const cleanToken = token?.replace("Bearer ", "");

    if (!cleanToken || !verifyToken(cleanToken)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [orders] = await database.execute(`
      SELECT orders.*, areas.name as area_name
      FROM orders
      LEFT JOIN areas ON orders.area_id = areas.id
      ORDER BY orders.id DESC
    `);

    // items attach
    for (let order of orders) {
      const [items] = await database.execute(
        `SELECT order_items.*, packages.name
         FROM order_items
         JOIN packages ON order_items.package_id = packages.id
         WHERE order_items.order_id = ?`,
        [order.id]
      );

      order.items = items;
    }

    return Response.json(orders || []);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}