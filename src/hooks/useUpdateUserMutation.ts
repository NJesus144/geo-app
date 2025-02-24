import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RegisterInput } from '@/lib/validations/auth'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth'

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()
  const { user, setUser } = useAuthStore()

  return useMutation({
    mutationFn: (data: RegisterInput) => {
      if (!user?._id) throw new Error('User ID not found')
      return authService.update(user._id, data)
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
      })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar suas informações.',
      })
    },
  })
}
