import { CreateRegionDialog } from '@/components/CreateRegionDialog'
import { RegionsTable } from '@/components/RegionsTable'
import RegionsMapWrapper from '@/components/map/MapRegionsWrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useListRegions } from '@/hooks/useListRegions'
import { useNearbyRegions } from '@/hooks/useNearByRegions'
import { useRegionsByPoint } from '@/hooks/useRegionsByPoint'
import { useUserRegions } from '@/hooks/useUserRegions'
import { IUser, Region } from '@/types'
import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface RegionTabsProps {
  user: IUser
  onEdit: (region: Region) => void
  onDelete: (region: Region) => void
  isDeleting: boolean
}

enum SearchType {
  POINT = 'POINT',
  NEARBY = 'NEARBY',
}

export function RegionTabs({
  user,
  onEdit,
  onDelete,
  isDeleting,
}: RegionTabsProps) {
  const [includeOtherUsers, setIncludeOtherUsers] = useState(false)
  const { data: regionsList } = useListRegions()
  const { data: userRegions } = useUserRegions(user._id)
  const [coordinates, setCoordinates] = useState({ longitude: 0, latitude: 0 })
  const [distance, setDistance] = useState(1000)
  const queryClient = new QueryClient()

  const { data: pointRegions } = useRegionsByPoint(
    coordinates.longitude,
    coordinates.latitude,
  )

  const { data: nearbyRegions } = useNearbyRegions(
    coordinates.longitude,
    coordinates.latitude,
    distance,
    includeOtherUsers ? undefined : user._id,
  )

  const handleSearch = (type: SearchType.POINT | SearchType.NEARBY) => {
    if (!coordinates.longitude || !coordinates.latitude) {
      return
    }

    if (type === SearchType.POINT) {
      queryClient.invalidateQueries({ queryKey: ['regions', 'point'] })
    } else {
      queryClient.invalidateQueries({ queryKey: ['regions', 'nearby'] })
    }
  }

  return (
    <Tabs defaultValue="my-regions" className="w-full h-full">
      <TabsList className="flex gap-4 w-full flex-col mb-10 h-20 md:flex-row">
        <div className="flex">
          <TabsTrigger value="my-regions">Minhas Regiões</TabsTrigger>
          <TabsTrigger value="all-regions">Todas as Regiões</TabsTrigger>
        </div>
        <div className="flex">
          <TabsTrigger value="point-search">Buscar por ponto</TabsTrigger>
          <TabsTrigger value="nearby-search">
            Buscar nas proximidades
          </TabsTrigger>
        </div>
      </TabsList>

      <TabsContent value="my-regions">
        {userRegions && userRegions.length > 0 && (
          <>
            <RegionsTable
              regions={userRegions}
              userId={user._id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <RegionsMapWrapper
              user={user}
              regions={userRegions}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          </>
        )}
        <div className="my-6">
          <CreateRegionDialog userId={user._id} />
        </div>
      </TabsContent>

      <TabsContent value="all-regions">
        {regionsList && regionsList.length > 0 && (
          <RegionsTable
            regions={regionsList}
            userId={user._id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </TabsContent>

      <TabsContent value="point-search">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  placeholder="-46.633308"
                  value={coordinates.longitude}
                  onChange={(e) =>
                    setCoordinates((prev) => ({
                      ...prev,
                      longitude: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  placeholder="-23.550520"
                  value={coordinates.latitude}
                  onChange={(e) =>
                    setCoordinates((prev) => ({
                      ...prev,
                      latitude: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => handleSearch(SearchType.POINT)}
            >
              Buscar
            </Button>
          </div>

          {pointRegions && pointRegions.length > 0 ? (
            <div className="mt-6">
              <RegionsTable
                regions={pointRegions}
                userId={user._id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              <div className="h-[400px] mt-4">
                <RegionsMapWrapper
                  user={user}
                  regions={pointRegions}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              </div>
            </div>
          ) : (
            <div className="text-center mt-6 text-muted-foreground">
              Nenhuma região encontrada perto deste ponto
            </div>
          )}
        </Card>
      </TabsContent>

      <TabsContent value="nearby-search">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="longitude-near">Longitude</Label>
                <Input
                  id="longitude-near"
                  type="number"
                  placeholder="-46.633308"
                  value={coordinates.longitude}
                  onChange={(e) =>
                    setCoordinates((prev) => ({
                      ...prev,
                      longitude: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="latitude-near">Latitude</Label>
                <Input
                  id="latitude-near"
                  type="number"
                  placeholder="-23.550520"
                  value={coordinates.latitude}
                  onChange={(e) =>
                    setCoordinates((prev) => ({
                      ...prev,
                      latitude: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance">Distância (metros)</Label>
              <Input
                id="distance"
                type="number"
                placeholder="1000"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="include-others"
                checked={includeOtherUsers}
                onCheckedChange={setIncludeOtherUsers}
              />
              <Label htmlFor="include-others">
                Incluir regiões de outros usuários
              </Label>
            </div>

            <Button
              className="w-full"
              onClick={() => handleSearch(SearchType.NEARBY)}
            >
              Buscar
            </Button>
          </div>

          {nearbyRegions && nearbyRegions.length > 0 ? (
            <div className="mt-6">
              <RegionsTable regions={nearbyRegions} />
              <div className="h-[400px] mt-4">
                <RegionsMapWrapper
                  user={user}
                  regions={nearbyRegions}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              </div>
            </div>
          ) : (
            <div className="text-center mt-6 text-muted-foreground">
              Incluir regiões de outros usuários
            </div>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  )
}
