import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { items, setOpen } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 md:px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMenuToggle}
        className="text-foreground hover:bg-muted"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <Link to="/" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-xl md:text-2xl font-heading font-semibold tracking-tight text-foreground">
          Applix
        </h1>
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost" 
          size="icon" 
          className="relative text-foreground hover:bg-muted"
          onClick={() => setOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems > 9 ? '9+' : totalItems}
            </Badge>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </div>
    </header>
  );
}
