import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

const AddFoodPage = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "DineFusion | Add Foods";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    category: '',
    origin: '',
    description: '',
    quantity: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price.');
      return;
    }

    setLoading(true);
    const data = {
      ...formData,
      price,
      addedByEmail: user.email,
      addedByName: user.displayName,
      purchaseCount: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://restaurants-server-theta.vercel.app/add-foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Food item added successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/my-foods'), 3000);
      } else {
        toast.error('Failed to add food item. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-gradient">
        Add New Food Item
      </h2>

      {/* Show Spinner when loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          style={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}
        >
          {/* Image URL */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-slate-500 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
              required
            />
          </div>
          {/* Food Name */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-slate-500 mb-2">
              Food Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
              required
            />
          </div>
          {/* Category */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-slate-500 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
              required
            />
          </div>
          {/* Origin */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-slate-500 mb-2">
              Origin
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-slate-500 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
              rows="4"
              required
            />
          </div>
          {/* Quantity and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label className="block text-lg font-semibold text-slate-500 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-lg font-semibold text-slate-500 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-slate-500"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Add Food
            </button>
          </div>
        </form>
      )}
      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default AddFoodPage;
