'use client'

import { UserForm } from '@/components/UserForm'
import { useCreateUserMutation } from '@/hooks/useCreateUser'
import Link from 'next/link'

export function RegisterForm() {
  const registerMutation = useCreateUserMutation()

  return (
    <div className="space-y-6">
      <UserForm
        onSubmit={registerMutation.mutate}
        isSubmitting={registerMutation.isPending}
      />

      <div className="text-center text-sm">
        Já tem uma conta?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Entrar
        </Link>
      </div>
    </div>
  )
}
