import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      rootElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        toast.success('User logged out, navigating to home');
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
  };

  const closeMenus = () => {
    setIsUserMenuOpen(false);
    setIsMainMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 py-3 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-r from-blue-800 via-purple-900 to-black text-white'
          : 'bg-white shadow-md text-gray-800'
      } ${isScrolled ? 'backdrop-blur-lg bg-opacity-70' : ''}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-red-600"
          onClick={() => navigate('/')}
        >
          🍴 DineFusion
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-lg font-semibold underline'
                : 'text-lg text-gray-500 hover:text-black dark:hover:text-red-500 transition'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/foods"
            className={({ isActive }) =>
              isActive
                ? 'text-lg font-semibold underline'
                : 'text-lg text-gray-500 hover:text-black dark:hover:text-red-500 transition'
            }
          >
            All Foods
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive
                ? 'text-lg font-semibold underline'
                : 'text-lg text-gray-500 hover:text-black dark:hover:text-red-500 transition'
            }
          >
            Gallery
          </NavLink>
        </nav>

        {/* Theme Toggle & User Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="text-xl text-gray-700 dark:text-yellow-400 hover:text-black dark:hover:text-yellow-500 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {user ? (
            <>
              {/* User Avatar */}
              <div className="relative">
                <div
                  tabIndex={0}
                  className="cursor-pointer text-3xl"
                  onClick={toggleUserMenu}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photoURL || 'https://via.placeholder.com/60'}
                    alt="Profile"
                  />
                </div>

                {/* User Dropdown Menu */}
                <ul
                  className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg ${
                    isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'
                  } ${isUserMenuOpen ? 'block' : 'hidden'}`}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <li className="hover:bg-gray-200 px-4 py-2">
                    <NavLink to="/my-foods">My Foods</NavLink>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-2">
                    <NavLink to="/add-food">Add Food</NavLink>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-2">
                    <NavLink to="/my-orders">My Orders</NavLink>
                  </li>
                </ul>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:block px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden md:block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="hidden md:block px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
              >
                Register
              </NavLink>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMainMenu}
            className="md:hidden text-gray-800 dark:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-8 6h8"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMainMenuOpen && (
        <nav
          className={`absolute top-full left-0 w-full bg-white dark:bg-black text-gray-800 dark:text-white shadow-md md:hidden`}
        >
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li className="hover:bg-gray-200 px-4 py-2">
              <NavLink to="/" onClick={closeMenus}>
                Home
              </NavLink>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <NavLink to="/foods" onClick={closeMenus}>
                All Foods
              </NavLink>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <NavLink to="/gallery" onClick={closeMenus}>
                Gallery
              </NavLink>
            </li>
            {user ? (
              <li className="hover:bg-gray-200 px-4 py-2">
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <NavLink to="/login" onClick={closeMenus}>
                    Login
                  </NavLink>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <NavLink to="/register" onClick={closeMenus}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
