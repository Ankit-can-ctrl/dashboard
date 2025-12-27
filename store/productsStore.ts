import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
}

interface ProductsState {
  products: Product[];
  total: number;
  isLoading: boolean;
  fetchProducts: (limit: number, skip: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchByCategory: (category: string) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  total: 0,
  isLoading: false,

  fetchProducts: async (limit, skip) => {
    set({ isLoading: true });
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();
    set({ products: data.products, total: data.total, isLoading: false });
  },

  searchProducts: async (query) => {
    set({ isLoading: true });
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    set({ products: data.products, total: data.total, isLoading: false });
  },

  fetchByCategory: async (category) => {
    set({ isLoading: true });
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    set({ products: data.products, total: data.total, isLoading: false });
  },
}));
