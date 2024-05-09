import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../context/AuthContext.tsx'

const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must have at least 6 characters '),
})
type FormFields = z.infer<typeof LoginFormSchema>
const backendUrl: string = import.meta.env.VITE_BACKEND_URL

const Login: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthenticationContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginFormSchema),
  })

  const formSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      if (response.status == 409) {
        setError('email', {
          message: 'Email does not exist',
        })
      }
      if (response.ok) {
        setIsLoggedIn(true)
        navigate('/dashboard')
      }
    } catch (error: any) {
      setError('root', {
        message: error || 'An error occurred while submitting the form.',
      })
    }
  }

  return (
    <>
      <div className="h-dvh grid place-items-center">
        <Card className="mx-auto min-w-96">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Login to your account
            </CardTitle>
            <CardDescription>
              Don't have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate('/register')}
                className="hover:no-underline text-blue-500"
              >
                Sign up
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 ">
              <Button variant="secondary" className="w-full">
                Google
              </Button>
              <p className="items-center">Or with email and password</p>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input {...register('email')} />
                    {errors.email?.message && (
                      <p className="text-red-500 text-xs">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" {...register('password')} />
                    {errors.password?.message && (
                      <p className="text-red-500 text-xs">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Login
