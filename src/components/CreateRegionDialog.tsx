import { CreateRegionForm, Mode } from '@/components/CreateRegionForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

export function CreateRegionDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Nova Região</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Criar uma nova região</DialogTitle>
        </DialogHeader>
        <CreateRegionForm
          userId={userId}
          onSuccess={() => setOpen(false)}
          mode={Mode.CREATE}
        />
      </DialogContent>
    </Dialog>
  )
}
