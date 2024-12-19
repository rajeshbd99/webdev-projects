import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AuthProvider from './providers/AuthProvider'
import PrivateRoute from './routes/PrivateRoute'
import ServiceDetailsPage from './pages/Service/ServiceDetailsPage'
import ServiceDetails from './pages/Service/ServiceDetails'
import { About } from './pages/About/About'
import ForgetPassword from './pages/forget-password/ForgetPassword'
import UserProfile from './pages/UserProfile/UserProfile'
import Dashboard from './pages/dashboard/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forgot-password',
        element: <ForgetPassword />
      },
      {
        path: '/about',
        element: <About/>
      },

      {
        path: '/services',
        element: <ServiceDetails/>
      },
      {
        path: '/services/:id',
        element: (<PrivateRoute>
          <ServiceDetailsPage/>
        </PrivateRoute>)
      },
      {
        path: '/dashboard',
        element: (<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>)
      }
      ,
      {
        path: '/user-profile',
        element: (<PrivateRoute>
          <UserProfile/>
        </PrivateRoute>)
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
