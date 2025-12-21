import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const ShippingReturns = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: "Free on orders over $150 / $9.99 otherwise",
      description: "Regular delivery to your doorstep.",
    },
    {
      name: "Express Shipping",
      time: "2-3 business days",
      cost: "$24.99",
      description: "Faster delivery for urgent needs.",
    },
    {
      name: "Next Day Shipping",
      time: "Next business day",
      cost: "$49.99",
      description: "Get your items tomorrow (orders placed before 2 PM EST).",
    },
    {
      name: "International Shipping",
      time: "7-14 business days",
      cost: "Calculated at checkout",
      description: "We ship to over 50 countries worldwide.",
    },
  ];

  const returnProcess = [
    {
      step: 1,
      title: "Initiate Return",
      description:
        "Log into your account and go to 'My Orders'. Select the order and click 'Return Item'. Follow the instructions to create your return.",
    },
    {
      step: 2,
      title: "Receive Label",
      description:
        "We'll email you a prepaid shipping label. Print it out and attach it to your package.",
    },
    {
      step: 3,
      title: "Ship It Back",
      description:
        "Drop off your package at any authorized shipping location. We provide tracking so you can monitor its progress.",
    },
    {
      step: 4,
      title: "Receive Refund",
      description:
        "Once we receive and inspect your return, we'll process your refund. It will appear in your account within 5-10 business days.",
    },
  ];

  const returnExceptions = [
    {
      category: "Final Sale Items",
      description: "Clearance and marked-down items are typically final sale.",
      items: ["Clearance items", "Special pricing items", "Open-box products"],
    },
    {
      category: "Condition Requirements",
      description: "Items must be in original condition with packaging.",
      items: [
        "Unused (for most items)",
        "Original packaging intact",
        "All accessories included",
        "No signs of use",
      ],
    },
    {
      category: "Time Limits",
      description: "Returns must be initiated within specified timeframes.",
      items: [
        "Standard items: 30 days",
        "Appliances: 60 days",
        "Custom orders: No returns",
      ],
    },
  ];

  const internationalInfo = [
    {
      title: "Customs & Duties",
      description:
        "International orders may be subject to customs duties and taxes. You are responsible for any additional charges.",
    },
    {
      title: "Returns from Abroad",
      description:
        "International returns are accepted but customers pay return shipping. Contact support for return authorization.",
    },
    {
      title: "Restricted Items",
      description:
        "Some items cannot be shipped to certain countries due to regulations. Check product details before ordering.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container max-w-4xl">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Shipping & Returns
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn about our shipping options, return policies, and how to manage your orders.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-4xl py-12 px-4">
          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>

            {/* Shipping Tab */}
            <TabsContent value="shipping" className="space-y-6">
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Shipping Options
                </h2>
                <div className="space-y-4">
                  {shippingOptions.map((option, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-muted p-2 flex-shrink-0 mt-1">
                          <Clock className="h-5 w-5 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-foreground mb-1">
                            {option.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {option.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Delivery: {option.time}
                              </p>
                              <p className="text-sm font-medium text-foreground">
                                Cost: {option.cost}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border bg-card/50">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Shipping Information
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Orders are typically processed within 1-2 business days</li>
                      <li>• Weekends and holidays are not counted as business days</li>
                      <li>• Major appliances may have extended processing times</li>
                      <li>• You'll receive tracking information via email when your order ships</li>
                      <li>• Large items may require signature upon delivery</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Returns Tab */}
            <TabsContent value="returns" className="space-y-6">
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Return Process
                </h2>
                <div className="space-y-4">
                  {returnProcess.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold">
                          {item.step}
                        </div>
                        {item.step < returnProcess.length && (
                          <div className="w-0.5 h-12 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="pb-4">
                        <h3 className="font-heading font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                  Return Policy Exceptions
                </h2>
                <div className="space-y-6">
                  {returnExceptions.map((exception, index) => (
                    <div key={index}>
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {exception.category}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {exception.description}
                      </p>
                      <ul className="space-y-1">
                        {exception.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle className="h-4 w-4 text-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {index < returnExceptions.length - 1 && (
                        <div className="border-b border-border mt-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* International Tab */}
            <TabsContent value="international" className="space-y-6">
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  International Shipping
                </h2>
                <div className="space-y-4">
                  {internationalInfo.map((info, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                  Supported Countries
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Canada",
                    "United Kingdom",
                    "Germany",
                    "France",
                    "Japan",
                    "Australia",
                    "Mexico",
                    "Brazil",
                    "India",
                    "Singapore",
                    "New Zealand",
                    "Ireland",
                  ].map((country) => (
                    <div
                      key={country}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-foreground" />
                      {country}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  ...and 40+ more countries. Contact us for availability in your region.
                </p>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Contact CTA */}
          <Card className="mt-12 p-8 bg-card border-border text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our customer service team is ready to assist you with shipping and return inquiries.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingReturns;
