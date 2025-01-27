import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-black btn hover:text-red-600 font-semibold px-4 py-2 transition-colors duration-300 ease-in-out"
            : "text-yellow-400 font-semibold hover:text-primary-100 px-4 py-2 transition-colors duration-300 ease-in-out"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-properties"
        className={({ isActive }) =>
          isActive
            ? "text-black btn hover:text-red-600 font-semibold px-4 py-2 transition-colors duration-300 ease-in-out"
            : "text-yellow-400 font-semibold hover:text-primary-100 px-4 py-2 transition-colors duration-300 ease-in-out"
        }
      >
        All Properties
      </NavLink>
      {user && (
        <button
          onClick={() => navigate("/dashboard")}
          className="text-black btn hover:text-red-600 font-semibold hover:text-primary-100 bg-transparent px-4 py-2 transition-all duration-300 rounded-md"
        >
          Dashboard
        </button>
      )}
    </>
  );

  return (
    <div className="navbar bg-transparent backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-lg py-4 px-6">
      {/* Navbar */}
      <div className="navbar-start flex items-center">
        <NavLink to="/" className="flex items-center text-black font-semibold text-lg space-x-2">
          <img
            src={logo}
            alt="PropertyPulse Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="hidden lg:block">PropertyPulse</span>
        </NavLink>
      </div>

      {/* Links for desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-6">{links}</ul>
      </div>

      {/* User Info and Logout for Desktop */}
      <div className="navbar-end hidden lg:flex items-center gap-6">
        {user ? (
          <>
            <div className="flex items-center space-x-3">
              {user?.photoURL ? (
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-black font-medium">
                {user.displayName || "User"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-primary-600 hover:bg-primary-700 text-red-600 font-bold rounded-md px-2 py-2 transition-all duration-300"
            >
              <IoLogOut className="text-3xl" />
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "btn btn-primary" : "btn btn-ghost"
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "btn btn-secondary" : "btn btn-ghost"
              }
            >
              Login
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="navbar-end lg:hidden">
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center">
              {user?.photoURL ? (
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-yellow-400 font-medium ml-2">
                {user.displayName || "User"}
              </span>
            </div>
          )}

          {/* Menu Button */}
          <div className="dropdown dropdown-left">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle text-white"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${isDrawerOpen ? "block" : "hidden"
                }`}
            >
              {links}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary w-full"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" className="btn btn-primary w-full">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="btn btn-secondary w-full">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
