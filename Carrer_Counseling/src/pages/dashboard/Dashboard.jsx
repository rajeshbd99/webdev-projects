import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You must log in to access the Dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">User Information</h3>
        <p><strong>Name:</strong> {user.displayName || "No Name Provided"}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
