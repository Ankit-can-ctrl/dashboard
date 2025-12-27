import { create } from "zustand";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  gender: string;
  phone: string;
  company: { name: string };
}

interface UsersState {
  users: User[];
  total: number;
  isLoading: boolean;
  fetchUsers: (limit: number, skip: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: 0,
  isLoading: false,

  fetchUsers: async (limit, skip) => {
    set({ isLoading: true });
    const res = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();
    set({ users: data.users, total: data.total, isLoading: false });
  },

  searchUsers: async (query) => {
    set({ isLoading: true });
    const res = await fetch(`https://dummyjson.com/users/search?q=${query}`);
    const data = await res.json();
    set({ users: data.users, total: data.total, isLoading: false });
  },
}));
