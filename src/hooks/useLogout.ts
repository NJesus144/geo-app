import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { toast } from '@/hooks/use-toast'

export function useLogout() {
  const router = useRouter()
  const resetAuth = useAuthStore((state) => state.clearAuth)

  const logout = () => {
    resetAuth()
    toast({
      title: 'Logout realizado com sucesso!',
      description: 'Você será redirecionado para o login.',
    })
    router.push('/login')
  }

  return logout
}
