import { toast } from '@/hooks/use-toast'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useDeleteUserMutation() {
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()

  return useMutation({
    mutationFn: () => {
      if (!user?._id) throw new Error('User ID not found')
      return authService.delete(user._id)
    },
    onSuccess: () => {
      clearAuth()
      toast({
        title: 'Conta excluída',
        description: 'Sua conta foi excluída com sucesso.',
      })
      router.push('/login')
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir conta',
        description: 'Não foi possível excluir sua conta.',
      })
    },
  })
}
