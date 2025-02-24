import { api } from '@/lib/api'
import { CreateRegionInput } from '@/lib/validations/region'
import { Region } from '@/types'

interface RegionResponse {
  status: string
  region?: Region
  regions?: Region[]
}

export const regionService = {
  async listRegions(): Promise<Region[]> {
    const response = await api.get<Region[]>('/regions')
    return response.data
  },

  async listUserRegions(userId: string): Promise<Region[]> {
    const response = await api.get<Region[]>(`/regions/user/${userId}`)
    return response.data
  },

  async findRegionsByPoint(
    longitude: number,
    latitude: number,
  ): Promise<Region[]> {
    const response = await api.get<RegionResponse>('/regions/point/contains', {
      params: {
        longitude: longitude.toString(),
        latitude: latitude.toString(),
      },
    })
    return response.data.regions || []
  },

  async findNearbyRegions(
    longitude: number,
    latitude: number,
    distance: number,
    userId?: string,
  ): Promise<Region[]> {
    const params: Record<string, string> = {
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      distance: distance.toString(),
    }

    if (userId) {
      params.userId = userId
    }

    const response = await api.get<RegionResponse>('/regions/point/near', {
      params,
    })
    return response.data.regions || []
  },

  async createRegion(data: CreateRegionInput): Promise<Region> {
    const response = await api.post<Region>('/regions', data)
    return response.data
  },

  async deleteRegion(id: string): Promise<void> {
    await api.delete(`/regions/${id}`)
  },

  async updateRegion(id: string, data: CreateRegionInput): Promise<Region> {
    const response = await api.patch<Region>(`/regions/${id}`, data)
    return response.data
  },
}
