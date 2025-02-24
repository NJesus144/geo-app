'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CreateRegionForm, Mode } from './CreateRegionForm'
import { Region } from '@/types'

interface EditRegionDialogProps {
  region: Region | null
  isOpen: boolean
  onClose: () => void
}

export function EditRegionDialog({
  region,
  isOpen,
  onClose,
}: EditRegionDialogProps) {
  if (!region) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl" style={{ zIndex: 100 }}>
        <DialogHeader>
          <DialogTitle>{`Editar Região: ${region.name}`}</DialogTitle>
        </DialogHeader>
        <CreateRegionForm
          initialData={region}
          onSuccess={onClose}
          mode={Mode.EDIT}
        />
      </DialogContent>
    </Dialog>
  )
}
