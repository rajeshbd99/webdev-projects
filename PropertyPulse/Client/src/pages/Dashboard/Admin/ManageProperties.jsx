import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";


const ManageProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Manage Properties";
    document.title = pageTitle;
  }, [location]);

  // Fetch all properties added by agents
  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/all-properties`, { withCredentials: true });
      return data;
    },
  })

  // Handle Verify Property
  const handleVerify = async (propertyId) => {
    try {
      const { data } = await axios.patch(`https://real-estate-flax-psi.vercel.app/properties/verify/${propertyId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        refetch();
        toast.success("Property verified successfully");
      }
    } catch (error) {
      toast.error("Failed to verify the property");
    }
  };

  // Handle Reject Property
  const handleReject = async (propertyId) => {
    try {
      const { data } = await axios.patch(`https://real-estate-flax-psi.vercel.app/properties/reject/${propertyId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        refetch();
        toast.success("Property rejected successfully");
      }
    } catch (error) {
      toast.error("Failed to reject the property");
    }
  };

  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Manage Properties</h2>

      {properties?.length > 0 ? (
        <div className="overflow-x-auto overflow-hidden">
          <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr className="text-left">
                <th className="py-3 px-4 text-sm font-semibold">Property Title</th>
                <th className="py-3 px-4 text-sm font-semibold">Location</th>
                <th className="py-3 px-4 text-sm font-semibold">Agent Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Agent Email</th>
                <th className="py-3 px-4 text-sm font-semibold">Price Range</th>
                <th className="py-3 px-4 text-sm font-semibold">Status</th>
                <th className="py-3 px-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {properties.map((property, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all duration-300`}
                >
                  <td className="py-3 px-4">{property.propertyTitle}</td>
                  <td className="py-3 px-4">{property.location}</td>
                  <td className="py-3 px-4">{property.agentName}</td>
                  <td className="py-3 px-4">{property.agentEmail}</td>
                  <td className="py-3 px-4 text-green-600">${property.priceRange}</td>
                  <td className="py-3 px-4 capitalize">
                    {property.verificationStatus === 'verified' ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <FaCheckCircle /> {property.verificationStatus}
                      </span>
                    ) : property.verificationStatus === 'rejected' ? (
                      <span className="flex items-center gap-2 text-red-600">
                        <FaTimesCircle /> {property.verificationStatus}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-yellow-600">
                        <FaHourglassHalf /> {property.verificationStatus}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    {property.verificationStatus === 'pending' && (
                      <>
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
                          onClick={() => handleVerify(property._id)}
                        >
                          Verify
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                          onClick={() => handleReject(property._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No properties to manage.</p>
      )}
    </div>

  );
};

export default ManageProperties;
