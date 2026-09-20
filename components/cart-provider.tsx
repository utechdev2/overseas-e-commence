"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "overseas-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: Omit<CartItem, "quantity">) => {
      setItems((current) => {
        const index = current.findIndex((x) => x.slug === item.slug && x.size === item.size);
        if (index === -1) return [...current, { ...item, quantity: 1 }];
        return current.map((x, i) => i === index ? { ...x, quantity: x.quantity + 1 } : x);
      });
    };

    const removeItem = (slug: string, size: string) =>
      setItems((current) => current.filter((x) => !(x.slug === slug && x.size === size)));

    const updateQuantity = (slug: string, size: string, quantity: number) =>
      setItems((current) => current.map((x) =>
        x.slug === slug && x.size === size ? { ...x, quantity: Math.max(1, quantity) } : x
      ));

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart: () => setItems([]),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
