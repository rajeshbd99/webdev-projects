import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { FaDollarSign, FaEnvelope, FaHome, FaImage, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const AddProperty = () => {
    const location = useLocation();
    useEffect(() => {
        const pageTitle = "PropertyPulse | Add Property";
        document.title = pageTitle;
    }, [location]);

    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const [propertyData, setPropertyData] = useState({
        propertyTitle: "",
        location: "",
        image: null,
        priceRange: "",
        verificationStatus: "pending",
        agentName: user.displayName,
        agentEmail: user.email,
        agentPhoto: user.photoURL,
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setPropertyData({ ...propertyData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("image", propertyData.image);
        setLoading(true);

        try {
            const imageData = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (imageData.data.success) {
                propertyData.image = imageData.data.data.display_url;
                const { data } = await axios.post("https://real-estate-flax-psi.vercel.app/properties/add", propertyData, { withCredentials: true });
                if (data.insertedId) {
                    setLoading(false);
                    toast.success("Property added successfully!");
                    setPropertyData({
                        propertyTitle: "",
                        location: "",
                        image: null,
                        priceRange: "",
                        description: "",
                    });
                }
            }
        } catch (error) {
            toast.error("Failed to add property. Please try again.", error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
                <FaHome className="text-indigo-600" />
                Add Property
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaHome className="text-gray-500" />
                        Property Title
                    </label>
                    <input
                        type="text"
                        name="propertyTitle"
                        value={propertyData.propertyTitle}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-500" />
                        Property Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={propertyData.location}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaImage className="text-gray-500" />
                        Property Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageUpload}
                        required
                        className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-200 file:text-indigo-700 hover:file:bg-indigo-300"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaUser className="text-gray-500" />
                        Agent Name
                    </label>
                    <input
                        name="agentName"
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="mt-2 w-full bg-gray-100 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" />
                        Agent Email
                    </label>
                    <input
                        name="agentEmail"
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-2 w-full bg-gray-100 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaHome className="text-gray-500" />
                        Property Description
                    </label>
                    <textarea
                        name="description"
                        value={propertyData.description}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaDollarSign className="text-gray-500" />
                        Price Range
                    </label>
                    <input
                        type="text"
                        name="priceRange"
                        value={propertyData.priceRange}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200"
                >
                    {loading ? "Loading..." : "Add Property"}
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
