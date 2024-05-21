import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthContext.tsx';

const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must have at least 6 characters '),
});
type FormFields = z.infer<typeof LoginFormSchema>;
const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

const Login: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginFormSchema),
  });

  const formSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (response.status == 409) {
        setError('email', {
          message: 'Email does not exist',
        });
      }
      if (response.ok) {
        setIsLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError('root', {
        message: error || 'An error occurred while submitting the form.',
      });
    }
  };

  return (
    <>
      {/* <div className="h-dvh grid place-items-center">
        <Card className="mx-auto min-w-96">
          <CardContent>
            <div className="flex flex-col space-y-4 ">
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
      </div> */}

      <div className="w-full lg:grid h-dvh lg:grid-cols-2">
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
