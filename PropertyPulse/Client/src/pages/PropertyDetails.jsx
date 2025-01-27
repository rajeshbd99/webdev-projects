import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { BsHouseDoorFill } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';

const PropertyDetails = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Property Details";
    document.title = pageTitle;
  }, [location]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast.warning('Please log in to access this page.');
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/property/${id}`, { withCredentials: true });
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error.message);
      }
    };
    fetchProperty();
  }, [id]);

  const { data: reviewsCollection, isLoading, refetch } = useQuery({
    queryKey: ["reviewsCollection", id],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/property/reviews/${id}`, { withCredentials: true });
      return data;
    },
  })

  const handleAddToWishlist = async () => {
    try {
      await axios.post('https://real-estate-flax-psi.vercel.app/wishlist', {
        propertyId: property._id,
        userId: user?.uid,
        propertyTitle: property.propertyTitle,
        priceRange: property.priceRange,
        verificationStatus: property.verificationStatus,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        agentPhoto: property.agentPhoto,
        location: property.location,
        propertyImage: property.image,
        description: property.description,

      }, { withCredentials: true });
      toast.success('Property added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error.message);
      toast.error('Failed to add property to wishlist.');
    }
  };

  const handleAddReview = async () => {
    if (!newReview) return;
    try {
      const { data } = await axios.post(`https://real-estate-flax-psi.vercel.app/property/review`, {
        review: newReview,
        propertyId: property._id,
        email: user.email,
        formattedDate: format(new Date(), 'dd-MM-yyyy'),
        reviewerName: user.displayName,
        reviewerPhoto: user.photoURL,
      }, { withCredentials: true });
      if (data.insertedId) {
        refetch();
        setIsModalOpen(false);
        return toast.success('Review added successfully');
      }
    } catch (error) {
      setIsModalOpen(false);
      console.error('Error adding review:', error.message);
      return toast.error('Failed to add review.');
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-20">
      {/* Property Details */}
      <div className="bg-gradient-to-br from-white via-gray-100 to-gray-50 p-8 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={property.image}
            alt={property.propertyTitle}
            className="w-full h-72 object-center rounded-lg shadow-lg"
          />
          <span className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-lg shadow-md text-sm font-semibold">
            For Sale
          </span>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center gap-4 mb-2">
              {/* Property Title */}
              <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2 mb-2">
                <BsHouseDoorFill className="text-blue-500 text-xl" />
                {property.propertyTitle}
              </h1>
              <p className="text-green-600 text-lg font-semibold flex items-center gap-2">
                Price Range: ${property.priceRange}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-2">
              {property.description}
            </p>

            {/* Agent Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end gap-4">
                <div>
                  <p className="text-gray-800 font-bold text-lg">
                    {property.agentName}
                  </p>
                </div>
                <img
                  src={property.agentPhoto}
                  alt={property.agentName}
                  className="w-14 h-14 border-2 border-blue-600 rounded-full shadow"
                />

              </div>
            </div>
          </div>

          {/* Add to Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            className="w-full py-3 mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <AiOutlineHeart />
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section mt-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 rounded-xl shadow-lg">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            Reviews
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 transition duration-300"
          >
            Add a Review
          </button>
        </div>

        {/* Reviews List */}
        {reviewsCollection?.length > 0 ? (
          <ul className="space-y-6">
            {reviewsCollection.map((review, index) => (
              <li
                key={index}
                className="p-5 bg-white rounded-lg shadow-md border-l-4 border-indigo-500"
              >
                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">
                      {review.reviewerName}
                    </p>
                    <p className="text-sm text-gray-500">{review.formattedDate}</p>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 text-base leading-relaxed">
                  {review.review}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center text-lg">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add a Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition duration-300"
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>

            {/* Review Textarea */}
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition duration-300 mb-6"
            ></textarea>

            {/* Modal Footer */}
            <div className="flex justify-end gap-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
