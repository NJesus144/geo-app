import { z } from 'zod'

const baseRegionSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  polygon: z.object({
    type: z.literal('Polygon'),
    coordinates: z
      .array(z.array(z.array(z.number())))
      .min(1, 'Desenhe um polígono no mapa'),
  }),
})

export const createRegionSchema = baseRegionSchema.extend({
  user: z.string(),
})

export const updateRegionSchema = baseRegionSchema.extend({
  user: z.string().optional(),
})

export type CreateRegionInput = z.infer<typeof createRegionSchema>
export type UpdateRegionInput = z.infer<typeof updateRegionSchema>
