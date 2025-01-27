import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import auth from '../../firebase/firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
    const location = useLocation();
    useEffect(() => {
        const pageTitle = "PropertyPulse | Register";
        document.title = pageTitle;
    }, [location]);
    const navigate = useNavigate();

    const { createUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: '',
        photoUrl: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);
        setErrorMessage('');
        setVerificationMessage('');

        // Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        // Validate password
        if (!passwordRegex.test(formData.password)) {
            setErrorMessage(
                'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return;
        }

        // Create user using Auth Provider
        createUser(formData.email, formData.password)
            .then(userCredential => {
                const user = userCredential.user;
                setSuccess(true);
                setFormData({
                    username: '',
                    photoUrl: '',
                    email: '',
                    password: '',
                }); // Reset form data
                e.target.reset();
                // send email verification address
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        setVerificationMessage("Verification email sent");
                    });
                // update user profile
                updateProfile(auth.currentUser, {
                    displayName: formData.username,
                    photoURL: formData.photoUrl
                }
                ).then(async () => {
                    const result = await axios.put('https://real-estate-flax-psi.vercel.app/user', {
                        username: formData.username,
                        email: formData.email,
                        uid: user.uid,
                        photoUrl: formData.photoUrl
                    }, { withCredentials: true });

                    if (result?.data?.acknowledged) {
                        toast.success('User profile updated successfully');
                        navigate('/');
                    }

                }).catch(error => {
                    console.error('Error updating user profile:', error.code, error.message);
                }
                );
            }).catch(error => {
                const errorMessage = error.message;
                console.error('Error registering user:', error.code, errorMessage);
                setErrorMessage(errorMessage);
                setSuccess(false);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete='name'
                            required
                            placeholder='Enter a username'
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-600">
                            Avatar
                        </label>
                        <input
                            type="text"
                            name="photoUrl"
                            value={formData.photoUrl}
                            onChange={handleChange}
                            autoComplete='photo'
                            required
                            placeholder='Enter a photo URL'
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete='email'
                            required
                            placeholder='Enter a valid e-mail'
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            autoComplete='new-password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter a strong password'
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-4 top-6 flex items-center text-gray-600 hover:text-gray-800"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>

                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                {success && <p className="text-sm text-green-500">User registered successfully</p>}
                {verificationMessage && <p className="text-sm text-blue-500">{verificationMessage}</p>}
            </div>
        </div>
    );
};

export default Register;