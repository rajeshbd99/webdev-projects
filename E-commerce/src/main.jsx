// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProductDetails from './pages/ProductDetails';
import  AboutPage  from './pages/AboutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/statistics',
        element: <Statistics />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/about',
        element: <AboutPage/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  </StrictMode>
);