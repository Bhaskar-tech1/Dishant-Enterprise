'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct } from '@/data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'dishanth-cart-v1';

function isValidCartItem(item) {
  if (!item || typeof item.productId !== 'string' || typeof item.variantId !== 'string' || !Number.isInteger(item.quantity) || item.quantity < 1) return false;

  const product = findProduct(item.productId);
  if (!product) return false;

  if (product.variants?.length) return product.variants.some((variant) => variant.id === item.variantId);
  return item.variantId === 'default';
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const validItems = useMemo(() => items.filter(isValidCartItem), [items]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter(isValidCartItem));
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* Storage can be unavailable in private contexts. */ }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validItems));
    } catch {
      // The cart remains available in memory if browser storage is unavailable.
    }
  }, [hydrated, validItems]);

  const addItem = useCallback((product, variant = null, quantity = 1) => {
    const variantId = variant?.id || 'default';
    const amount = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id && item.variantId === variantId);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + amount } : item);
      return [...current, { productId: product.id, variantId, quantity: amount }];
    });
  }, []);

  const changeQuantity = useCallback((productId, variantId, delta) => {
    setItems((current) => current.flatMap((item) => {
      if (item.productId !== productId || item.variantId !== variantId) return [item];
      const quantity = item.quantity + delta;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }, []);

  const removeItem = useCallback((productId, variantId) => {
    setItems((current) => current.filter((item) => item.productId !== productId || item.variantId !== variantId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const count = validItems.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(() => ({ items: validItems, count, hydrated, addItem, changeQuantity, removeItem, clearCart }), [validItems, count, hydrated, addItem, changeQuantity, removeItem, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
