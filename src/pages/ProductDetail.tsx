'use client';

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Plus, Minus, Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductImageGallery } from "@/components/ProductImageGallery";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const {
    addItem,
    setOpen: setCartOpen,
    createCheckout,
    createShiprocketCheckout,
    setPaymentMode,
  } = useCartStore();

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants.edges[0]) {
          setSelectedVariant(data.variants.edges[0].node.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [handle]);

  const currentVariant = product?.variants.edges.find(
    (v) => v.node.id === selectedVariant
  )?.node;

  const addCurrentItemToCart = () => {
    if (!product || !currentVariant) return;

    const cartItem: CartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: currentVariant.id,
      variantTitle: currentVariant.title,
      price: currentVariant.price,
      quantity,
      selectedOptions: currentVariant.selectedOptions || [],
    };

    addItem(cartItem);
    return cartItem;
  };

  const handleAddToCart = () => {
    addCurrentItemToCart();
    toast.success("Added to cart", {
      description: `${quantity}x ${product?.title}`,
      action: {
        label: "View Cart",
        onClick: () => setCartOpen(true),
      },
    });
  };

  const handlePayOnline = () => {
    if (!currentVariant?.availableForSale) return;
    addCurrentItemToCart();
    setPaymentMode('PREPAID');
    createCheckout();
  };

  const handleCODCheckout = () => {
    if (!currentVariant?.availableForSale) return;
    addCurrentItemToCart();
    setPaymentMode('COD');
    createShiprocketCheckout();
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-heading font-semibold mb-4">
            Product not found
          </h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images.edges;

  return (
    <Layout>
      <div className="container py-8">
        <Link
          to="/products"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ProductImageGallery images={images} productTitle={product.title} />

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  {product.title}
                </h1>
                <p className="text-xl md:text-2xl font-bold mt-2">
                  {currentVariant?.price.currencyCode}{" "}
                  {parseFloat(currentVariant?.price.amount || "0").toFixed(2)}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="px-4 font-medium">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full"
                disabled={!currentVariant?.availableForSale}
              >
                Add to Cart
              </Button>

              <Button
                onClick={handlePayOnline}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!currentVariant?.availableForSale}
              >
                Pay Online
              </Button>

              <Button
                onClick={handleCODCheckout}
                size="lg"
                className="w-full bg-black hover:bg-black/90"
                disabled={!currentVariant?.availableForSale}
              >
                Buy Now – Cash on Delivery
              </Button>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  {product.description || "No description available."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
}
