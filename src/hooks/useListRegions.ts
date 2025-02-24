import { regionService } from '@/services/regionService'
import { useQuery } from '@tanstack/react-query'

export function useListRegions() {
  return useQuery({
    queryKey: ['regions'],
    queryFn: regionService.listRegions,
  })
}
