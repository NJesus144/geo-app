import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth'
import { RegisterInput } from '@/lib/validations/auth'

export function useCreateUserMutation() {
  const router = useRouter()
  const { setToken, setUser } = useAuthStore()

  return useMutation({
    mutationFn: (data: RegisterInput) => {
      return authService.register(data)
    },
    onSuccess: (data) => {
      setToken(data.token, data.user)
      setUser(data.user)
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você será redirecionado para o dashboard.',
      })
      router.push('/dashboard')
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar conta',
        description: 'Verifique os dados e tente novamente.',
      })
    },
  })
}
