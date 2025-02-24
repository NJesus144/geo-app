import { DeleteConfirmationDialog } from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Region } from '@/types'
import { Edit2, Trash2 } from 'lucide-react'

interface RegionsTableProps {
  regions: Region[]
  userId?: string
  onEdit?: (region: Region) => void
  onDelete?: (region: Region) => void
}

export function RegionsTable({
  regions,
  userId,
  onEdit,
  onDelete,
}: RegionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Proprietário</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {regions.map((region) => (
          <TableRow key={region._id}>
            <TableCell>{region.name}</TableCell>
            <TableCell>
              {new Date(region.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{region.user.name}</TableCell>
            {region.user._id === userId && (
              <TableCell className="flex gap-2">
                <Button
                  className="bg-sky-500 hover:bg-sky-600"
                  onClick={() => {
                    if (onEdit) onEdit(region)
                  }}
                >
                  <Edit2 className="h-2 w-2" />
                </Button>
                <DeleteConfirmationDialog
                  title="Excluir Região"
                  description={`Tem certeza de que deseja excluir a região ${region.name}? Esta ação não pode ser desfeita.`}
                  confirmText="Sim, excluir"
                  cancelText="Cancelar"
                  trigger={
                    <Button className="bg-red-500 hover:bg-red-600">
                      <Trash2 className="h-2 w-2" />
                    </Button>
                  }
                  isDeleting={false}
                  onConfirm={() => {
                    if (onDelete) onDelete(region)
                  }}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
