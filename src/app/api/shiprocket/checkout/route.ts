import { NextResponse } from "next/server";
import { getShiprocketToken } from "@/lib/shiprocket";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Invalid checkout payload" },
        { status: 400 }
      );
    }

    const token = await getShiprocketToken();

    const shiprocketRes = await fetch(
      "https://apiv2.shiprocket.in/v1/external/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_method: "COD",
          items: body.items,
          customer: body.customer, // optional but recommended
          billing_address: body.billing_address,
          shipping_address: body.shipping_address,
          callback_url:
            process.env.SHIPROCKET_CALLBACK_URL ||
            "https://applixstore.vercel.app/order/success",
        }),
      }
    );

    const data = await shiprocketRes.json();

    if (!shiprocketRes.ok || !data.checkout_url) {
      console.error("Shiprocket error:", data);
      return NextResponse.json(
        { error: "Shiprocket checkout failed", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json({
      checkoutUrl: data.checkout_url,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
