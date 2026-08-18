// app/api/orders/[id]/route.js

import database from "../../../lib/db";
import { verifyToken } from "../../auth";



// =====================================================
// POST - CREATE ORDER
// =====================================================

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      address,
      delivery_note,

      package_id,
      area_id,
      quantity,

      total,
      subtotal,
      packaging_charge,
      delivery_charge,

      items,

      payment_method,
      payment_number,
      transaction_id,

      // শুধু তথ্য হিসেবে আসতে পারে
      // কোনো payment restriction হবে না
      is_stamp_order,
    } = body;

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!name || !phone) {
      return Response.json(
        {
          error: "Name and phone are required",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    if (!["cash", "bkash", "nagad"].includes(payment_method)) {
      return Response.json(
        {
          error:
            "Please select Cash on Delivery, bKash or Nagad",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // ONLINE PAYMENT VALIDATION
    // শুধুমাত্র bKash / Nagad হলে লাগবে
    // =====================================================

    if (
      payment_method === "bkash" ||
      payment_method === "nagad"
    ) {
      if (!payment_number) {
        return Response.json(
          {
            error: "Payment number is required",
          },
          { status: 400 }
        );
      }

      if (!transaction_id) {
        return Response.json(
          {
            error: "Transaction ID is required",
          },
          { status: 400 }
        );
      }
    }

    // =====================================================
    // CART ORDER
    // =====================================================

    if (Array.isArray(items) && items.length > 0) {
      const connection = await database.getConnection();

      try {
        await connection.beginTransaction();

        // =================================================
        // INSERT ORDER
        // =================================================

        const [orderResult] = await connection.execute(
          `
          INSERT INTO orders
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
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            name,
            phone,
            address || null,
            delivery_note || null,

            payment_method,

            // Cash হলে null
            payment_method === "cash"
              ? null
              : payment_number,

            // Cash হলে null
            payment_method === "cash"
              ? null
              : transaction_id,

            Number(total || 0),
          ]
        );

        const orderId = orderResult.insertId;

        // =================================================
        // INSERT ORDER ITEMS
        // =================================================

        for (const item of items) {
          if (!item.id) {
            throw new Error(
              `Product ID missing for item: ${
                item.name || "Unknown"
              }`
            );
          }

          await connection.execute(
            `
            INSERT INTO order_items
            (
              order_id,
              package_id,
              quantity,
              price
            )
            VALUES (?, ?, ?, ?)
            `,
            [
              orderId,
              Number(item.id),
              Number(item.quantity || 1),
              Number(item.price || 0),
            ]
          );
        }

        // =================================================
        // COMMIT
        // =================================================

        await connection.commit();

        return Response.json(
          {
            success: true,
            insertId: orderId,
            message: "Order placed successfully",
          },
          { status: 201 }
        );
      } catch (err) {
        await connection.rollback();

        console.error(
          "CART ORDER DATABASE ERROR:",
          err
        );

        return Response.json(
          {
            error: "Order could not be created",
            details: err.message,
          },
          { status: 500 }
        );
      } finally {
        connection.release();
      }
    }

    // =====================================================
    // OLD SINGLE PACKAGE ORDER
    // =====================================================

    if (!package_id || !area_id) {
      return Response.json(
        {
          error:
            "Cart is empty or package/area information is missing",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // SINGLE ORDER INSERT
    // =====================================================

    try {
      const [result] = await database.execute(
        `
        INSERT INTO orders
        (
          customer_name,
          phone,
          address,
          package_id,
          area_id,
          quantity,
          total_price,
          payment_method,
          payment_number,
          transaction_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          name,
          phone,
          address || null,

          Number(package_id),
          Number(area_id),
          Number(quantity || 1),

          Number(total || 0),

          payment_method,

          payment_method === "cash"
            ? null
            : payment_number,

          payment_method === "cash"
            ? null
            : transaction_id,
        ]
      );

      return Response.json(
        {
          success: true,
          insertId: result.insertId,
          message: "Order placed successfully",
        },
        { status: 201 }
      );
    } catch (err) {
      console.error(
        "SINGLE ORDER DATABASE ERROR:",
        err
      );

      return Response.json(
        {
          error: "Order could not be created",
          details: err.message,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("ORDER API ERROR:", err);

    return Response.json(
      {
        error: "Invalid request",
        details: err.message,
      },
      { status: 500 }
    );
  }
}


// =====================================================
// GET - ADMIN ORDERS
// =====================================================

export async function GET(req) {
  try {
    const token =
      req.headers.get("authorization");

    const cleanToken =
      token?.replace("Bearer ", "");

    if (
      !cleanToken ||
      !verifyToken(cleanToken)
    ) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const [orders] =
      await database.execute(`
        SELECT
          orders.*,
          areas.name AS area_name
        FROM orders
        LEFT JOIN areas
          ON orders.area_id = areas.id
        ORDER BY orders.id DESC
      `);

    // =================================================
    // ATTACH ITEMS
    // =================================================

    for (const order of orders) {
      const [items] =
        await database.execute(
          `
          SELECT
            order_items.*,
            packages.name
          FROM order_items
          JOIN packages
            ON order_items.package_id =
               packages.id
          WHERE order_items.order_id = ?
          `,
          [order.id]
        );

      order.items = items;
    }

    return Response.json(orders || []);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);

    return Response.json(
      {
        error: "Server error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}