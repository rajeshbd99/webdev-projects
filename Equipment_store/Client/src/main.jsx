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
import MyEquipmentList from './components/Layout/MyEquipmentList'
import EquipmentDetails from './pages/EquipmentDetails'
import AddEquipment from './components/Layout/AddEquipment'
import AllEquipment from './pages/AllEquipment'
import AddEquipmentPage from './pages/AddEquipmentPage'
import UpdateEquipment from './pages/UpdateEquipment'



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
        path: '/all-equipment',
        element: <AllEquipment />
      },
      {
        path: '/equipments/:id',
        element: <PrivateRoute>
          <EquipmentDetails />
        </PrivateRoute>,
        loader:({params})=>fetch(`https://sports-server-ecru.vercel.app/equipments/${params.id}`)
      },
      {
        path: '/my-equipment',
        element:
          <PrivateRoute>
            <MyEquipmentList />
          </PrivateRoute>
      },
      {
        path: '/add-equipment',
        element: <PrivateRoute>
          <AddEquipment />
        </PrivateRoute>
      },
      {
        path: '/update-equipment/:id',
        element: <PrivateRoute>
          <UpdateEquipment />
        </PrivateRoute>,
        loader:({params})=>fetch(`https://sports-server-ecru.vercel.app/equipments/${params.id}`)
      },
      {
        path: '/orders',
        element: <PrivateRoute>
        </PrivateRoute>
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
