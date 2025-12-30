import { createShopifyOrder } from "./shopify";

export async function handleOrderCreated(data: any) {
  await createShopifyOrder({
    external_id: data.order_id,
    customer: data.customer,
    items: data.items,
    payment_mode: "COD",
    total: data.total_amount,
    address: data.shipping_address,
  });
}
export async function handlePaymentSuccess(data: any) {
  await updateShopifyOrder(data.order_id, {
    financial_status: "paid",
  });
}

export async function handlePaymentFailed(data: any) {
  await updateShopifyOrder(data.order_id, {
    tags: ["payment_failed"],
  });
}
export async function handleShipmentCreated(data: any) {
  await updateShopifyOrder(data.order_id, {
    tracking_number: data.awb,
    courier: data.courier_name,
  });
}
