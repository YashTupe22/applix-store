import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      category: "Orders & Shipping",
      items: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days delivery. You'll receive tracking information via email once your order ships.",
        },
        {
          question: "Can I cancel or modify my order?",
          answer:
            "Orders can be cancelled or modified within 1 hour of placement. After that, orders move to processing and cannot be changed. Contact our support team immediately if you need assistance.",
        },
        {
          question: "Is there free shipping?",
          answer:
            "Free shipping is available on orders over ₹499. For orders under this amount, shipping costs are calculated based on weight and destination.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      items: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 7-day return policy for most items in their original condition. Products must be unused with original packaging. Some items like clearance products are final sale.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "",
        },
        {
          question: "How long do refunds take?",
          answer:
            "Refunds are processed within 5-10 business days after we receive your returned item. The refund will be credited to your original payment method.",
        },
        {
          question: "Can I return an item if I changed my mind?",
          answer:
            "Yes, as long as the item is unused and in original condition with packaging, for some orders there would be a charge of ₹50 to ₹100.",
        },
      ],
    },
    {
      category: "Products",
      items: [       
        {
          question: "Do you have stock availability information?",
          answer:
            "Yes, stock status is shown on each product page. Items marked 'In Stock' ship within 5-7 business days. Pre-order items have estimated delivery dates.",
        },
        {
          question: "Are there bulk discounts available?",
          answer:
            "We offer special pricing for bulk orders of 5+ items. Please contact our sales team at sales@applix.com for a custom quote.",
        },
        {
          question: "How can I track the energy efficiency of products?",
          answer:
            "All our products include ENERGY STAR ratings and efficiency information in the product specifications. This helps you choose products that save on electricity costs.",
        },
      ],
    },
    {
      category: "Account & Payment",
      items: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept Cash on Delivery, all major credit cards (Visa, Mastercard, American Express),Upi, PayPal, Google Pay, and Apple Pay. Installment payment options are available for orders over $500.",
        },

      ],
    },
    {
      category: "Technical Support",
      items: [
        {
          question: "I'm having trouble with the website. What should I do?",
          answer:
            "Try clearing your browser cache and cookies, or try a different browser. If the issue persists, contact our support team with details about the problem.",
        },
        {
          question: "How do I report a bug or issue?",
          answer:
            "Use the feedback form on our Contact page or email us at support@applix.com with screenshots. We appreciate your reports and respond promptly.",
        },
        {
          question: "Do you have a mobile app?",
          answer:
            "Our website is fully responsive and optimized for mobile devices. Dedicated apps for iOS and Android are coming soon.",
        },
      ],
    },
    {
      category: "Delivery & Installation",
      items: [
       
        {
          question: "What happens if my product arrives damaged?",
          answer:
            "Document the damage with photos and contact us within 48 hours of delivery. We'll arrange a replacement or refund immediately at no cost to you.",
        },
       
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container max-w-3xl">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about orders, shipping, returns, and more.
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container max-w-3xl py-12 px-4">
          <div className="space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  {section.category}
                </h2>
                <Card className="p-6">
                  <Accordion type="single" collapsible>
                    {section.items.map((item, index) => (
                      <AccordionItem key={index} value={`${section.category}-${index}`}>
                        <AccordionTrigger className="text-foreground hover:text-foreground/80">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <Card className="mt-12 p-8 bg-card border-border">
            <div className="text-center">
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Didn't find your answer?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help. Reach out to us anytime.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

