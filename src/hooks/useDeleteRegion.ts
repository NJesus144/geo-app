import { toast } from "@/hooks/use-toast"
import { regionService } from "@/services/regionService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteRegion() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: regionService.deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'] })
      toast({ title: 'Região excluída com sucesso' })
    }
  })
}