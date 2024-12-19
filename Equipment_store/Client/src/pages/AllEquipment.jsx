// src/pages/AllEquipment.jsx
import React, { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner'; 

const AllEquipment = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ProSports Hub | All Equipment";
    document.title = pageTitle;
  }, [location]);
  const [originalEquipment, setOriginalEquipment] = useState([]); 
  const [equipment, setEquipment] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    
    fetch('https://sports-server-ecru.vercel.app/equipments')
      .then((response) => response.json())
      .then((data) => {
        setOriginalEquipment(data);
        setEquipment(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching equipment:', error);
        setLoading(false); 
      });
  }, []);

  // Handle sorting
  const handleSort = () => {
    const sortedData = [...equipment].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price; 
      }
      return b.price - a.price;
    });

    setEquipment(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
  };

  // Reset to original order
  const resetOrder = () => {
    setEquipment(originalEquipment); 
    setSortOrder(null); 
  };

  if (loading) {
    return <Spinner />; 
  }

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text">
        All Sports Equipment
      </h2>
      
      {/* Sort and Reset Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={handleSort}
          className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-teal-500 hover:to-indigo-600 transition duration-300"
        >
          Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        {sortOrder !== null && (
          <button
            onClick={resetOrder}
            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300"
          >
            Reset to Original Order
          </button>
        )}
      </div>
      
      {/* Equipment Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="table-auto w-full text-left">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipment.length > 0 ? (
              equipment.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100 transition duration-300">
                  <td className="p-4">
                    <img src={product.image} className="w-20 h-20 object-cover rounded-lg" alt={product.itemName} />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{product.itemName}</td>
                  <td className="p-4 text-gray-600">{product.categoryName}</td>
                  <td className="p-4 text-green-500 font-semibold">${product.price}</td>
                  <td className="p-4 text-yellow-500">{product.rating}</td>
                  <td className="p-4">
                    <span
                      className={`p-2 rounded-full ${
                        product.stockStatus > 0 ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
                      }`}
                    >
                      {product.stockStatus > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/equipments/${product._id}`}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-300"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-600">No equipment found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEquipment;
