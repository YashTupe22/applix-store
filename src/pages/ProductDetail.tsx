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
  
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setOpen);

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

  const handleAddToCart = () => {
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
    toast.success("Added to cart", {
      description: `${quantity}x ${product.title}`,
      action: {
        label: "View Cart",
        onClick: () => setCartOpen(true),
      },
    });
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
          <h1 className="text-2xl font-heading font-semibold mb-4">Product not found</h1>
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

  // Parse description into structured sections if possible
  const parseDescription = (desc: string) => {
    const sections: { label: string; value: string }[] = [];
    
    // Common patterns in product descriptions
    const patterns = [
      { key: 'Product Name:', label: 'Product Name' },
      { key: 'Package Contains:', label: 'Package Contents' },
      { key: 'Material:', label: 'Material' },
      { key: 'Color:', label: 'Color' },
      { key: 'Combo:', label: 'Package' },
      { key: 'LBH:', label: 'Dimensions' },
      { key: 'Weight:', label: 'Weight' },
      { key: 'Product Dimension:', label: 'Dimensions' },
    ];

    let remainingDesc = desc;
    patterns.forEach(({ key, label }) => {
      const idx = remainingDesc.indexOf(key);
      if (idx !== -1) {
        const nextKeyIdx = patterns
          .map(p => remainingDesc.indexOf(p.key, idx + key.length))
          .filter(i => i > idx)
          .sort((a, b) => a - b)[0] || remainingDesc.length;
        
        const value = remainingDesc.substring(idx + key.length, nextKeyIdx).trim();
        if (value) {
          sections.push({ label, value });
        }
      }
    });

    return sections;
  };

  const descriptionSections = product.description ? parseDescription(product.description) : [];

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <Link 
          to="/products" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <ProductImageGallery images={images} productTitle={product.title} />

          {/* Details */}
          <div className="space-y-6">
            {/* Title and Wishlist */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                  {product.title}
                </h1>
                <p className="text-xl md:text-2xl font-bold text-foreground mt-2">
                  {currentVariant?.price.currencyCode}{' '}
                  {parseFloat(currentVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Variants */}
            {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variant = product.variants.edges.find((v) =>
                          v.node.selectedOptions.some(
                            (opt) => opt.name === option.name && opt.value === value
                          )
                        );
                        const isSelected = variant?.node.id === selectedVariant;
                        
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => variant && setSelectedVariant(variant.node.id)}
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-none h-11 w-11"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-11 w-14 flex items-center justify-center border-y border-border bg-background">
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-none h-11 w-11"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full h-12"
                disabled={!currentVariant?.availableForSale}
              >
                <Plus className="mr-2 h-5 w-5" />
                {currentVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="w-full border-t border-border pt-4">
              <AccordionItem value="description" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium uppercase tracking-wide hover:no-underline py-4">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {product.description || "No description available."}
                </AccordionContent>
              </AccordionItem>

              {descriptionSections.length > 0 && (
                <AccordionItem value="details" className="border-b border-border">
                  <AccordionTrigger className="text-sm font-medium uppercase tracking-wide hover:no-underline py-4">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <dl className="space-y-2">
                      {descriptionSections.map((section, idx) => (
                        <div key={idx} className="flex gap-2">
                          <dt className="text-muted-foreground font-medium min-w-[120px]">
                            {section.label}:
                          </dt>
                          <dd className="text-foreground">{section.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="shipping" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium uppercase tracking-wide hover:no-underline py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  <p className="mb-2">Free shipping on orders over ₹999.</p>
                  <p>Returns accepted within 7 days of delivery. Items must be unused and in original packaging.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
}
