import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaDollarSign, FaEnvelope, FaMapMarkerAlt, FaTimesCircle, FaUser } from "react-icons/fa";

const RequestedProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Requested Properties";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);

  const { data: RequestedProperties, isLoading, refetch } = useQuery({
    queryKey: ["RequestedProperties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/offers/agent/${user.email}`, { withCredentials: true });
      return data;
    },
  });

  // Handle accept offer
  const handleAccept = async (offerId, propertyId) => {
    try {
      const { data } = await axios.patch(`https://real-estate-flax-psi.vercel.app/offers/accept/${offerId}`, { propertyId }, { withCredentials: true });
      if (data.modifiedCount == 1) {
        refetch();
        return toast.success("Offer accepted successfully");
      }
    } catch (error) {
      toast.error("Failed to accept the offer");
    }
  };

  // Handle reject offer
  const handleReject = async (offerId) => {
    try {
      const { data } = await axios.patch(`https://real-estate-flax-psi.vercel.app/offers/reject/${offerId}`, { withCredentials: true });
      if (data.modifiedCount === 1) {
        refetch();
        return toast.success("Offer rejected successfully");
      }
    } catch (error) {
      toast.error("Failed to reject the offer");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Requested/Offered Properties</h2>
      {RequestedProperties?.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg flex flex-col justify-center">
          <table className="min-w-full bg-white text-gray-900 rounded-lg border-collapse">
            <thead className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold">Property Title</th>
                <th className="py-3 px-4 text-sm font-semibold">
                  <FaMapMarkerAlt className="inline-block mr-2" /> Location
                </th>
                <th className="py-3 px-4 text-sm font-semibold">
                  <FaUser className="inline-block mr-2" /> Buyer Name
                </th>
                <th className="py-3 px-4 text-sm font-semibold">
                  <FaEnvelope className="inline-block mr-2" /> Buyer Email
                </th>
                <th className="py-3 px-4 text-sm font-semibold">
                  <FaDollarSign className="inline-block mr-2" /> Offered Price
                </th>
                <th className="py-3 px-4 text-sm font-semibold">Status</th>
                <th className="py-3 px-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {RequestedProperties?.map((offer, index) => (
                <tr
                  key={index}
                  className={`transition duration-300 ease-in-out hover:bg-indigo-50 hover:shadow-md ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="py-4 px-4 text-sm font-medium">{offer.propertyTitle}</td>
                  <td className="py-4 px-4 text-sm">{offer.location}</td>
                  <td className="py-4 px-4 text-sm">{offer.buyerName}</td>
                  <td className="py-4 px-4 text-sm">{offer.buyerEmail}</td>
                  <td className="py-4 px-4 text-sm font-medium text-indigo-600">${offer.offerAmount}</td>
                  <td className="py-4 px-4 text-sm capitalize">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${offer.offerStatus === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : offer.offerStatus === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {offer.offerStatus || "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    {offer.offerStatus === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center gap-2 transition duration-200"
                          onClick={() => handleAccept(offer._id, offer.propertyId)}
                        >
                          <FaCheckCircle /> Accept
                        </button>
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center gap-2 transition duration-200"
                          onClick={() => handleReject(offer._id)}
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No offers to display.</p>
      )}
    </div>
  );
};

export default RequestedProperties;
