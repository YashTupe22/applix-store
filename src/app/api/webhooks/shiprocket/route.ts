import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Shiprocket Webhook Receiver
 * Endpoint: /api/webhooks/shiprocket
 */

export async function POST(req: Request) {
  try {
    // Read raw body for signature verification
    const rawBody = await req.text();
    const receivedSignature = req.headers.get("x-shiprocket-signature");

    /* ---------- SIGNATURE VERIFICATION ---------- */
    if (process.env.SHIPROCKET_WEBHOOK_SECRET && receivedSignature) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.SHIPROCKET_WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

      if (receivedSignature !== expectedSignature) {
        console.error("Invalid Shiprocket webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const payload = JSON.parse(rawBody);

    /* ---------- LOG FOR DEBUG (SAFE) ---------- */
    console.log("Shiprocket webhook received:", payload.event);

    /* ---------- HANDLE EVENTS ---------- */
    switch (payload.event) {
      case "checkout.order.created":
        console.log("Order created:", payload.data?.order_id);
        break;

      case "checkout.payment.success":
        console.log("Payment success:", payload.data?.order_id);
        break;

      case "checkout.payment.failed":
        console.log("Payment failed:", payload.data?.order_id);
        break;

      case "shipment.created":
        console.log("Shipment created:", payload.data?.awb);
        break;

      case "order.cancelled":
        console.log("Order cancelled:", payload.data?.order_id);
        break;

      default:
        console.log("Unhandled Shiprocket event:", payload.event);
    }

    /* ---------- ACKNOWLEDGE WEBHOOK ---------- */
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Shiprocket webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
