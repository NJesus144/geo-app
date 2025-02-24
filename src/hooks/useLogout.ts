import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { toast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const router = useRouter()
  const resetAuth = useAuthStore((state) => state.clearAuth)
  const queryClient = useQueryClient()

  const logout = () => {
    resetAuth()
    queryClient.clear()
    toast({
      title: 'Logout realizado com sucesso!',
      description: 'Você será redirecionado para o login.',
    })
    router.push('/login')
  }

  return logout
}