import { toast } from '@/hooks/use-toast'
import { regionService } from '@/services/regionService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateRegion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: regionService.createRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'] })
      toast({ title: 'Região criada com sucesso' })
    },
  })
}
