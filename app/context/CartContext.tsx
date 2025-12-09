"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../types/Product";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" }
  | { type: "INCREMENT"; id: number }
  | { type: "DECREMENT"; id: number };

const CartContext = createContext<{
  state: CartState;
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
} | null>(null);

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0), // remove if hits 0
      };
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    addToCart: (product: Product) => dispatch({ type: "ADD", product }),
    removeFromCart: (id: number) => dispatch({ type: "REMOVE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    increment: (id: number) => dispatch({ type: "INCREMENT", id }),
    decrement: (id: number) => dispatch({ type: "DECREMENT", id }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
