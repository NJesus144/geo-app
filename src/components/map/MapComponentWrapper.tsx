'use client'

import { FunctionComponent, useEffect, useState } from 'react'

interface MapComponentProps {
  onPolygonCreated: (coordinates: number[][][]) => void
}

const MapComponentWrapper: FunctionComponent<MapComponentProps> = ({
  onPolygonCreated,
}) => {
  const [MapComp, setMapComp] = useState<FunctionComponent<MapComponentProps>>()

  useEffect(() => {
    ;(async () => {
      if (typeof window !== 'undefined') {
        const { MapComponent } = await import('./MapComponent')
        setMapComp(() => MapComponent)
      }
    })()
  }, [])

  if (typeof window === 'undefined' || !MapComp) {
    return (
      <div className="h-[400px] w-full rounded-md border bg-slate-100 animate-pulse" />
    )
  }

  return <MapComp onPolygonCreated={onPolygonCreated} />
}

export default MapComponentWrapper
