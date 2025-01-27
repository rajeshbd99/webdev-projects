import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { compareAsc, format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import { HiHome, HiOutlineLocationMarker, HiOutlineUser, HiUserCircle, HiOutlineMail, HiOutlineCalendar, HiCurrencyDollar, HiOutlineCheckCircle, HiOutlineDocumentText } from "react-icons/hi";

const MakeOffer = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Make Offer";
    document.title = pageTitle;
  }, [location]);

  const { state: property } = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [offerAmount, setOfferAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOffer = async () => {
    setError("");
    setSuccess("");
    if (
      parseInt(offerAmount) < property.priceRange.split("-")[0] ||
      parseInt(offerAmount) > property.priceRange.split("-")[1]
    ) {
      setError(`Offer must be between $${property.priceRange.split("-")[0]} and $${property.priceRange.split("-")[1]}.`);
      return;
    }

    const offerDetails = {
      userId: property.userId,
      propertyId: property._id,
      propertyTitle: property.propertyTitle,
      location: property.location,
      image: property.propertyImage,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      agentPhoto: property.agentPhoto,
      offerAmount: parseFloat(offerAmount),
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: format(new Date(), "dd-MM-yyyy"),
      role: user.role,
      priceRange: property.priceRange,
      verificationStatus: property.verificationStatus,
      offerStatus: "Pending",
    };

    try {
      const { data } = await axios.post(`https://real-estate-flax-psi.vercel.app/make-offer/${property._id}`, offerDetails, { withCredentials: true });
      if (data.insertedId) {
        navigate("/dashboard/property-bought");
        return toast.success("Offer made successfully!");

      }
    } catch (error) {
      console.error("Error making offer:", error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-50 shadow-lg rounded-xl p-8 max-w-xl mx-auto space-y-6 mt-32 mb-24">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
        <HiOutlineDocumentText className="text-blue-500" />
        Make an Offer
      </h1>

      {/* Property Details */}
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-700">
          <HiHome className="inline text-blue-500 mr-2" />
          <strong>Property Title:</strong> {property?.propertyTitle}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <HiOutlineLocationMarker className="inline text-red-500 mr-2" />
          <strong>Property Location:</strong> {property?.location}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <HiOutlineUser className="inline text-green-500 mr-2" />
          <strong>Agent Name:</strong> {property?.agentName}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <HiUserCircle className="inline text-blue-500 mr-2" />
          <strong>Buyer Name:</strong> {user?.displayName}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <HiOutlineMail className="inline text-yellow-500 mr-2" />
          <strong>Buyer Email:</strong> {user?.email}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <HiOutlineCalendar className="inline text-purple-500 mr-2" />
          <strong>Buying Date:</strong> {format(new Date(), "dd-MM-yyyy")}
        </p>
      </div>

      {/* Offer Amount */}
      <div className="mt-6 space-y-2">
        <label className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <HiCurrencyDollar className="text-green-500" />
          Offer Amount:
        </label>
        <input
          type="number"
          className="w-full p-3 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={offerAmount}
          onChange={(e) => setOfferAmount(e.target.value)}
        />
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        {success && <p className="text-green-500 mt-1 text-sm">{success}</p>}
      </div>

      {/* Submit Button */}
      <button
        className={`w-full py-3 mt-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 ${offerAmount ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
          } transition`}
        onClick={handleOffer}
        disabled={!offerAmount}
      >
        <HiOutlineCheckCircle />
        Submit Offer
      </button>
    </div>

  );
};

export default MakeOffer;
