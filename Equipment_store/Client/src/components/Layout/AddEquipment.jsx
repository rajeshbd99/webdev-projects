import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AddEquipment = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    image: '',
    itemName: '',
    categoryName: '',
    description: '',
    price: '',
    rating: '',
    customization: '',
    processingTime: '',
    stockStatus: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const response = await fetch('https://sports-server-ecru.vercel.app/equipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Equipment added successfully!', {
          position: 'top-center',
          autoClose: 3000, // Show for 3 seconds
        });
        setTimeout(() => navigate('/my-equipment'), 3000); // Redirect after toast
      } else {
        toast.error('Failed to add equipment. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding equipment:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-gradient">
        Add New Equipment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200"
        style={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}
      >
        {/* Image URL */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
        </div>
        {/* Item Name */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Item Name
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
        </div>
        {/* Category Name */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
            rows="4"
          />
        </div>
        {/* Price and Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            />
          </div>
        </div>
        {/* Customization and Processing Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Customization
            </label>
            <input
              type="text"
              name="customization"
              value={formData.customization}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Processing Time (days)
            </label>
            <input
              type="number"
              name="processingTime"
              value={formData.processingTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            />
          </div>
        </div>
        {/* Stock Status */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Stock Status
          </label>
          <input
            type="number"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
        </div>
        {/* User Email */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            User Email
          </label>
          <input
            type="email"
            value={user.email}
            className="w-full p-3 border rounded-lg text-red-700 bg-gray-200 cursor-not-allowed shadow-sm"
            readOnly
          />
        </div>
        {/* User Name */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            User Name
          </label>
          <input
            type="text"
            value={user.displayName}
            className="w-full p-3 border rounded-lg text-red-700 bg-gray-200 cursor-not-allowed shadow-sm"
            readOnly
          />
        </div>
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Add Equipment
          </button>
        </div>
      </form>
      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default AddEquipment;
