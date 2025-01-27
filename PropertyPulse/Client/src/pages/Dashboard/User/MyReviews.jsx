import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { HiOutlineChatBubbleBottomCenterText, HiOutlineTrash } from "react-icons/hi2";

const MyReviews = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | My Reviews";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  const { data: myreviews, isLoading, refetch } = useQuery({
    queryKey: ["myreviews"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/reviews/user/${user.email}`, { withCredentials: true });
      return data;
    },
  })

  const handleDelete = async (reviewId) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      const { data } = await axios.delete(`https://real-estate-flax-psi.vercel.app/reviews/${reviewId}`, { withCredentials: true });
      if (data.deletedCount == 1) {
        refetch();
        return toast.success("Review deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete the review");
    }
  };
  isLoading && <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center flex items-center gap-2 justify-center mb-6">
        <HiOutlineChatBubbleBottomCenterText className="text-blue-500" />
        My Reviews
      </h2>
      {myreviews?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myreviews?.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col gap-4"
            >
              {/* Property Title */}
              <h4 className="text-lg font-semibold text-blue-600">
                {review.propertyTitle}
              </h4>

              {/* Reviewer Info */}
              <div className="text-gray-500 flex flex-col gap-1 items-center justify-center">
                <p className="text-sm">
                  <strong>Reviewer:</strong> {review.reviewerName}
                </p>
                <p className="text-sm">
                  <strong>Reviewed on:</strong> {review.formattedDate}
                </p>
                {/* Review Content */}
                <p className="text-gray-700 text-base font-bold">{review.review}</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(review._id)}
                className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all"
              >
                <HiOutlineTrash className="text-lg" />
                Delete Review
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6 text-center text-lg">
          You haven't reviewed any properties yet.
        </p>
      )}
    </div>
  );
};

export default MyReviews;
