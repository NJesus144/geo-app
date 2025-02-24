import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RegisterInput, registerSchema } from '@/lib/validations/auth'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface UserFormProps {
  onSubmit: (data: RegisterInput) => void
  initialData?: IUser
  submitLabel?: string
  isSubmitting?: boolean
}

enum locatyonType {
  address = 'address',
  coordinates = 'coordinates',
}

export function UserForm({
  onSubmit,
  initialData,
  submitLabel = 'Salvar',
  isSubmitting = false,
}: UserFormProps) {
  const initialLocationType = initialData?.address
    ? locatyonType.address
    : locatyonType.coordinates
  const [locationType, setLocationType] = useState<
    locatyonType.address | locatyonType.coordinates
  >(initialLocationType)

  const getInitialValues = () => {
    const baseValues = {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
    }

    if (initialLocationType === locatyonType.address) {
      return {
        ...baseValues,
        address: {
          street: initialData?.address?.street || '',
          number: initialData?.address?.number || '',
          city: initialData?.address?.city || '',
          state: initialData?.address?.state || '',
          country: initialData?.address?.country || '',
          zipCode: initialData?.address?.zipCode || '',
        },
        coordinates: undefined,
      }
    } else {
      return {
        ...baseValues,
        coordinates: initialData?.coordinates || [0, 0],
        address: undefined,
      }
    }
  }
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: getInitialValues(),
  })

  const handleLocationTypeChange = (
    value: locatyonType.address | locatyonType.coordinates,
  ) => {
    setLocationType(value)
    if (value === locatyonType.address) {
      form.setValue(locatyonType.coordinates, undefined)
      form.setValue(locatyonType.address, {
        street: '',
        number: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      })
    } else {
      form.setValue(locatyonType.address, undefined)
      form.setValue(locatyonType.coordinates, [0, 0])
    }
  }

  const onFormSubmit = form.handleSubmit(
    async (data) => {
      try {
        const submitData = {
          ...data,
        }

        onSubmit(submitData)
      } catch (error) {
        console.error('Error in form submission:', error)
      }
    },
    (errors) => {
      console.log('Validation errors:', errors)
    },
  )

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onFormSubmit(e)
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Tipo de Localização</FormLabel>
          <Select value={locationType} onValueChange={handleLocationTypeChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo de localização" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="address">Endereço</SelectItem>
              <SelectItem value="coordinates" className="z-50">
                Coordenadas
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>

        {locationType === 'address' && (
          <>
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="São Paulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="SP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="Brasil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="12345-678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {locationType === 'coordinates' && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="coordinates.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="-48.502372"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="-1.455020"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </form>
    </Form>
  )
}
