import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { node } = product;
  const addItem = useCartStore((state) => state.addItem);
  const setOpen = useCartStore((state) => state.setOpen);
  
  const price = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: node.title,
      action: {
        label: "View Cart",
        onClick: () => setOpen(true),
      },
    });
  };

  return (
    <div className="group min-w-[200px] sm:min-w-[240px] bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300">
      <Link to={`/product/${node.handle}`} className="block">
        <div className="aspect-square bg-muted overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h4 className="font-heading font-medium text-foreground line-clamp-2 mb-2 group-hover:text-secondary transition-colors">
            {node.title}
          </h4>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <Button 
          onClick={handleAddToCart}
          variant="default"
          size="sm"
          className="w-full group/btn"
          disabled={!firstVariant?.availableForSale}
        >
          <Plus className="h-4 w-4 mr-2 group-hover/btn:rotate-90 transition-transform" />
          {firstVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
