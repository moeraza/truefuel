import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { type Product } from "@shared/schema";
import { Leaf, DollarSign, FlaskConical, ArrowRight, ShoppingCart, Mountain } from "lucide-react";

const COMPARISON_DATA = [
  { brand: "Maurten Gel 100", price: 5.00, carbs: 25, note: "Per single-use packet" },
  { brand: "GU Energy Gel", price: 2.50, carbs: 22, note: "Per single-use packet" },
  { brand: "SiS GO Isotonic Gel", price: 2.75, carbs: 22, note: "Per single-use packet" },
  { brand: "Spring Energy Gel", price: 4.50, carbs: 28, note: "Per single-use packet" },
];

function formatCostPer25g(price: number, carbs: number) {
  return ((price / carbs) * 25).toFixed(2);
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[480px] md:min-h-[540px] flex items-end">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-mountains.jpg"
          alt="Mountain trail at golden hour"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-16 w-full">
        <Badge variant="secondary" className="mb-5 bg-white/15 text-white/90 border-white/10 backdrop-blur-sm" data-testid="badge-early-bird">
          Early Bird Pricing — Limited Time
        </Badge>
        <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight text-white mb-4" data-testid="text-hero-title">
          Fuel your run<br />
          for pennies, not dollars.
        </h1>
        <p className="text-base md:text-lg text-white/75 max-w-md mb-8 leading-relaxed">
          A refillable gel system built on science-backed carb ratios.
          Cut costs by 80% and keep single-use packets off the trail.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/shop">
            <Button size="lg" className="bg-white text-[hsl(24,30%,12%)] hover:bg-white/90 font-semibold" data-testid="button-shop-now">
              Shop now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/how-to">
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10" data-testid="button-how-it-works">
              How it works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    { icon: DollarSign, title: "$0.62 / gel", desc: "vs $2.50–$5.00 for branded packets. Same carbs, fraction of the cost." },
    { icon: Leaf, title: "Zero single-use waste", desc: "One reusable flask replaces hundreds of foil gel packets per year." },
    { icon: FlaskConical, title: "1:0.8 ratio", desc: "Maltodextrin:fructose blend backed by sports science for max absorption at 90g/hr." },
  ];
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        {props.map((p, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <p.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-base" data-testid={`text-value-prop-${i}`}>{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CostComparison() {
  const truefuelCostPer25g = 0.62;
  return (
    <section className="bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-xl font-bold mb-2" data-testid="text-comparison-heading">Cost per 25g of carbs</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-lg">
          The same energy, a fraction of the price. Here's how TrueFuel stacks up against popular gel brands per 25g serving of carbohydrates.
        </p>
        <div className="space-y-3">
          {/* TrueFuel row */}
          <div className="flex items-center gap-4 p-4 rounded-md bg-primary/5 border border-primary/15">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">TrueFuel Carb Mix</span>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/10">You save 80%</Badge>
              </div>
              <span className="text-xs text-muted-foreground">1kg bag, early-bird price</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-primary" data-testid="text-truefuel-cost">${truefuelCostPer25g.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground block">per 25g carbs</span>
            </div>
          </div>
          {/* Competitor rows */}
          {COMPARISON_DATA.map((comp, i) => {
            const costPer25g = formatCostPer25g(comp.price, comp.carbs);
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-md bg-muted/40">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm">{comp.brand}</span>
                  <span className="text-xs text-muted-foreground block">{comp.note}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-muted-foreground" data-testid={`text-competitor-cost-${i}`}>${costPer25g}</span>
                  <span className="text-xs text-muted-foreground block">per 25g carbs</span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          Prices in CAD based on typical Canadian retail pricing as of March 2026. TrueFuel pricing based on 1kg bag at early-bird rate ($24.99 / 40 servings).
        </p>
      </div>
    </section>
  );
}

function ProductGrid() {
  const { data: products, isLoading } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const cart = useCart();

  if (isLoading) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16" id="products">
      <h2 className="font-display text-xl font-bold mb-2">Products</h2>
      <p className="text-sm text-muted-foreground mb-8">Everything you need. Nothing you don't.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {products?.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col" data-testid={`card-product-${product.id}`}>
            {/* Product image */}
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-base leading-snug hover:text-primary transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{product.description}</p>
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
        ))}
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="border-t border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-4">
          <Mountain className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Why we built TrueFuel</h2>
        </div>
        <div className="prose prose-sm max-w-xl text-muted-foreground">
          <p className="leading-relaxed">
            We're runners. We've done the math on how much we spend on gels during a 100-miler training block —
            and how many foil packets end up in the trash (or worse, on the trail).
          </p>
          <p className="leading-relaxed mt-3">
            The sports nutrition industry charges premium prices for simple sugars wrapped in single-use plastic.
            A packet of maltodextrin and fructose costs pennies to produce, but $2.50–$5.00 per serving to buy.
          </p>
          <p className="leading-relaxed mt-3">
            TrueFuel is the fix: buy the raw carb mix in bulk, mix your own gel, carry it in a reusable flask.
            Same science-backed 1:0.8 maltodextrin:fructose ratio that the premium brands use —
            without the markup or the waste.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValueProps />
      <CostComparison />
      <ProductGrid />
      <MissionSection />
    </div>
  );
}
