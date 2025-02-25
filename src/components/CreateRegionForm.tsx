'use client'

import MapComponentWrapper from '@/components/map/MapComponentWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import {
  CreateRegionInput,
  createRegionSchema,
  UpdateRegionInput,
  updateRegionSchema,
} from '@/lib/validations/region'
import { regionService } from '@/services/regionService'
import { Region } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export enum Mode {
  CREATE = 'create',
  EDIT = 'edit',
}

interface CreateRegionFormProps {
  initialData?: Region
  onSuccess?: () => void
  mode?: Mode.CREATE | Mode.EDIT
  userId?: string
}

const defaultValues: CreateRegionInput = {
  name: '',
  polygon: {
    type: 'Polygon',
    coordinates: [],
  },
  user: '',
}

export function CreateRegionForm({
  initialData,
  onSuccess,
  mode,
  userId,
}: CreateRegionFormProps) {
  const queryClient = useQueryClient()
  const form = useForm<CreateRegionInput | UpdateRegionInput>({
    resolver: zodResolver(
      mode === Mode.EDIT ? updateRegionSchema : createRegionSchema,
    ),
    defaultValues:
      mode === Mode.EDIT && initialData
        ? {
            name: initialData.name,
            polygon: initialData.polygon,
          }
        : {
            ...defaultValues,
            user: userId,
          },
  })

  const mutation = useMutation({
    mutationFn: (data: CreateRegionInput) => {
      if (mode === Mode.EDIT && initialData) {
        return regionService.updateRegion(initialData._id, data)
      }
      return regionService.createRegion(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'] })
      toast({
        title: `Região ${
          mode === Mode.EDIT ? 'atualizada' : 'criada'
        } com sucesso!`,
      })
      form.reset()
      onSuccess?.()
    },
  })

  const onSubmit = (data: CreateRegionInput | UpdateRegionInput) => {
    const submitData = {
      ...data,
      user: mode === Mode.CREATE ? userId! : undefined,
    } as CreateRegionInput
    mutation.mutate(submitData)
  }

  const handlePolygonCreated = (coordinates: number[][][]) => {
    form.setValue('polygon.coordinates', coordinates)
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Nome da Região" {...form.register('name')} />
        {form.formState.errors.name && (
          <span className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>

      <MapComponentWrapper onPolygonCreated={handlePolygonCreated} />

      {form.formState.errors.polygon && (
        <span className="text-sm text-destructive">Desenhar um polígono</span>
      )}

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending
          ? mode === Mode.EDIT
            ? 'Atualizando...'
            : 'Criando...'
          : mode === Mode.EDIT
          ? 'Atualizar Região'
          : 'Criar Região'}
      </Button>
    </form>
  )
}
