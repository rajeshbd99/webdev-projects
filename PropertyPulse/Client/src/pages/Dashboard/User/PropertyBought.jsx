import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineClipboardList, HiOutlineHome, HiOutlineLocationMarker, HiOutlineUser, HiOutlineCurrencyDollar, HiOutlineStatusOnline, HiOutlineCheckCircle, HiOutlineCreditCard, HiOutlineReceiptRefund, HiOutlineExclamationCircle } from "react-icons/hi";

const PropertyBought = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Properties Bought";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/offers/user/${user.email} `, { withCredentials: true });
      return data;
    },
  });

  const handlePay = (property) => {
    navigate("/payment", { state: { property } });
  };
  isLoading && <p>Loading...</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <HiOutlineClipboardList className="text-blue-500" />
        Properties You Offered
      </h2>

      {/* Properties Grid */}
      {properties?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-lg rounded-xl p-5 transition-transform transform hover:scale-105"
            >
              {/* Property Image */}
              <img
                src={property.image || "/default-property.jpg"}
                alt="Property"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* Property Details */}
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <HiOutlineHome className="text-blue-500" />
                  {property.propertyTitle}
                </h4>
                <p className="text-gray-500 flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-red-500" />
                  {property.location}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <HiOutlineUser className="text-purple-500" />
                  Agent: {property.agentName}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <HiOutlineCurrencyDollar className="text-green-500" />
                  Offered Amount: ${property.offerAmount}
                </p>
              </div>

              {/* Offer Status */}
              <p
                className={`text-lg font-bold mt-4 flex items-center gap-2 ${property.offerStatus === "Pending"
                    ? "text-yellow-500"
                    : property.offerStatus === "accepted"
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
              >
                <HiOutlineStatusOnline />
                Status: {property.offerStatus}
              </p>

              {/* Pay Button */}
              {property.offerStatus === "accepted" && (
                <button
                  onClick={() => handlePay(property)}
                  className={`mt-4 w-full flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg ${property.buyingStatus === "bought"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  disabled={property.buyingStatus === "bought"}
                >
                  {property.buyingStatus === "bought" ? (
                    <>
                      <HiOutlineCheckCircle />
                      Bought
                    </>
                  ) : (
                    <>
                      <HiOutlineCreditCard />
                      Pay
                    </>
                  )}
                </button>
              )}

              {/* Transaction ID */}
              {property.transactionId && (
                <p className="text-green-500 font-medium mt-4 flex items-center gap-2">
                  <HiOutlineReceiptRefund />
                  Transaction ID: {property.transactionId}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <HiOutlineExclamationCircle className="text-4xl mx-auto text-gray-400 mb-4" />
          <p>No properties to display.</p>
        </div>
      )}
    </div>

  );
};

export default PropertyBought;
