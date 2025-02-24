'use client'

import { DashboardLayout } from '@/components/dashboard/dashboardLayout'
import { EditRegionDialog } from '@/components/EditRegionDialog'
import { RegionTabs } from '@/components/RegionTabs'
import { useDeleteRegion } from '@/hooks/useDeleteRegion'
import { useAuthStore } from '@/store/auth'
import { Region } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const { mutate: deleteRegion, isPending: isDeleting } = useDeleteRegion()
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  if (!user) {
    return router.push('/login')
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
        <RegionTabs
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
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
