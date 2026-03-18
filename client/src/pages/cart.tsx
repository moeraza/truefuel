import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, shippingCost, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-6 h-6 text-muted-foreground" />
        </div>
        <h1 className="font-display text-xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground mb-6">Add some fuel to get started.</p>
        <Link href="/shop">
          <Button data-testid="button-start-shopping">
            Browse products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-xl font-bold mb-1">Cart</h1>
      <p className="text-sm text-muted-foreground mb-8">{count} item{count !== 1 ? "s" : ""}</p>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <Card key={item.productId} className="p-4 flex items-center gap-4" data-testid={`cart-item-${item.productId}`}>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate" data-testid={`text-cart-name-${item.productId}`}>{item.name}</h3>
              <span className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                data-testid={`button-decrease-${item.productId}`}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium tabular-nums" data-testid={`text-qty-${item.productId}`}>
                {item.quantity}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                data-testid={`button-increase-${item.productId}`}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-right min-w-[60px]">
              <span className="font-semibold text-sm tabular-nums" data-testid={`text-line-total-${item.productId}`}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => removeItem(item.productId)}
              data-testid={`button-remove-${item.productId}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>

      <div className="space-y-2 py-4 border-t border-border mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="text-sm tabular-nums" data-testid="text-cart-subtotal">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Shipping</span>
          <span className="text-sm tabular-nums" data-testid="text-cart-shipping">
            {shippingCost === 0 ? (
              <span className="text-primary font-medium">Free</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        {shippingCost > 0 && (
          <p className="text-xs text-muted-foreground">Free shipping on orders over $75</p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-semibold text-base">Total</span>
          <span className="font-bold text-lg tabular-nums" data-testid="text-cart-total">${total.toFixed(2)} CAD</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between">
        <Link href="/shop">
          <Button variant="outline" data-testid="button-continue-shopping">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue shopping
          </Button>
        </Link>
        <Link href="/checkout">
          <Button data-testid="button-checkout">
            Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
