'use client'

import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { DrawControl } from './DrawControl'
import { MapContainer, TileLayer } from 'react-leaflet'

interface MapComponentProps {
  onPolygonCreated: (coordinates: number[][][]) => void
}

export function MapComponent({ onPolygonCreated }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapKey = useRef(`map-${Math.random()}`).current

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreated = (e: any) => {
    const { layerType, layer } = e
    if (layerType === 'polygon') {
      const coordinates = layer
        .getLatLngs()[0]
        .map((point: L.LatLng) => [point.lng, point.lat])
      coordinates.push(coordinates[0])
      onPolygonCreated([coordinates])
    }
  }

  return (
    <MapContainer
      key={mapKey}
      ref={mapRef}
      center={[-23.5505, -46.6333]}
      zoom={13}
      className="h-[400px] w-full rounded-md border"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DrawControl onCreated={handleCreated} />
    </MapContainer>
  )
}
