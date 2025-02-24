import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
        <div className="text-center text-sm mt-4">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Criar Conta
          </Link>
        </div>
      </div>
    </div>
  )
}
