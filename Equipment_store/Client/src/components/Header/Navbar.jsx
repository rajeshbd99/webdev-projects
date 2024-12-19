import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; 
import { FaUserCircle, FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const [showLogout, setShowLogout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Website Name/Logo */}
        <Link to="/" className="text-white text-2xl font-semibold hover:text-gray-300">
          ProSports Hub
        </Link>

        {/* Hamburger Menu Icon (visible on small/medium devices) */}
        <button
          className="text-white sm:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links (Desktop View) */}
        <ul
          className={`sm:flex space-x-6 items-center ${
            isMenuOpen ? 'flex flex-col space-y-4 mt-4' : 'hidden'
          } sm:space-y-0 sm:mt-0`}
        >
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/all-equipment" className="text-white hover:text-gray-300">All Sports Equipment</Link>
          </li>

          {/* Conditional Rendering based on Authentication */}
          {user ? (
            <>
              <li>
                <Link to="/add-equipment" className="text-white hover:text-gray-300">Add Equipment</Link>
              </li>
              <li>
                <Link to="/my-equipment" className="text-white hover:text-gray-300">My Equipment List</Link>
              </li>

              {/* User Profile */}
              <li className="flex items-center space-x-2 cursor-pointer" onClick={toggleLogout}>
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-white">{user.displayName || 'User'}</span>
              </li>

              {/* Logout Button (shown below the username when clicked) */}
              {showLogout && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md transition duration-300 transform hover:scale-105"
                    aria-label="Logout"
                  >
                    <FaSignOutAlt />
                    <span>Log Out</span>
                  </button>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
              </li>
            </>
          )}

          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="text-white hover:text-gray-300 flex items-center space-x-2"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
