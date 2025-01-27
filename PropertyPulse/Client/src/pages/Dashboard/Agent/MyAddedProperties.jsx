import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt, FaMoneyBillAlt, FaTimesCircle, FaUser } from "react-icons/fa";

const MyAddedProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | My Added Properties";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ["userRole", user.email],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/my-properties/${user.email}`, { withCredentials: true });
      return data;
    },
    enabled: !!user,
  })

  // Delete property
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      const result = await axios.delete(`https://real-estate-flax-psi.vercel.app/properties/delete/${id}`, { withCredentials: true });
      if (result.data.deletedCount === 1) {
        refetch();
      }
      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  // Redirect to update page
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-property/${id}`);
  };
  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Added Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <div key={property._id} className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md rounded-lg p-4 flex flex-col">
            {/* Image Section */}
            <img
              src={property.image || "/default-property.jpg"}
              alt={property.propertyTitle}
              className="w-full h-60 object-cover rounded-lg"
            />
            {/* Content Section */}
            <div className="mt-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{property.propertyTitle}</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-indigo-500" /> {property.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaUser className="text-indigo-500" /> Agent: {property.agentName}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillAlt className="text-indigo-500" /> Price Range: {property.priceRange}
                </p>
              </div>
              <p
                className={`mt-4 text-lg font-semibold flex items-center gap-2 ${property.verificationStatus === "verified"
                    ? "text-green-600"
                    : property.verificationStatus === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
              >
                {property.verificationStatus === "verified" && <FaCheckCircle />}
                {property.verificationStatus === "rejected" && <FaTimesCircle />}
                {property.verificationStatus === "pending" && <FaExclamationCircle />}
                {property.verificationStatus}
              </p>
            </div>
            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {property.verificationStatus !== "rejected" && (
                <button
                  onClick={() => handleUpdate(property._id)}
                  className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
