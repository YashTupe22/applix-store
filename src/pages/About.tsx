import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Quality",
      description:
        "We only stock premium appliances from trusted manufacturers that meet our rigorous quality standards.",
    },
    {
      title: "Innovation",
      description:
        "We stay ahead of the curve, bringing the latest smart home technology and energy-efficient solutions to our customers.",
    },
    {
      title: "Customer Service",
      description:
        "Your satisfaction is our priority. We provide expert guidance and responsive support before, during, and after your purchase.",
    },
    {
      title: "Sustainability",
      description:
        "We promote energy-efficient products and sustainable practices to help reduce environmental impact.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products Available" },
    { number: "15+", label: "Years in Business" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container max-w-3xl">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              About Applix
            </h1>
            <p className="text-lg text-muted-foreground">
              Transforming homes with premium appliances and modern living solutions since 2009.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-4xl py-12 px-4">
          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2009, Applix was born from a simple idea: to make premium home
                appliances and décor accessible to everyone. What started as a small showroom
                has grown into one of the leading online retailers for home appliances, serving
                customers across the globe.
              </p>
              <p>
                We believe that a well-appointed home should be attainable for everyone. That's
                why we carefully curate our selection, partner with trusted manufacturers, and
                maintain competitive pricing without compromising on quality.
              </p>
              <p>
                Today, Applix continues to evolve, embracing the latest technology and
                sustainable practices to meet the changing needs of modern homeowners. Whether
                you're furnishing your first apartment or upgrading your kitchen, we're here to
                help you create the home of your dreams.
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
