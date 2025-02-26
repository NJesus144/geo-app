/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmationDialog } from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { IUser, Region } from '@/types'
import L from 'leaflet'
import { Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MapContainer, Polygon, TileLayer } from 'react-leaflet'

interface RegionsMapProps {
  regions: Region[]
  onEdit: (region: Region) => void
  onDelete: (region: Region) => void
  isDeleting: boolean
  user: IUser
}

export default function RegionsMap({
  regions,
  onEdit,
  onDelete,
  isDeleting,
  user,
}: RegionsMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)

  useEffect(() => {
    setIsMounted(true)
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    })
  }, [])

  if (!isMounted) return null

  const center =
    regions.length > 0
      ? regions[0].polygon.coordinates[0][0]
      : [2.1686, 41.3874] // São Paulo as default

  return (
    <div className="w-full h-[400px] relative">
      <MapContainer
        center={[center[1], center[0]]}
        zoom={12}
        style={{ zIndex: 0 }}
        className="w-full h-full rounded-lg border"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {regions.map((region) => (
          <Polygon
            key={region._id}
            positions={region.polygon.coordinates[0].map(([lng, lat]) => [
              lat,
              lng,
            ])}
            pathOptions={{
              color: selectedRegion?._id === region._id ? '#2563eb' : '#3b82f6',
              fillColor:
                selectedRegion?._id === region._id ? '#60a5fa' : '#93c5fd',
              fillOpacity: 0.5,
            }}
            eventHandlers={{
              click: () => setSelectedRegion(region),
            }}
          />
        ))}
      </MapContainer>

      {selectedRegion && (
        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-medium mb-2">{selectedRegion.name}</h3>
          {selectedRegion.user._id === user._id && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onEdit(selectedRegion)
                  setSelectedRegion(null)
                }}
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <DeleteConfirmationDialog
                title="Excluir região"
                description={`Tem certeza que deseja excluir a região "${selectedRegion.name}"? Esta ação não pode ser desfeita.`}
                trigger={
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                }
                isDeleting={isDeleting}
                onConfirm={() => {
                  onDelete(selectedRegion)
                  setSelectedRegion(null)
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
