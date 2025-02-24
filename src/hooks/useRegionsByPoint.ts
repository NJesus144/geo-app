import { useQuery } from '@tanstack/react-query'
import { regionService } from '@/services/regionService'

export function useRegionsByPoint(longitude: number, latitude: number) {
  return useQuery({
    queryKey: ['regions', 'point', longitude, latitude],
    queryFn: () => regionService.findRegionsByPoint(longitude, latitude),
    enabled: Boolean(longitude && latitude)
  })
}
