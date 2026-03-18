import { useState, useCallback, useSyncExternalStore } from "react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

type CartListener = () => void;

let cartItems: CartItem[] = [];
let listeners: Set<CartListener> = new Set();

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(listener: CartListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  return cartItems;
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const addItem = useCallback(
    (product: { id: string; name: string; price: number; imageUrl: string }, qty: number = 1) => {
      const existing = cartItems.find((i) => i.productId === product.id);
      if (existing) {
        cartItems = cartItems.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      } else {
        cartItems = [
          ...cartItems,
          { productId: product.id, name: product.name, price: product.price, quantity: qty, imageUrl: product.imageUrl },
        ];
      }
      emitChange();
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    cartItems = cartItems.filter((i) => i.productId !== productId);
    emitChange();
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter((i) => i.productId !== productId);
    } else {
      cartItems = cartItems.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      );
    }
    emitChange();
  }, []);

  const clearCart = useCallback(() => {
    cartItems = [];
    emitChange();
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const shippingCost = subtotal >= 75 ? 0 : 10;
  const total = subtotal + shippingCost;

  return { items, addItem, removeItem, updateQuantity, clearCart, subtotal, shippingCost, total, count };
}
