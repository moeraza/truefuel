import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:slug", async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post("/api/orders", async (req, res) => {
    const parsed = insertOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid order data", errors: parsed.error.flatten() });
    }
    const order = await storage.createOrder(parsed.data);
    res.status(201).json(order);
  });

  app.get("/api/orders/:id", async (req, res) => {
    const order = await storage.getOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  });

  // Stripe: check if configured
  app.get("/api/stripe/status", (_req, res) => {
    res.json({ configured: !!stripe });
  });

  // Stripe: create checkout session
  app.post("/api/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        message: "Stripe is not configured. Set STRIPE_SECRET_KEY environment variable.",
      });
    }

    const { items } = req.body as {
      items: { productId: string; quantity: number }[];
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Build line items from server-side product data (prevents price tampering)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const item of items) {
      const product = await storage.getProductById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.productId}` });
      }
      lineItems.push({
        price_data: {
          currency: "cad",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(product.price * 100), // cents
        },
        quantity: item.quantity,
      });
    }

    // Determine the base URL for success/cancel redirects
    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, "") || "http://localhost:5000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/#/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#/cart`,
      shipping_address_collection: {
        allowed_countries: ["CA", "US"],
      },
    });

    res.json({ url: session.url });
  });

  // Stripe: retrieve session details for success page
  app.get("/api/checkout-session/:sessionId", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Stripe not configured" });
    }
    try {
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      res.json({
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
      });
    } catch {
      res.status(404).json({ message: "Session not found" });
    }
  });

  return httpServer;
}
