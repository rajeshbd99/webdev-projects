// src/pages/EquipmentDetails.jsx
import { useContext } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; 

const EquipmentDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const product = useLoaderData();

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6">

      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text">
        {product.itemName}
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        
        <div className="w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.itemName}
            className="w-full h-80 object-cover rounded-xl shadow-lg border-4 border-purple-500"
          />
        </div>

        
        <div className="w-full md:w-2/3">
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
            <h3 className="text-3xl font-semibold mb-6 text-purple-600">
              Product Details
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong className="font-bold text-purple-500">Category:</strong>{' '}
                {product.categoryName}
              </p>
              <p>
                <strong className="font-bold text-purple-500">Description:</strong>{' '}
                {product.description}
              </p>
              <p>
                <strong className="font-bold text-purple-500">Price:</strong>{' '}
                <span className="text-green-500 font-semibold">
                  ${product.price}
                </span>
              </p>
              <p>
                <strong className="font-bold text-purple-500">Rating:</strong>{' '}
                <span className="text-yellow-500 font-semibold">
                  {product.rating} stars
                </span>
              </p>
              <p>
                <strong className="font-bold text-purple-500">Stock Status:</strong>{' '}
                {product.stockStatus > 0 ? (
                  <span className="text-green-500 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-500 font-semibold">Out of Stock</span>
                )}
              </p>
              <p>
                <strong className="font-bold text-purple-500">Customization:</strong>{' '}
                {product.customization}
              </p>
              <p>
                <strong className="font-bold text-purple-500">Processing Time:</strong>{' '}
                {product.processingTime} days
              </p>
              <p>
                <strong className="font-bold text-purple-500">User Email:</strong>{' '}
                <span className="text-blue-500">{user.email}</span>
              </p>
              <p>
                <strong className="font-bold text-purple-500">User Name:</strong>{' '}
                <span className="text-blue-500">{user.name}</span>
              </p>
            </div>

            
            <div className="mt-8 text-center">
              <button
                className="px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
                onClick={() => navigate('/all-equipment')}
              >
                Back to All Equipment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
