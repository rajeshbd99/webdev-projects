import { useContext } from "react";
import { useLocation, NavLink,Link } from "react-router-dom";
import CartContext from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);
    const location = useLocation();

    // Check if the current page is the homepage
    const isHomePage = location.pathname === '/';

    return (
        <div
            className={`container mx-auto text-center text-white navbar mt-4 rounded-t-2xl sticky top-0 z-50 ${isHomePage ? 'bg-purple-500' : 'bg-gray-800'
                }`}
        >
            <Link to="/" className="ml-4 navbar-start">
                <h2 className="text-xl font-bold">King Gadgets</h2>
            </Link>
            <div className="flex space-x-4 navbar-center">
                <NavLink to="/" className="btn btn-ghost">Home</NavLink>
                <NavLink to="/statistics" className="btn btn-ghost">Statistics</NavLink>
                <NavLink to="/dashboard" className="btn btn-ghost">Dashboard</NavLink>
                <NavLink to="/about" className="btn btn-ghost">About</NavLink>
            </div>
            <div className="navbar-end">
                {/* cart */}
                <Link to='/dashboard'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                        <MdOutlineShoppingCart size={26}/>
                            <span className="badge badge-sm indicator-item">{cart.length}</span>
                        </div>
                    </div>
                </div>
                </Link>

                {/* WishList */}
                <Link to='/dashboard'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                       <FaRegHeart size={26}/>
                            <span className="badge badge-sm indicator-item">{wishlist.length}</span>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
