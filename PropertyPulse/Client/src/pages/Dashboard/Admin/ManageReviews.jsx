import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { FaTrashAlt, FaStar } from "react-icons/fa";

const ManageReviews = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Manage Reviews";
    document.title = pageTitle;
  }, [location]);
  const [reviews, setReviews] = useState([]);

  const { data: reviewManage, isLoading, refetch } = useQuery({
    queryKey: ["reviewManage"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/reviews`, { withCredentials: true });
      return data;
    },
  })

  // Handle delete review
  const handleDeleteReview = async (reviewId, email) => {
    try {
      const { data } = await axios.delete(`https://real-estate-flax-psi.vercel.app/admin/reviews/${reviewId}`, { data: { email: email } }, { withCredentials: true });
      if (data?.deletedCount == 1) {
        toast.success("Review deleted successfully");
        refetch();
      }

    } catch (error) {
      toast.error("Failed to delete review");
    }
  };
  isLoading && <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Manage Reviews</h2>

      {reviewManage?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {reviewManage?.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-5 relative overflow-hidden border-t-4 border-blue-500"
            >
              <div className="flex items-center gap-5 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500">
                  <img
                    src={review.reviewerPhoto}
                    alt={review.reviewerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{review.reviewerName}</h4>
                  <p className="text-sm text-gray-600">{review.email}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{review.review}</p>
              <br />
              <br />
              <button
                onClick={() => handleDeleteReview(review._id, review.email)}
                className="absolute bottom-5 right-5 bg-red-600 text-white py-2 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-red-700 transition-all duration-300"
              >
                <FaTrashAlt />
                <span>Delete</span>
              </button>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold text-gray-800">{review.rating}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No reviews to display.</p>
      )}
    </div>
  );
};

export default ManageReviews;
