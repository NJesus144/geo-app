import axios from 'axios'
import { useAuthStore } from '@/store/auth'

export const api = axios.create({
  baseURL: 'https://api-ozmap.onrender.com/api',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  console.log('TOKEN ENVIADO:', token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
