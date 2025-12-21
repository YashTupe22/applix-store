import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Quality",
      description:
        "Products selected based on utility, quality standards, and customer demand from verified manufacturers.",
    },
    {
      title: "Transparency",
      description:
        "Clear dropshipping operations with verified manufacturers and logistics partners for competitive pricing.",
    },
    {
      title: "Customer First",
      description:
        "Responsive support, secure payments, and structured return policies ensure peace of mind.",
    },
    {
      title: "Efficiency",
      description:
        "Smart, reliable appliances that enhance convenience and improve daily life through practical innovation.",
    },
  ];

  const stats = [
    { number: "Smart", label: "Everyday Appliances" },
    { number: "Direct", label: "From Manufacturers" },
    { number: "Fast", label: "Nationwide Delivery" },
    { number: "Secure", label: "Payment & Support" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section with Gradient */}
        <div className="hero-gradient py-16 md:py-20 px-4 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6 text-center">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 text-center leading-relaxed max-w-3xl mx-auto mb-8">
              "Applix is built on the principle of simplifying access to modern gadgets through transparent dropshipping operations, dependable suppliers, and customer-first service policies."
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#mission"
                className="px-6 py-2 bg-background text-foreground rounded-md hover:bg-background/90 transition-colors font-medium"
              >
                Discover more
              </a>
              <a
                href="/contact"
                className="px-6 py-2 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-md hover:bg-primary-foreground/10 transition-colors font-medium"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Decorative bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Main Content */}
        <div className="container max-w-4xl py-12 px-4">
          {/* Our Mission */}
          <section id="mission" className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Applix</strong> is a modern dropshipping brand dedicated to making smart, reliable, and affordable home solutions accessible to everyone. We specialize in <strong className="text-foreground">small home electronic appliances, kitchen gadgets, and cleaning appliances</strong> that simplify daily life through practical innovation and dependable performance.
              </p>
              <p>
                Our business model allows us to work directly with <strong className="text-foreground">verified manufacturers and logistics partners</strong>, enabling us to offer competitive pricing, trend-driven products, and nationwide delivery without the overhead of traditional warehousing. Every product listed on Applix is selected based on <strong className="text-foreground">utility, quality standards, and customer demand</strong>.
              </p>
              <p>
                At Applix, we believe technology should not feel complicated—it should feel <strong className="text-foreground">useful, efficient, and trustworthy</strong>. That is why our focus goes beyond selling products. We prioritize <strong className="text-foreground">transparent operations, secure payments, responsive customer support, and structured return policies</strong> to ensure complete peace of mind for our customers.
              </p>
              <p className="font-medium text-foreground">
                As a customer-first brand, our mission is simple:
              </p>
              <p className="font-semibold text-foreground text-lg">
                to deliver smart everyday appliances that enhance convenience, improve efficiency, and elevate modern living.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16 py-12 bg-card border border-border rounded-lg px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-heading font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 border-border">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-muted p-2 flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Why Choose Applix?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-border">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Expert Curation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every product is handpicked by our team of appliance experts to ensure quality,
                  value, and reliability.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Best Prices
                </h3>
                <p className="text-sm text-muted-foreground">
                  We offer competitive pricing and regular promotions to ensure you get the best
                  value for your money.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Expert Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our knowledgeable team is ready to help you find the perfect appliances for your
                  home and lifestyle.
                </p>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-card border border-border rounded-lg px-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our extensive collection of premium appliances and find everything you need
              to create your ideal living space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
