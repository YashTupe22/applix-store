import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] hero-gradient flex items-center justify-center overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-primary-foreground leading-tight mb-4">
          Smart Appliances.
          <br />
          <span className="text-primary-foreground/80">Beautiful Living.</span>
        </h2>
        
        <p className="text-primary-foreground/70 text-sm sm:text-base md:text-lg mb-8 max-w-md mx-auto">
          Elevate your home with premium appliances and décor designed for modern living.
        </p>
        
        <Link to="/products">
          <Button 
            size="lg" 
            variant="hero"
            className="group"
          >
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
