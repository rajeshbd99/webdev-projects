
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    // Create a unique cartItemId for each item added to the cart
    const cartItem = { ...product, cartItemId: uuidv4() }; 
    setCart((prevCart) => [...prevCart, cartItem]);
  };

  const removeFromCart = (cartItemId) => {
    // Remove only the item with the specific cartItemId
    setCart((prevCart) => prevCart.filter(item => item.cartItemId !== cartItemId));
    toast.error('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;


