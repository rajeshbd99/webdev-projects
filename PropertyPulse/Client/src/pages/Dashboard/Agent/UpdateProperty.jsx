import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaImage, FaMapMarkerAlt, FaMoneyBillWave, FaTag } from "react-icons/fa";

const UpdateProperty = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Update Property";
    document.title = pageTitle;
  }, [location]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    propertyTitle: "",
    location: "",
    image: "",
    priceRange: "",
    agentName: "",
    agentEmail: "",
  });

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://real-estate-flax-psi.vercel.app/property/${id}`, { withCredentials: true });
        setProperty(response.data);
      } catch (error) {
        toast.error("Failed to load property details");
      }
    };
    fetchProperty();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    setProperty({ ...property, image: e.target.files[0] });
  };

  // Update property
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", property.image);
    setLoading(true);

    try {
      const imageData = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (imageData.data.success) {
        property.image = imageData.data.data.display_url;
        const { data } = await axios.patch(`https://real-estate-flax-psi.vercel.app/properties/update/${id}`, property, { withCredentials: true });
        if (data.modifiedCount == 1) {
          setLoading(false);
          toast.success("Property Updated successfully!");
          setProperty({
            propertyTitle: "",
            location: "",
            image: null,
            priceRange: "",
          });
        }
      }
    } catch (error) {
      toast.error("Failed to update property. Please try again.", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200 mt-16 mb-16">
      <h2 className="text-3xl font-extrabold text-indigo-600 mb-6 flex items-center gap-2">
        <FaEdit /> Update Property
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <FaTag className="text-indigo-500" /> Property Title
            </span>
          </label>
          <input
            type="text"
            name="propertyTitle"
            value={property.propertyTitle}
            onChange={handleChange}
            placeholder="Enter property title"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-500" /> Location
            </span>
          </label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            placeholder="Enter property location"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <FaMoneyBillWave className="text-indigo-500" /> Price Range
            </span>
          </label>
          <input
            type="text"
            name="priceRange"
            value={property.priceRange}
            onChange={handleChange}
            placeholder="Enter price range"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <FaImage className="text-indigo-500" /> Image
            </span>
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 file:bg-indigo-100 file:text-indigo-600 file:font-medium file:rounded-md file:px-4 file:py-2 hover:file:bg-indigo-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          {loading ? "Loading..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
