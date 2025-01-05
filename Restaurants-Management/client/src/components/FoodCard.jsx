import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const navigate =useNavigate();
  const { name, image, price, quantity, _id, addedBy } = food;

  const user = JSON.parse(localStorage.getItem('user'));

  const isOutOfStock = quantity === 0;
  const isOwnFood = user && user.id === addedBy;

  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = Math.min(Math.max(1, event.target.value), quantity);
    setPurchaseQuantity(newQuantity);
  };

  const handlePurchase = () => {
    if (isOutOfStock || isOwnFood || purchaseQuantity > quantity) return;
      navigate(`/purchase/${_id}`);
  
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 mb-10">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-fill"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 truncate">{name}</h2>
        <p className="text-gray-500 mt-2">
          <span className="font-semibold">Price:</span> ${typeof price === 'number' ? price.toFixed(2) : 'N/A'}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Available:</span> {quantity}
        </p>

        {/* Purchase Controls */}
        <div className="mt-4 flex items-center space-x-4">
          <input
            type="number"
            min="1"
            max={quantity}
            value={purchaseQuantity}
            onChange={handleQuantityChange}
            disabled={isOutOfStock || isOwnFood}
            className="w-20 h-10 border border-gray-300 rounded-md px-3 text-center text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock || isOwnFood || purchaseQuantity > quantity}
            className={`h-10 px-5 text-sm font-medium rounded-lg ${
              isOutOfStock || isOwnFood || purchaseQuantity > quantity
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
            }`}
          >
            {quantity<1 ? 'Out of Stock'  : 'Purchase'}
          </button>
        </div>

        {/* Actions Section */}
        <div className="mt-4">
          <NavLink
            to={`/foods/${_id}`}
            className="block text-indigo-600 text-center font-medium hover:underline"
          >
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
