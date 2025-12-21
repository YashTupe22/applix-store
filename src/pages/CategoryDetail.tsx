import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchCollectionProducts } from "@/lib/shopify";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryDetail() {
  const { handle } = useParams<{ handle: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["collection", handle],
    queryFn: () => fetchCollectionProducts(handle!, 50),
    enabled: !!handle,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/categories">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
        </Link>

        {isLoading ? (
          <>
            <div className="mb-8 space-y-2">
              <div className="h-8 bg-muted rounded w-48 animate-pulse" />
              <div className="h-4 bg-muted rounded w-96 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : error || !data ? (
          <div className="text-center py-12">
            <p className="text-destructive">Category not found</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {data.title}
              </h1>
              {data.description && (
                <p className="text-muted-foreground mt-2">{data.description}</p>
              )}
            </div>

            {data.products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {data.products.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No products in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
