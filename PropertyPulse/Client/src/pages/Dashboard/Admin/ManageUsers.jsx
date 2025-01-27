import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation } from "react-router-dom";
import { FaUserShield, FaUserTie, FaBan, FaTrash, FaExclamationCircle } from "react-icons/fa";


const ManageUsers = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Manage Users";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/users`, { withCredentials: true });
      return data;
    },
  })

  // Make Admin
  const handleMakeAdmin = async (userId) => {
    try {
      const { data } = await axios.put(`https://real-estate-flax-psi.vercel.app/users/make-admin/${userId}`, { withCredentials: true });
      if (data.modifiedCount == 1 || data.upsertedCount == 1) {
        refetch();
        return toast.success("User promoted to Admin");
      }
    } catch (error) {
      toast.error("Failed to promote user to Admin");
    }
  };

  // Make Agent
  const handleMakeAgent = async (userId) => {
    try {
      const { data } = await axios.put(`https://real-estate-flax-psi.vercel.app/users/make-agent/${userId}`, { withCredentials: true });
      if (data.modifiedCount == 1 || data.upsertedCount == 1) {
        refetch();
        return toast.success("User promoted to Agent");
      }

    } catch (error) {
      toast.error("Failed to promote user to Agent");
    }
  };

  // Mark as Fraud
  const handleMarkAsFraud = async (userId, email) => {
    try {
      const { data } = await axios.put(`https://real-estate-flax-psi.vercel.app/users/mark-fraud/${userId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        const { data: deleteProperties } = await axios.delete(`https://real-estate-flax-psi.vercel.app/properties/agent/${email}`, { withCredentials: true });
        if (deleteProperties.deletedCount > 0) {
          toast.success("Agent marked as Fraud");
          refetch();
        }
      }
    } catch (error) {
      toast.error("Failed to mark agent as Fraud");
    }
  };

  // Delete User
  const handleDeleteUser = async (uid) => {
    try {
      const { data } = await axios.delete(`https://real-estate-flax-psi.vercel.app/users/${uid}`, { withCredentials: true });
      if (data.deletedCount == 1) {
        refetch();
        return toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Update User Role Locally
  const updateUserRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };
  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Manage Users</h2>

      {users?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr className="text-left">
                <th className="py-3 px-4 text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Email</th>
                <th className="py-3 px-4 text-sm font-semibold">Role</th>
                <th className="py-3 px-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all duration-300`}
                >
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`${user.role === 'admin'
                          ? 'text-blue-600'
                          : user.role === 'agent'
                            ? 'text-green-600'
                            : user.role === 'fraud'
                              ? 'text-red-600'
                              : 'text-gray-600'
                        } font-semibold`}
                    >
                      {user.role || 'User'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.role !== 'admin' && (
                      <div className="flex gap-3">
                        {user.role !== 'agent' && user.role !== 'fraud' && (
                          <button
                            className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                            onClick={() => handleMakeAdmin(user._id)}
                          >
                            <FaUserShield /> Make Admin
                          </button>
                        )}
                        {user.role !== 'agent' && user.role !== 'fraud' && (
                          <button
                            className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
                            onClick={() => handleMakeAgent(user._id)}
                          >
                            <FaUserTie /> Make Agent
                          </button>
                        )}
                        {user.role === 'agent' && !user.fraud && (
                          <div className="flex gap-2">
                            <button
                              className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                              onClick={() => handleMakeAdmin(user._id)}
                            >
                              <FaUserShield /> Make Admin
                            </button>
                            <button
                              className="bg-orange-500 text-white py-1 px-3 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center gap-2"
                              onClick={() => handleMarkAsFraud(user._id, user.email)}
                            >
                              <FaBan /> Mark as Fraud
                            </button>
                          </div>
                        )}
                        {user.role === 'agent' && user.fraud && (
                          <button
                            className="bg-neutral-600 text-white py-1 px-3 rounded-full cursor-not-allowed flex items-center gap-2"
                            disabled
                          >
                            <FaExclamationCircle /> Fraud
                          </button>
                        )}
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                          onClick={() => handleDeleteUser(user.uid)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                    {user.role === 'fraud' && (
                      <span className="text-red-600 font-bold">Fraud</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No users to manage.</p>
      )}
    </div>
  );
};

export default ManageUsers;
