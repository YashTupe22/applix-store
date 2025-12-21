import { useState } from "react";
import { Header } from "./Header";
import { SideMenu } from "./SideMenu";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onMenuToggle={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
