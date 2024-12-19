import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import img1 from '../../assets/pngtree-character-default-avatar-image_2237203.jpg';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (user) {
      try {
        await logoutUser();
        toast.success("Logged out successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000); 
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  const links = <>
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? 'btn btn-primary' : 'btn btn-ghost'
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/about"
      className={({ isActive }) =>
        isActive ? 'btn btn-primary' : 'btn btn-ghost'
      }
    >
      About
    </NavLink>
    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        isActive ? 'btn btn-primary' : 'btn btn-ghost'
      }
    >
     Dashboard
    </NavLink>

    <NavLink
      to="/Services"
      className={({ isActive }) =>
        isActive ? 'btn btn-primary' : 'btn btn-ghost'
      }
    >
      Services
    </NavLink>

  </>

  

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start items-center">
        <div className="dropdown z-20">
          <div tabIndex={0} role="button" className="mr-3 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl md:text-2xl font-bold">Career Hub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        
        <NavLink
          to={`${user ? "/user-profile" : "/register"}`}
          className={({ isActive }) =>
            isActive ? 'btn btn-secondary' : 'btn btn-ghost'
          }
        >
          {user ? user.displayName || user.email : 'Register'}
        </NavLink>
        <NavLink
          to={user ? "/" : "/login"}
          onClick={user ? handleLogin : null}
          className={({ isActive }) =>
            isActive ? 'btn btn-secondary' : 'btn btn-ghost'
          }
        >
          {user ? 'Logout' : 'Login'}
        </NavLink>
        <div>
          <img className='hidden sm:block sm:h-14 sm:w-14 rounded-[50%] object-cover' 
           src={user && user.photoURL ? user.photoURL : img1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
