import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cart";
import { type Product } from "@shared/schema";
import { ShoppingCart } from "lucide-react";

export default function Shop() {
  const { data: products, isLoading } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const cart = useCart();

  const flasks = products?.filter((p) => p.category === "flask") ?? [];
  const powders = products?.filter((p) => p.category === "powder") ?? [];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  function ProductCard({ product }: { product: Product }) {
    return (
      <Card className="overflow-hidden flex flex-col" data-testid={`card-product-${product.id}`}>
        {/* Product image */}
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-semibold text-base leading-snug hover:text-primary transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{product.description}</p>
          </div>
          <div className="flex items-end justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold" data-testid={`text-price-${product.id}`}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => cart.addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl })}
              data-testid={`button-add-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              Add
            </Button>
          </div>
          {product.servingsPerBag && (
            <p className="text-xs text-muted-foreground">
              ~{product.servingsPerBag} servings · ${(product.price / product.servingsPerBag).toFixed(2)}/serving
            </p>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-xl font-bold mb-1">Shop</h1>
      <p className="text-sm text-muted-foreground mb-10">All prices in CAD. Early-bird pricing — save up to 30%.</p>

      <section className="mb-12">
        <h2 className="font-semibold text-base mb-1">Reusable Gel Flasks</h2>
        <p className="text-sm text-muted-foreground mb-5">BPA-free, dishwasher safe, fits any running vest.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {flasks.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-base mb-1">Carb Mix Powder</h2>
        <p className="text-sm text-muted-foreground mb-5">Proprietary science-backed blend. Mix with water to make your own gel.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {powders.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
