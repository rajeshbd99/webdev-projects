import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { HiHeart, HiOutlineHome, HiOutlineLocationMarker, HiShieldCheck, HiCurrencyDollar, HiOutlineTag, HiOutlineTrash, HiOutlineExclamationCircle } from "react-icons/hi";

const Wishlist = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Wishlist";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: wishlist, isLoading, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/wishlist/${user.uid}`, { withCredentials: true });
      return data;
    },
  });

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete(`https://real-estate-flax-psi.vercel.app/wishlist/${id}`, { withCredentials: true });
      if (data.deletedCount == 1) {
        refetch();
        return toast.success("Property removed from wishlist!");
      }
    } catch (error) {
      console.error("Error removing property:", error.message);
    }
  };

  const handleMakeOffer = (property) => {
    navigate("/make-offer", { state: property });
  };
  isLoading && <p>Loading...</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <HiHeart className="text-red-500" />
        Wishlist
      </h1>

      {/* Wishlist Items */}
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Image */}
              <img
                src={item.propertyImage}
                alt={item.propertyTitle}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <HiOutlineHome className="text-blue-500" />
                  {item.propertyTitle}
                </h2>

                {/* Location */}
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-red-500" />
                  {item.location}
                </p>

                {/* Agent Details */}
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={item.agentPhoto}
                    alt={item.agentName}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="text-sm text-gray-800">{item.agentName}</span>
                </div>

                {/* Verification and Price */}
                <div className="text-sm space-y-1 mt-3">
                  <p className="flex items-center gap-2">
                    <HiShieldCheck className="text-green-500" />
                    <strong>Verification Status:</strong>{" "}
                    <span className="text-green-600">{item.verificationStatus}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <HiCurrencyDollar className="text-yellow-500" />
                    <strong>Price Range:</strong> ${item.priceRange.split("-")[0]} - ${item.priceRange.split("-")[1]}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => handleMakeOffer(item)}
                  >
                    <HiOutlineTag />
                    Make an Offer
                  </button>
                  <button
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleRemove(item._id)}
                  >
                    <HiOutlineTrash />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <HiOutlineExclamationCircle className="text-4xl mx-auto text-gray-400 mb-4" />
          <p>No items in wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
