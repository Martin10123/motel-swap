import type { ReactNode } from 'react'
import { Building2, Bot, Calendar, Camera, MessageCircle } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      {/* Left side - Info Section */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-[#0a1d3a] text-white p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/logo.webp" 
              alt="Morel Swap Logo" 
              className="w-48 h-auto object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Morel Swap</h1>
            <p className="text-lg text-[rgb(212,197,185)]">
              Experiencia inolvidable en cada detalle
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[rgb(212,197,185)] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#0a1d3a]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Reservas Inteligentes</h3>
                <p className="text-sm text-gray-300">
                  Sistema de reservas automatizado disponible 24/7
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[rgb(212,197,185)] flex items-center justify-center">
                <Camera className="w-6 h-6 text-[#0a1d3a]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Recorridos 360°</h3>
                <p className="text-sm text-gray-300">
                  Explora nuestras habitaciones antes de reservar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[rgb(212,197,185)] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#0a1d3a]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Contacto Directo</h3>
                <p className="text-sm text-gray-300">
                  Reserva por WhatsApp o Telegram de forma instantánea
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[rgb(212,197,185)] flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#0a1d3a]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Asistente Virtual</h3>
                <p className="text-sm text-gray-300">
                  Respuestas automáticas y gestión inteligente
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[rgb(212,197,185)] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#0a1d3a]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Habitaciones Premium</h3>
                <p className="text-sm text-gray-300">
                  Espacios diseñados para tu máximo confort
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img 
              src="/logo.webp" 
              alt="Morel Swap Logo" 
              className="w-32 h-auto object-contain"
            />
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
