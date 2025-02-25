'use client'

import { DashboardLayout } from '@/components/dashboard/dashboardLayout'
import { EditRegionDialog } from '@/components/EditRegionDialog'
import { RegionTabs } from '@/components/RegionTabs'
import { useDeleteRegion } from '@/hooks/useDeleteRegion'
import { useAuthStore } from '@/store/auth'
import { Region } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, isLoading, setLoading } = useAuthStore()
  const router = useRouter()
  const { mutate: deleteRegion, isPending: isDeleting } = useDeleteRegion()
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    if (isLoading && user !== null) {
      setLoading(false)
    }
  }, [user, isLoading, router, setLoading])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  const handleEdit = (region: Region) => {
    setSelectedRegion(region)
    setIsEditOpen(true)
  }

  const handleDelete = (region: Region) => {
    deleteRegion(region._id)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {user && (
          <RegionTabs
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </div>
      <EditRegionDialog
        region={selectedRegion}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false)
          setSelectedRegion(null)
        }}
      />
    </DashboardLayout>
  )
}
