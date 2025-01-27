import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { FaDollarSign, FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const MySoldProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | My Sold Properties";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);

  const { data: propertiesSold, isLoading, refetch } = useQuery({
    queryKey: ["propertiesSold"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/sold-properties/agent/${user.email}`, { withCredentials: true });
      return data;
    },
  });

  const totalSoldAmount = () => {
    let total = 0;
    propertiesSold?.forEach((property) => {
      total += property.amount;
    });
    return total;
  };
  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">My Sold Properties</h2>

      {propertiesSold?.length > 0 ? (
        <>
          {/* Table for Sold Properties */}
          <div className="overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <thead>
                  <tr className="bg-indigo-600 text-white text-left">
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider">
                      Property Title
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider">
                      <FaMapMarkerAlt className="inline-block mr-2" /> Location
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider">
                      <FaUser className="inline-block mr-2" /> Buyer Name
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider">
                      <FaEnvelope className="inline-block mr-2" /> Buyer Email
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider">
                      <FaDollarSign className="inline-block mr-2" /> Sold Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propertiesSold?.map((property, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                    >
                      <td className="py-4 px-4 text-sm">{property.propertyTitle}</td>
                      <td className="py-4 px-4 text-sm">{property.location}</td>
                      <td className="py-4 px-4 text-sm">{property.buyerName}</td>
                      <td className="py-4 px-4 text-sm">{property.buyerEmail}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-green-600">
                        ${property.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Sold Amount Section */}
          <div className="mt-6 p-5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-lg shadow-lg flex items-center space-x-4 justify-center">
            <div className="flex items-center justify-center p-3 bg-white rounded-full text-green-600 shadow-lg">
              <FaDollarSign className="text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Total Sold Amount</h3>
              <p className="text-3xl font-extrabold mt-2">
                ${totalSoldAmount()}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-4">No sold properties to display.</p>
      )}
    </div>
  );
};

export default MySoldProperties;
