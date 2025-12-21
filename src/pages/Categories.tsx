import { useQuery } from "@tanstack/react-query";
import { fetchCollections, ShopifyCollection } from "@/lib/shopify";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Grid3X3, Package } from "lucide-react";

function CollectionCard({ collection }: { collection: ShopifyCollection }) {
  return (
    <Link
      to={`/category/${collection.node.handle}`}
      className="group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-elegant transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {collection.node.image ? (
          <img
            src={collection.node.image.url}
            alt={collection.node.image.altText || collection.node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/20">
            <Grid3X3 className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {collection.node.title}
        </h3>
        {collection.node.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {collection.node.description}
          </p>
        )}
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Package className="h-3 w-3" />
          <span>{collection.node.productsCount.count} products</span>
        </div>
      </div>
    </Link>
  );
}

export default function Categories() {
  const { data: collections, isLoading, error } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        const result = await fetchCollections(20);
        console.log("Collections fetched:", result);
        return result;
      } catch (err) {
        console.error("Error fetching collections:", err);
        throw err;
      }
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Categories
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse our product collections
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-destructive font-semibold">Failed to load categories</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Unknown error occurred"}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        ) : collections && collections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.node.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Grid3X3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No categories found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create collections in your Shopify admin to organize products
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
