import { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation } from "react-router-dom";

const MyProfile = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | My Profile";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">My Profile</h1>

      {user ? (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* Profile Picture */}
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-indigo-500 shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* User Information */}
          <div className="text-center lg:text-left space-y-3">
            <p className="text-xl font-medium text-gray-700">
              <strong className="text-indigo-600">Name:</strong> {user.displayName || "N/A"}
            </p>
            <p className="text-xl text-gray-700">
              <strong className="text-indigo-600">Email:</strong> {user.email || "N/A"}
            </p>
            {user.role && (
              <p className="text-xl text-blue-600">
                <strong>Role:</strong> {user.role}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No user information available.</p>
      )}
    </div>

  );
};

export default MyProfile;
