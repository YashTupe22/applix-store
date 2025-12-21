import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <Newsletter />
    </Layout>
  );
};

export default Index;
