import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@applix.com",
      subtext: "Response time: within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      subtext: "Monday - Friday, 9AM - 6PM EST",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Tech Boulevard",
      subtext: "San Francisco, CA 94105",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Fri: 9AM - 6PM",
      subtext: "Sat - Sun: 10AM - 4PM EST",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container max-w-4xl">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="container max-w-4xl py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="p-6 border-border">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-muted p-3">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-foreground font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {info.subtext}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for quick answers?
            </p>
            <a
              href="/faq"
              className="inline-block px-6 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors"
            >
              Visit our FAQ
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
