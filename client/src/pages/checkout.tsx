import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Check if Stripe is configured on the server
  const { data: stripeStatus } = useQuery<{ configured: boolean }>({
    queryKey: ["/api/stripe/status"],
  });

  const stripeConfigured = stripeStatus?.configured ?? false;

  // Stripe checkout mutation
  const stripeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/create-checkout-session", {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      return res.json() as Promise<{ url: string }>;
    },
    onSuccess: (data) => {
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    },
  });

  // Fallback demo order mutation (when Stripe is not configured)
  const demoMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/orders", {
        customerName: name,
        customerEmail: email,
        customerAddress: address,
        items: JSON.stringify(items),
        total,
      });
      return res.json();
    },
    onSuccess: () => {
      setOrderPlaced(true);
      clearCart();
    },
  });

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h1 className="font-display text-xl font-bold mb-2" data-testid="text-order-confirmed">Order confirmed</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Thanks for your order. We'll send a confirmation to your email with tracking information once your order ships.
        </p>
        <Link href="/">
          <Button variant="outline" data-testid="button-back-home">Back to home</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="font-display text-xl font-bold mb-2">Nothing to check out</h1>
        <p className="text-sm text-muted-foreground mb-6">Your cart is empty.</p>
        <Link href="/shop">
          <Button data-testid="button-go-shop">Browse products</Button>
        </Link>
      </div>
    );
  }

  // When Stripe is configured, show streamlined checkout with Stripe redirect
  if (stripeConfigured) {
    return (
      <div className="max-w-lg mx-auto px-6 py-12">
        <Link href="/cart">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="button-back-cart">
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </button>
        </Link>

        <h1 className="font-display text-xl font-bold mb-8">Checkout</h1>

        {/* Order summary */}
        <section className="mb-8">
          <h2 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Order summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-medium tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="font-semibold">Total</span>
            <span className="font-bold tabular-nums" data-testid="text-checkout-total">${total.toFixed(2)} CAD</span>
          </div>
        </section>

        {/* Stripe checkout button */}
        <section>
          {stripeMutation.isError && (
            <p className="text-sm text-destructive mb-4">Something went wrong. Please try again.</p>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={() => stripeMutation.mutate()}
            disabled={stripeMutation.isPending}
            data-testid="button-stripe-checkout"
          >
            {stripeMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redirecting to payment...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay ${total.toFixed(2)} CAD
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            Secure checkout powered by Stripe
          </p>
        </section>
      </div>
    );
  }

  // Fallback: demo checkout form (Stripe not configured)
  const canSubmit = name.trim() && email.trim() && address.trim() && !demoMutation.isPending;

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <Link href="/cart">
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="button-back-cart">
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </button>
      </Link>

      <h1 className="font-display text-xl font-bold mb-8">Checkout</h1>

      {/* Order summary */}
      <section className="mb-8">
        <h2 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Order summary</h2>
        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-medium tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-3 border-t border-border">
          <span className="font-semibold">Total</span>
          <span className="font-bold tabular-nums" data-testid="text-checkout-total">${total.toFixed(2)} CAD</span>
        </div>
      </section>

      {/* Shipping form */}
      <section>
        <h2 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Shipping information</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) demoMutation.mutate();
          }}
        >
          <div>
            <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Runner"
              required
              data-testid="input-name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              required
              data-testid="input-email"
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-sm font-medium mb-1.5 block">Shipping address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Trail Rd, Calgary, AB T2P 1A1"
              required
              className="min-h-[80px]"
              data-testid="input-address"
            />
          </div>

          {demoMutation.isError && (
            <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
          )}

          <Button type="submit" className="w-full" disabled={!canSubmit} data-testid="button-place-order">
            {demoMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Place order — $${total.toFixed(2)} CAD`
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Stripe is not configured — this is a demo checkout.
          </p>
        </form>
      </section>
    </div>
  );
}
