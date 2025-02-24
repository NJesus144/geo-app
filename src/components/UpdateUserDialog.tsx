import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UserForm } from './UserForm'
import { useUpdateUserMutation } from '@/hooks/useUpdateUserMutation'
import { useAuthStore } from '@/store/auth'

export function UpdateUserDialog() {
  const updateMutation = useUpdateUserMutation()
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Perfil</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col h-[90vh] max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações de perfil aqui.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <UserForm
            initialData={user}
            onSubmit={updateMutation.mutate}
            isSubmitting={updateMutation.isPending}
            submitLabel="Atualizar"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
