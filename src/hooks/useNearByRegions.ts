import { regionService } from '@/services/regionService'
import { useQuery } from '@tanstack/react-query'

export function useNearbyRegions(
  longitude: number,
  latitude: number,
  distance: number,
  userId?: string,
) {
  return useQuery({
    queryKey: ['regions', 'nearby', longitude, latitude, distance, userId],
    queryFn: () =>
      regionService.findNearbyRegions(longitude, latitude, distance, userId),
    enabled: Boolean(longitude && latitude && distance),
  })
}
