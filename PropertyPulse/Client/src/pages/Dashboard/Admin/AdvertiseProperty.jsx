import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { FaBullhorn, FaCheckCircle } from "react-icons/fa";

const AdvertiseProperty = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Advertise Property";
    document.title = pageTitle;
  }, [location]);
  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/properties`, { withCredentials: true });
      return data;
    },
  })

  // Handle advertise property
  const handleAdvertise = async (propertyId) => {
    try {
      const { data } = await axios.put(`https://real-estate-flax-psi.vercel.app/properties/advertise/${propertyId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        refetch();
        return toast.success("Property advertised successfully!");
      }
    } catch (error) {
      toast.error("Failed to advertise property");
    }
  };
  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Advertise Properties</h2>

      {properties?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <th className="py-3 px-6 text-left">Property Image</th>
                <th className="py-3 px-6 text-left">Property Title</th>
                <th className="py-3 px-6 text-left">Price Range</th>
                <th className="py-3 px-6 text-left">Agent Name</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {properties?.map((property) => (
                <tr
                  key={property._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-6">
                    <img
                      src={property.image}
                      alt={property.propertyTitle}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-6 text-lg font-medium">{property.propertyTitle}</td>
                  <td className="py-3 px-6 text-xl text-green-600">${property.priceRange}</td>
                  <td className="py-3 px-6">{property.agentName}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleAdvertise(property._id)}
                      className={`text-white py-2 px-4 rounded-full transition duration-200 transform ${property.advertise === true
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      disabled={property.advertise === true}
                    >
                      {property.advertise === true ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaCheckCircle className="text-white" />
                          Advertised
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FaBullhorn className="text-white" />
                          Advertise
                        </span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No verified properties to advertise.</p>
      )}
    </div>

  );
};

export default AdvertiseProperty;
