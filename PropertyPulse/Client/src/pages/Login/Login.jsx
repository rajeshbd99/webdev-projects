import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { data, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const location = useLocation();
    useEffect(() => {
        const pageTitle = "PropertyPulse | Login";
        document.title = pageTitle;
    }, [location]);
    const navigate = useNavigate();
    const { user, loginUser, googleSignIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData.email, formData.password).then((result) => {
                if (result?.user) {
                    toast.success('User logged in successfully');
                    setFormData({ email: '', password: '' });
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    navigate(location?.state ? location.state : '/');
                }
            });

        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            googleSignIn().then(async (result) => {
                const { data } = await axios.put('https://real-estate-flax-psi.vercel.app/user', {
                    username: result?.user?.displayName,
                    email: result?.user?.email,
                    photoUrl: result?.user?.photoURL,
                    uid: result?.user?.uid,
                });
                if (data?.acknowledged) {
                    toast.success('User profile updated successfully');
                    navigate(location?.state ? location.state : '/');
                }
            });
        } catch (error) {
            console.error('Error logging in with Google:', error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="">
                    {user && (
                        <div className="p-4 text-center text-green-600 bg-green-100 rounded-md flex flex-col justify-center items-center gap-2">
                            <img src={user.photoURL} alt="Avatar" className="w-20 rounded-full border-2 border-red-500" />
                            <p className="">Logged in successfully! {user.displayName || user.email}</p>
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-700">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef}
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleGoogleSignIn()}
                        className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <FaGoogle />
                        <p className="">Login with Google</p>
                    </button>


                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;