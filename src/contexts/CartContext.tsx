"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Fit } from "@/data/products";

export interface CartItem {
  productSlug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
  // Garment fit. Missing is treated as 'mens'.
  fit?: Fit;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  selectedCharity: string | null;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productSlug: string; color: string; size: string; fit?: Fit } }
  | { type: "UPDATE_QUANTITY"; payload: { productSlug: string; color: string; size: string; fit?: Fit; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "SET_CHARITY"; payload: string | null };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  selectedCharity: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (productSlug: string, color: string, size: string, fit?: Fit) => void;
  updateQuantity: (productSlug: string, color: string, size: string, fit: Fit | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setSelectedCharity: (id: string | null) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productSlug === action.payload.productSlug &&
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          (item.fit ?? "mens") === (action.payload.fit ?? "mens")
      );
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productSlug === action.payload.productSlug &&
              item.color === action.payload.color &&
              item.size === action.payload.size &&
              (item.fit ?? "mens") === (action.payload.fit ?? "mens")
            )
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.productSlug === action.payload.productSlug &&
                item.color === action.payload.color &&
                item.size === action.payload.size &&
                (item.fit ?? "mens") === (action.payload.fit ?? "mens")
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productSlug === action.payload.productSlug &&
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          (item.fit ?? "mens") === (action.payload.fit ?? "mens")
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [], selectedCharity: null };
    case "SET_CHARITY":
      return { ...state, selectedCharity: action.payload };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

const STORAGE_KEY = "ao-strength-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false, selectedCharity: null });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {
      // silent fail on parse error
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // silent fail on storage error
    }
  }, [state.items]);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    itemCount,
    subtotal,
    selectedCharity: state.selectedCharity,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (productSlug, color, size, fit) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productSlug, color, size, fit } }),
    updateQuantity: (productSlug, color, size, fit, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productSlug, color, size, fit, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    openCart: () => dispatch({ type: "OPEN_CART" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    setSelectedCharity: (id) => dispatch({ type: "SET_CHARITY", payload: id }),
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
