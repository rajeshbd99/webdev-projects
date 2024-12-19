import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useLocation } from "react-router-dom";
import img1 from "../../assets/pngtree-character-default-avatar-image_2237203.jpg"; 

const UserProfile = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "Career Hub | User Profile";
    document.title = pageTitle;
 },[location]);

  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-bold">You need to log in to access this page.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-6 text-center">
        <img
          src={user.photoURL || img1}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full object-cover mb-4 shadow-md"
        />
        <p className="text-lg font-semibold">{user.email}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-sm font-medium mb-1">
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter photo URL"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UserProfile;
