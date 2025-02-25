import { IUser } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: IUser | null
  isLoading: boolean
  setToken: (token: string, user: IUser) => void
  setUser: (user: IUser) => void
  setLoading: (loading: boolean) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: true,

      setToken: (token, user) => set({ token, user }),
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', 
    },
  ),
)
