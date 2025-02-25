'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { Region } from '@/types'
import 'leaflet/dist/leaflet.css'

interface RegionsMapProps {
  regions: Region[]
  onEdit: (region: Region) => void
  onDelete: (region: Region) => void
  isDeleting: boolean
}

const RegionsMapWrapper: FunctionComponent<RegionsMapProps> = (props) => {
  const [RegionsMapComp, setRegionsMapComp] =
    useState<FunctionComponent<RegionsMapProps>>()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        ;(async () => {
          const RegionsMapModule = await import('./RegionsMap')
          setRegionsMapComp(() => RegionsMapModule.default)
          setReady(true)
        })()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  if (typeof window === 'undefined' || !RegionsMapComp || !ready) {
    return (
      <div className="h-[400px] w-full rounded-md border bg-slate-100 animate-pulse" />
    )
  }

  return <RegionsMapComp {...props} />
}

export default RegionsMapWrapper
