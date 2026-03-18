import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Loader2, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

function useSessionId() {
  // Parse session_id from the hash query string: /#/order-success?session_id=cs_xxx
  const hash = window.location.hash;
  const queryPart = hash.split("?")[1];
  if (!queryPart) return null;
  const params = new URLSearchParams(queryPart);
  return params.get("session_id");
}

export default function OrderSuccess() {
  const sessionId = useSessionId();

  const { data: session, isLoading, isError } = useQuery<{
    customerEmail: string | null;
    customerName: string | null;
    amountTotal: number | null;
    currency: string | null;
    paymentStatus: string;
  }>({
    queryKey: ["/api/checkout-session", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/checkout-session/${sessionId}`);
      return res.json();
    },
  });

  if (isLoading && sessionId) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  const paid = session?.paymentStatus === "paid";
  const amountDisplay = session?.amountTotal
    ? `$${(session.amountTotal / 100).toFixed(2)} ${(session.currency || "cad").toUpperCase()}`
    : null;

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
        {paid ? (
          <Check className="w-7 h-7 text-primary" />
        ) : (
          <Package className="w-7 h-7 text-primary" />
        )}
      </div>

      <h1 className="font-display text-xl font-bold mb-2" data-testid="text-order-success">
        {paid ? "Payment successful" : "Order received"}
      </h1>

      {session?.customerName && (
        <p className="text-sm text-muted-foreground mb-1">
          Thanks, {session.customerName}.
        </p>
      )}

      {amountDisplay && (
        <p className="text-sm font-medium mb-1" data-testid="text-order-amount">
          {amountDisplay}
        </p>
      )}

      {session?.customerEmail && (
        <p className="text-sm text-muted-foreground mb-6">
          A confirmation has been sent to {session.customerEmail}.
        </p>
      )}

      {!session && !isLoading && (
        <p className="text-sm text-muted-foreground mb-6">
          {isError
            ? "We couldn't load your order details, but your payment was processed. Check your email for confirmation."
            : "Thank you for your order. You'll receive a confirmation email shortly."}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/shop">
          <Button data-testid="button-continue-shopping">Continue shopping</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" data-testid="button-back-home">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
