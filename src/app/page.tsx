import { Map } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 opacity-5">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            <Map className="mr-2 h-4 w-4" />
            Planejamento Inteligente de Redes
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-secondary sm:text-6xl">
            Gerencie e otimize suas redes de fibra óptica com eficiência
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Facilitamos o planejamento, expansão e gerenciamento da sua
            infraestrutura de fibra óptica, garantindo maior precisão,
            velocidade e controle sobre seus projetos.
          </p>

          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Entre com sua conta
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
