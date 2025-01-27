import { NavLink, Outlet, useLocation } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiHome, FiUser, FiSettings } from "react-icons/fi";
import ReactLoading from "react-loading";

const Dashboard = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Dashboard";
    document.title = pageTitle;
  }, [location]);

  const [role, isAdminLoading] = useUserRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isAdminLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ReactLoading type="cylon" color="#1E40AF" height={100} width={100} />
      </div>
    );

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const Sidebar = ({ title, links }) => (
    <motion.nav
      className="bg-gradient-to-b from-blue-50 to-blue-100 shadow w-64 p-4 h-full lg:static lg:translate-x-0 fixed top-0 left-0 z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={sidebarVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-8 lg:mb-0">
        <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setIsDrawerOpen(false)}
        >
          <FiX />
        </button>
      </div>
      <ul className="space-y-4">
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-200 hover:text-blue-900"
                }`
              }
              onClick={() => setIsDrawerOpen(false)}
            >
              {/* Add icons to sidebar links */}
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );

  const sidebarData = {
    user: {
      title: "User Dashboard",
      links: [
        { to: "/dashboard/profile", label: "My Profile", icon: <FiUser /> },
        { to: "/dashboard/wishlist", label: "Wishlist", icon: <FiHome /> },
        { to: "/dashboard/property-bought", label: "Property Bought", icon: <FiSettings /> },
        { to: "/dashboard/my-reviews", label: "My Reviews", icon: <FiUser /> },
      ],
    },
    admin: {
      title: "Admin Dashboard",
      links: [
        { to: "/dashboard/profile", label: "My Profile", icon: <FiUser /> },
        { to: "/dashboard/manage-reviews", label: "Manage Reviews", icon: <FiHome /> },
        { to: "/dashboard/manage-properties", label: "Manage Properties", icon: <FiSettings /> },
        { to: "/dashboard/manage-users", label: "Manage Users", icon: <FiUser /> },
        { to: "/dashboard/advertise-property", label: "Advertise Property", icon: <FiHome /> },
      ],
    },
    agent: {
      title: "Agent Dashboard",
      links: [
        { to: "/dashboard/profile", label: "My Profile", icon: <FiUser /> },
        { to: "/dashboard/add-property", label: "Add Property", icon: <FiHome /> },
        { to: "/dashboard/my-properties", label: "My Properties", icon: <FiSettings /> },
        { to: "/dashboard/my-sold-properties", label: "My Sold Properties", icon: <FiHome /> },
        { to: "/dashboard/requested-properties", label: "Requested Properties", icon: <FiSettings /> },
      ],
    },
  };

  return (
    <div className="min-h-screen flex bg-gray-50 mt-20">
      {/* Drawer toggle for smaller screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-blue-600 text-3xl bg-white shadow-lg p-2 rounded-full"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <FiMenu />
      </button>

      {/* Sidebar for all devices */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      {role && (
        <motion.div
          className={`lg:block ${isDrawerOpen ? "block" : "hidden"} h-full `}
        >
          <Sidebar
            title={sidebarData[role].title}
            links={sidebarData[role].links}
          />
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto bg-white shadow-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
