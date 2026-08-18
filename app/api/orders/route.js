import { verifyToken } from "@/app/lib/auth";
import database from "@/app/lib/db";

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
      items,

      payment_method,
      payment_number,
      transaction_id,

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
    // Cash / bKash / Nagad
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
    // Only bKash / Nagad
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
      try {
        // ===============================================
        // CREATE ORDER
        // ===============================================

        const [orderResult] = await database.execute(
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

            // Cash হলে payment number লাগবে না
            payment_method === "cash"
              ? null
              : payment_number,

            // Cash হলে transaction ID লাগবে না
            payment_method === "cash"
              ? null
              : transaction_id,

            Number(total || 0),
          ]
        );

        const orderId = orderResult.insertId;

        // ===============================================
        // INSERT ORDER ITEMS
        // ===============================================

        for (const item of items) {
          if (!item.id) {
            throw new Error(
              `Product ID missing: ${
                item.name || "Unknown Product"
              }`
            );
          }

          await database.execute(
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

        // ===============================================
        // SUCCESS
        // ===============================================

        return Response.json(
          {
            success: true,
            insertId: orderId,
            message: "Order placed successfully",
          },
          { status: 201 }
        );
      } catch (err) {
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
    console.error(
      "ORDER API ERROR:",
      err
    );

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

    // ===============================================
    // AUTHENTICATION
    // ===============================================

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

    // ===============================================
    // GET ORDERS
    // ===============================================

    const [orders] =
      await database.execute(
        `
        SELECT
          orders.*,
          areas.name AS area_name
        FROM orders
        LEFT JOIN areas
          ON orders.area_id = areas.id
        ORDER BY orders.id DESC
        `
      );

    // ===============================================
    // ATTACH ORDER ITEMS
    // ===============================================

    for (const order of orders) {
      const [items] =
        await database.execute(
          `
          SELECT
            order_items.*,
            packages.name
          FROM order_items
          JOIN packages
            ON order_items.package_id = packages.id
          WHERE order_items.order_id = ?
          `,
          [order.id]
        );

      order.items = items;
    }

    // ===============================================
    // RESPONSE
    // ===============================================

    return Response.json(orders || []);
  } catch (err) {
    console.error(
      "GET ORDERS ERROR:",
      err
    );

    return Response.json(
      {
        error: "Server error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}