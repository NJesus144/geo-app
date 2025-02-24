'use client'
import dynamic from 'next/dynamic'
import { MapComponent } from './MapComponent'

const DynamicMap = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-md border bg-slate-100 animate-pulse" />
  ),
})

interface ClientMapProps {
  onPolygonCreated: (coordinates: number[][][]) => void
}

export function ClientMap({ onPolygonCreated }: ClientMapProps) {
  return <DynamicMap onPolygonCreated={onPolygonCreated} />
}
