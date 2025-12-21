import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
              Applix
            </h4>
            <p className="text-muted-foreground text-sm">
              Premium home appliances and décor for modern living.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h5 className="font-heading font-medium text-foreground mb-3">
              Quick Links
            </h5>
            <nav className="space-y-2">
              {["Products", "Categories", "About", "Support"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h5 className="font-heading font-medium text-foreground mb-3">
              Contact
            </h5>
            <p className="text-sm text-muted-foreground">
              support@applix.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Applix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
