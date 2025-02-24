import { useQuery } from '@tanstack/react-query'
import { regionService } from '@/services/regionService'

export function useUserRegions(userId: string) {
  return useQuery({
    queryKey: ['regions', 'user', userId],
    queryFn: () => regionService.listUserRegions(userId)
  })
}