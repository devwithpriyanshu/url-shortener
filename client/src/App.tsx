import { Suspense, lazy } from 'react';
import Login from './Authentication/Login.tsx';
import PrivateRoutes from './PrivateRoutes.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './dashboard/dashboard.tsx';
import Home from './Home/Home.tsx';
import Register from './Authentication/Register.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import PageLoader from '../utils/PageLoader.tsx';

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
    element: (
      <AuthProvider>
        <PrivateRoutes />
      </AuthProvider>
    ),
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
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
