import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  country: z.string().min(1, 'País é obrigatório'),
  zipCode: z.string().min(1, 'CEP é obrigatório'),
})

const baseSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = baseSchema
  .and(
    z.union([
      z.object({
        address: addressSchema,
        coordinates: z.undefined(),
      }),
      z.object({
        coordinates: z.array(z.number()).length(2, 'Coordenadas devem ter latitude e longitude'),
        address: z.undefined(),
      }),
    ])
  )

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
