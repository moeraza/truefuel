import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { type Product } from "@shared/schema";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug");
  const slug = params?.slug;
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/products/${slug}`);
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
        <div className="h-4 w-96 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-72 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h1 className="text-xl font-bold mb-2">Product not found</h1>
        <Link href="/shop">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to shop
          </Button>
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    cart.addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const descParagraphs = product.longDescription.split("\n\n");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/shop">
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          All products
        </button>
      </Link>

      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="font-display text-xl font-bold" data-testid="text-product-title">{product.name}</h1>
            {product.originalPrice && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/10 shrink-0">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center gap-4 py-4 border-y border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold" data-testid="text-product-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-sm text-muted-foreground">CAD</span>
          </div>
          <div className="ml-auto">
            <Button onClick={handleAdd} data-testid="button-add-to-cart">
              {added ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  Add to cart
                </>
              )}
            </Button>
          </div>
        </div>

        {product.servingsPerBag && (
          <div className="grid grid-cols-3 gap-4 text-center py-3">
            <div>
              <span className="text-lg font-bold">{product.servingsPerBag}</span>
              <span className="text-xs text-muted-foreground block mt-0.5">servings</span>
            </div>
            <div>
              <span className="text-lg font-bold">{product.weightGrams}g</span>
              <span className="text-xs text-muted-foreground block mt-0.5">bag weight</span>
            </div>
            <div>
              <span className="text-lg font-bold">${(product.price / product.servingsPerBag).toFixed(2)}</span>
              <span className="text-xs text-muted-foreground block mt-0.5">per serving</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {descParagraphs.map((para, i) => {
            if (para.startsWith("Features:")) {
              const items = para.replace("Features:", "").trim().split("\n- ").filter(Boolean);
              return (
                <div key={i}>
                  <h3 className="font-semibold text-sm mb-2">Features</h3>
                  <ul className="space-y-1.5">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (para.startsWith("Ingredients:") || para.startsWith("Allergen")) {
              return (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">{para}</p>
              );
            }
            return (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
