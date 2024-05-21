import { Suspense, lazy } from 'react';
import Login from './Authentication/Login.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard.tsx';
import Home from './pages/Home/Home.tsx';
import Register from './Authentication/Register.tsx';
import PageLoader from './ui/PageLoader.tsx';
import RedirectHandler from './pages/RedirectHandler.tsx';

// import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/theme-provider.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';
import ErrorBoundary from './lib/ErrorBoundary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',

    children: [
      {
        path: '/dashboard/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/:shortid',
    element: <RedirectHandler />,
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <KindeProvider
        clientId="fd6e3ebc08504f2da5e98b8cda8b0a7a"
        domain="https://kort.kinde.com"
        redirectUri="http://localhost:5173"
        logoutUri="http://localhost:5173"
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </KindeProvider>
    </ThemeProvider>
  );
}
