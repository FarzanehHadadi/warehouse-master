import { StateCreator } from 'zustand';

export interface AuthState {
  user: {
    userId: string;
    userName: string;
    role: string;
    mobile: string;
  } | null;
  setUser: (user: AuthState['user']) => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});
