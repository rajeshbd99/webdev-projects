import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import AllFoods from './pages/AllFoods';
import SingleFoodPage from './components/SingleFoodPage';
import FoodPurchasePage from './pages/FoodPurchasePage';
import GalleryPage from './pages/GalleryPage';
import MyFoodsPage from './pages/MyFoodsPage';
import AddFoodPage from './pages/AddFoodPage';
import MyOrders from './pages/MyOrdersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/foods',
        element: <AllFoods />,
      },
      {
        path: '/foods/:id', 
        element: <SingleFoodPage />,
      },
      {
        path: '/purchase/:id', 
        element: (
          <PrivateRoute>
            <FoodPurchasePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/gallery',
        element: <GalleryPage />,
      },
      {
        path: '/my-foods',
        element: (
          <PrivateRoute>
            <MyFoodsPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-food',
        element: (
          <PrivateRoute>
            <AddFoodPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
