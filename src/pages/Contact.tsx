import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "We've received your message. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Contact Form */}
          <Card className="p-8 border-border">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="border-border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={5}
                  className="border-border resize-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-sm text-muted-foreground">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </form>
          </Card>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for quick answers?
            </p>
            <a
              href="/FAQ.tsx"
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

