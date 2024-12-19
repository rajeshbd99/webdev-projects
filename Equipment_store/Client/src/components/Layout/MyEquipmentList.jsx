import React, { useContext, useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Modal from '../Modal';
import Spinner from '../Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyEquipmentList = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ProSports Hub | My Equipment List";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const [myEquipment, setMyEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyEquipment = async () => {
      try {
        const response = await fetch(`https://sports-server-ecru.vercel.app/equipments?userEmail=${user.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch equipment');
        }
        const data = await response.json();
        setMyEquipment(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEquipment();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    // Remove the deleted item immediately from the UI
    setMyEquipment((prev) => prev.filter((item) => item._id !== id));
    setShowModal(false);

    try {
      const response = await fetch(`https://sports-server-ecru.vercel.app/equipments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Equipment deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        throw new Error('Failed to delete equipment');
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('Failed to delete equipment. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-equipment/${id}`);
  };

  const handleAddEquipment = () => {
    navigate('/add-equipment');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        My Equipment List
      </h2>

      {myEquipment.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">You have no equipment added yet.</p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-transform duration-300"
            onClick={handleAddEquipment}
          >
            Add Equipment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myEquipment.map((equipment) => (
            <div
              key={equipment._id}
              className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={equipment.image}
                alt={equipment.itemName}
                className="w-full h-48 object-cover rounded-lg mb-4 border-4 border-white"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{equipment.itemName}</h3>
                <p className="text-sm text-gray-200 mb-1">
                  <strong>Category:</strong> {equipment.categoryName}
                </p>
                <p className="text-sm text-gray-200 mb-1">
                  <strong>Price:</strong> ${equipment.price}
                </p>
                <p className="text-sm text-gray-200">
                  <strong>Stock:</strong> {equipment.stockStatus}
                </p>
              </div>
              <div className="flex mt-6 space-x-3">
                <button
                  className="flex-grow px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold shadow-md transition-transform duration-300"
                  onClick={() => handleUpdate(equipment._id)}
                >
                  Update
                </button>
                <button
                  className="flex-grow px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white font-semibold shadow-md transition-transform duration-300"
                  onClick={() => {
                    setSelectedEquipment(equipment);
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          title="Confirm Delete"
          message={`Are you sure you want to delete "${selectedEquipment.itemName}"?`}
          onConfirm={() => handleDelete(selectedEquipment._id)}
          onCancel={() => setShowModal(false)}
          modalStyle={{
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            color: '#FF0000',
          }}
        />
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default MyEquipmentList;
