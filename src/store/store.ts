import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';

type StoreState = ReturnType<typeof createAuthSlice>;

export const useStore = create<StoreState>()(
  persist(
    (set, get, store) => ({
      ...createAuthSlice(set, get, store),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
