import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';
import Modal from '../components/Modal';
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const location=useLocation();
  useEffect(()=>{
    document.title="King Gadgets | Dashboard"
  },[location])
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const [activeTab, setActiveTab] = useState('cart');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sort, setSort] = useState(false); // Tracks whether sorting is enabled
  const [originalCartOrder, setOriginalCartOrder] = useState([]);
  const navigate = useNavigate();

  // Save the original cart order initially
  useEffect(() => {
    setOriginalCartOrder(cart);
  }, [cart]);

  // Calculate total price for the cart items
  const totalPrice = cart.reduce((total, item) => {
    const price = typeof item.price === 'string' ? item.price : String(item.price);
    return total + parseFloat(price.replace('$', ''));
  }, 0);

  // Sort cart items by price in descending order
  const sortedCart = [...cart].sort((a, b) => {
    const priceA = parseFloat((typeof a.price === 'string' ? a.price : String(a.price)).replace('$', ''));
    const priceB = parseFloat((typeof b.price === 'string' ? b.price : String(b.price)).replace('$', ''));
    return priceB - priceA; // Always descending
  });

  // Toggle between original order and descending order
  const handleSortByPrice = () => {
    setSort(!sort); // Toggle the sort state
  };

  const handlePurchase = () => {
    setTotalAmount(totalPrice);
    setIsModalOpen(true);
    clearCart();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="container mx-auto text-white">
      <div className="container mx-auto">
        <div className='bg-purple-600 p-5'>
          <h2 className="text-3xl font-bold text-center mb-4">Dashboard</h2>
          <p className="text-center mb-8 text-lg">Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!</p>
          
          {/* Tabs for Cart and Wishlist */}
          <div className="flex justify-center space-x-4 mb-8">
            <button onClick={() => setActiveTab('cart')} className={`btn ${activeTab === 'cart' ? 'btn-active' : ''}`}>
              Cart
            </button>
            <button onClick={() => setActiveTab('wishlist')} className={`btn ${activeTab === 'wishlist' ? 'btn-active' : ''}`}>
              Wishlist
            </button>
          </div>
        </div>

        {/* Content for the Cart tab */}
        {activeTab === 'cart' && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-black">
            <div className="text-right font-semibold text-xl mb-6">
              Total cost: ${totalPrice.toFixed(2)}
            </div>

            {/* Sort and Purchase Buttons */}
            <div className="flex justify-between items-center mb-4">
              <button onClick={handleSortByPrice} className="btn btn-outline btn-sm">
                {sort ? 'Original Order' : 'Sort by Price (Descending)'}
              </button>
              <button
                onClick={handlePurchase}
                className="btn btn-primary btn-sm"
                disabled={cart.length === 0 || totalPrice === 0}
              >
                Purchase
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              { 
                // Display sortedCart if sort is enabled; otherwise, display original order
                sort ? sortedCart.map(item => (
                  <div key={item.cartItemId} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>
                    <button
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition duration-200"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )) : originalCartOrder.map(item => (
                  <div key={item.cartItemId} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>
                    <button
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition duration-200"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Content for the Wishlist tab */}
        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-black">
            {/* Wishlist Items */}
            <div className="space-y-4">
              {wishlist.map(item => (
                <div key={item.id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                  <button
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full transition duration-200"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Purchase Confirmation */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} totalAmount={totalAmount}>
        <h2 className="text-2xl font-bold">Congratulations!</h2>
        <p>Your purchase was successful.</p>
      </Modal>
    </div>
  );
};

export default Dashboard;
