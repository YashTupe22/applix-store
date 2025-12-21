import { X, Home, Package, Grid3X3, HelpCircle, Mail, Info, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/categories", label: "Categories", icon: Grid3X3 },
  { href: "/about", label: "About", icon: Info },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/shipping-returns", label: "Shipping & Returns", icon: Truck },
];

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Menu Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] max-w-[80vw] bg-sidebar text-sidebar-foreground z-50 shadow-elegant transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <span className="font-heading font-semibold text-lg">Menu</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">
            © {new Date().getFullYear()} Applix
          </p>
        </div>
      </div>
    </>
  );
}
