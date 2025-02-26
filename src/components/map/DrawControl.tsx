'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import { FeatureGroup, useMap } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

interface DrawControlProps {
  onCreated: (e: L.DrawEvents.Created) => void
}

export function DrawControl({ onCreated }: DrawControlProps) {
  const map = useMap()

  useEffect(() => {
    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.FeatureGroup) {
          layer.clearLayers()
        }
      })
    }
  }, [map])

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        draw={{
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
        }}
      />
    </FeatureGroup>
  )
}
