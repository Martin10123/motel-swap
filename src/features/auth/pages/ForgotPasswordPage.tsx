import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de recuperación de contraseña
    console.log('Forgot password:', email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <AuthLayout>
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[rgb(212,197,185)] flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#0a1d3a]" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              Correo enviado
            </CardTitle>
            <CardDescription className="text-center">
              Hemos enviado las instrucciones para restablecer tu contraseña a:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center font-medium text-[rgb(var(--foreground))]">
              {email}
            </p>
            <p className="text-sm text-center text-[rgb(var(--muted-foreground))]">
              Por favor, revisa tu bandeja de entrada y sigue las instrucciones. 
              Si no ves el correo, revisa tu carpeta de spam.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Link to="/login" className="w-full">
              <Button className="w-full" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio de sesión
              </Button>
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm text-[rgb(var(--primary))] hover:underline"
            >
              ¿No recibiste el correo? Intentar de nuevo
            </button>
          </CardFooter>
        </Card>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Recuperar contraseña
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full cursor-pointer" size="lg">
              Enviar instrucciones
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[rgb(var(--border))]" />
            </div>
          </div>
          <p className="text-center text-sm text-[rgb(var(--primary))]">
            Ya tienes una cuenta? <Link to="/login" className="w-full hover:underline">Iniciar sesión aquí</Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
