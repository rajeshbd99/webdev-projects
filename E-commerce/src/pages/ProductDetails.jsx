// src/pages/ProductDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import CartContext from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';
import { toast } from 'react-toastify';
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const { selectedProduct } = useProductContext();
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);

  // State to keep track of whether the product is in the wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Update the isWishlisted state based on the current wishlist contents
    setIsWishlisted(wishlist.some(item => item.id === selectedProduct.id));
  }, [wishlist, selectedProduct]);

  if (!selectedProduct || selectedProduct.id !== parseInt(id)) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.success('Item added to cart!');
  };

  const handleAddToWishlist = () => {
    if (!isWishlisted) {
      addToWishlist(selectedProduct);
      toast.success('Item added to wishlist!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-2">{selectedProduct.title}</h2>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <p className="text-2xl font-semibold text-purple-600 mb-4">{selectedProduct.price}</p>
          <p className="mb-2">Category: {selectedProduct.category}</p>
          <p className="mb-2">Availability: {selectedProduct.stock ? 'In Stock' : 'Out of Stock'}</p>
          <p className="mb-2">Rating: {selectedProduct.rating} ★</p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Specifications:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(selectedProduct.specification).map(([key, value], index) => (
              <li key={index}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</li>
            ))}
          </ul>

          <div className='flex flex-col md:flex-row gap-2'>
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaCartShopping className='h-5 w-5 mr-2'/>
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              disabled={isWishlisted}
              className={`ml-4 mt-6 px-4 py-2 rounded-lg flex items-center ${
                isWishlisted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-purple-600'
              }`}
            >
              <FaRegHeart className='h-5 w-5 mr-2'/>
              {isWishlisted ? 'In Wishlist' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
