import { NextResponse } from "next/server";

/**
 * Shiprocket Checkout API
 * Endpoint: /api/shiprocket/checkout
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /* ---------- BASIC VALIDATION ---------- */
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    /* ---------- STEP 1: LOGIN TO SHIPROCKET ---------- */
    const authRes = await fetch(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD,
        }),
      }
    );

    const authData = await authRes.json();

    if (!authRes.ok || !authData.token) {
      console.error("Shiprocket auth failed:", authData);
      return NextResponse.json(
        { error: "Shiprocket authentication failed" },
        { status: 401 }
      );
    }

    const token = authData.token;

    /* ---------- STEP 2: CREATE CHECKOUT ---------- */
    const checkoutRes = await fetch(
      "https://apiv2.shiprocket.in/v1/external/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_method: "COD",

          customer: body.customer ?? {
            email: "test@applixstore.com",
            phone: "9999999999",
          },

          billing_address: body.billing_address ?? {
            name: "Test User",
            address: "Test Address",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            country: "India",
            phone: "9999999999",
          },

          shipping_address: body.shipping_address ?? {
            name: "Test User",
            address: "Test Address",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            country: "India",
            phone: "9999999999",
          },

          items: body.items,
        }),
      }
    );

    const checkoutData = await checkoutRes.json();

    if (!checkoutRes.ok || !checkoutData.checkout_url) {
      console.error("Shiprocket checkout error:", checkoutData);
      return NextResponse.json(
        { error: "Checkout creation failed", details: checkoutData },
        { status: 400 }
      );
    }

    /* ---------- SUCCESS ---------- */
    return NextResponse.json({
      checkoutUrl: checkoutData.checkout_url,
    });
  } catch (error) {
    console.error("Shiprocket checkout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
