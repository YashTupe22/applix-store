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
