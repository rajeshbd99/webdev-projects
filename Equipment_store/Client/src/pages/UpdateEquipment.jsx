import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams,useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEquipment = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ProSports Hub | Update Equipment";
    document.title = pageTitle;
  }, [location]);
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const data = useLoaderData(); 

  const auth = getAuth(); 
  const currentUser = auth.currentUser; 

  
  const [equipmentData, setEquipmentData] = useState({
    userName: currentUser?.displayName || '', 
    userEmail: currentUser?.email || '',
    itemName: data?.itemName || '',
    price: data?.price || '',
    description: data?.description || '',
    category: data?.category || '',
    image: data?.image || '',
  });

  const [error, setError] = useState(''); 

  
  useEffect(() => {
    if (currentUser) {
      setEquipmentData((prevState) => ({
        ...prevState,
        userName: currentUser.displayName || 'N/A',
        userEmail: currentUser.email || 'N/A',
      }));
    }
  }, [currentUser]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`https://sports-server-ecru.vercel.app/equipments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentData),
      });
  
      if (response.ok) {
        
        toast.success('Equipment updated successfully!', {
          position: 'top-center',
          autoClose: 3000, 
        });
  
        
        setTimeout(() => {
          navigate('/my-equipment'); 
        }, 3000);
      } else {
        throw new Error('Failed to update equipment');
      }
    } catch (error) {
      console.error('Error updating equipment:', error);
  
      
      toast.error('Failed to update equipment. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        Update Equipment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-lg p-8"
      >
        
        <div className="mb-6">
          <label htmlFor="userName" className="block text-black font-semibold text-lg mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={equipmentData.userName}
            readOnly
            className="w-full px-4 py-3 text-red-700 bg-gray-300 border-2 border-gray-200 rounded-lg cursor-not-allowed"
          />
        </div>

        
        <div className="mb-6">
          <label htmlFor="userEmail" className="block text-black font-semibold text-lg mb-2">
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={equipmentData.userEmail}
            readOnly
            className="w-full px-4 py-3 text-red-700 bg-gray-300 border-2 border-gray-200 rounded-lg cursor-not-allowed"
          />
        </div>

        
        <div className="mb-6">
          <label htmlFor="itemName" className="block text-gray-700 font-semibold text-lg mb-2">
            Equipment Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={equipmentData.itemName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        
        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700 font-semibold text-lg mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={equipmentData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-300"
            required
          />
        </div>

        
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-semibold text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={equipmentData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-300"
            rows="4"
          />
        </div>

        
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 font-semibold text-lg mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={equipmentData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-yellow-300"
            required
          >
            <option value="">Select Category</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
            <option value="other">Other</option>
          </select>
        </div>

        
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-semibold text-lg mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={equipmentData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>

        
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 focus:ring-2 focus:ring-purple-300"
        >
          Update Equipment
        </button>
      </form>

      
      <ToastContainer />
    </div>
  );
};

export default UpdateEquipment;
