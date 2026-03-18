import { type Product, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductById(id: string): Promise<Product | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
}

const SEED_PRODUCTS: Product[] = [
  {
    id: "flask-150",
    name: "TrueFuel Gel Flask — 150ml",
    slug: "gel-flask-150",
    description: "Reusable, BPA-free soft flask. Holds 2 gel servings. Lock-top bite valve for clean, one-handed fueling on the move.",
    longDescription: "Built for runners who refuse single-use waste. This 150ml soft flask is made from durable, food-grade TPU with a lock-top bite valve — squeeze and sip without breaking stride. Sized to fit any running vest pocket or shorts flask holder. Dishwasher safe. One flask replaces hundreds of single-use gel packets over its lifetime.\n\nFeatures:\n- 150ml capacity (2 gel servings)\n- BPA-free, food-grade TPU\n- Lock-top bite valve prevents leaks\n- Fits standard vest pockets\n- Dishwasher safe\n- Graduated markings for easy filling",
    price: 15.00,
    originalPrice: 20.00,
    imageUrl: "/images/product-flask.jpg",
    category: "flask",
    carbsPer25g: null,
    servingsPerBag: null,
    weightGrams: 35,
    inStock: true,
  },
  {
    id: "powder-1000",
    name: "TrueFuel Carb Mix — 1kg",
    slug: "carb-mix-1000",
    description: "1:0.8 maltodextrin:fructose blend. ~40 servings per bag at 25g carbs each. Best value for high-mileage training blocks.",
    longDescription: "The bulk option for serious training blocks and race season. Same 1:0.8 maltodextrin-to-fructose formula, double the volume. At our early-bird price, you're paying $0.62 per gel — that's less than a quarter of what most runners spend on branded gels.\n\nEach 1kg bag yields approximately 40 gel servings (25g carbs each).\n\nIngredients: Maltodextrin (corn-derived), Crystalline Fructose.\nAllergen info: Produced in a facility that handles dairy and soy.",
    price: 24.99,
    originalPrice: 34.99,
    imageUrl: "/images/product-powder.jpg",
    category: "powder",
    carbsPer25g: 25,
    servingsPerBag: 40,
    weightGrams: 1000,
    inStock: true,
  },
];

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    for (const p of SEED_PRODUCTS) {
      this.products.set(p.id, p);
    }
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find((p) => p.slug === slug);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { ...insertOrder, id, status: "pending" };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
