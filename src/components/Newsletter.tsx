import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setSubscribed(true);
    setEmail("");
    
    toast.success("Welcome to Applix!", {
      description: "You'll receive updates on new products and exclusive offers.",
    });
  };

  return (
    <section className="hero-gradient py-16 md:py-20 px-4">
      <div className="container max-w-xl text-center">
        <Mail className="h-10 w-10 mx-auto mb-4 text-primary-foreground/80" />
        
        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary-foreground mb-3">
          Stay Updated with Applix
        </h3>
        
        <p className="text-primary-foreground/70 mb-8">
          Subscribe for exclusive offers, new arrivals, and home décor inspiration.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 text-primary-foreground">
            <Check className="h-5 w-5" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground"
            />
            <Button 
              type="submit" 
              variant="newsletter"
              disabled={loading}
              className="shrink-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
