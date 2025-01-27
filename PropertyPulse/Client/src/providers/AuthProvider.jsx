import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {



    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
                 axios.post('https://real-estate-flax-psi.vercel.app/jwt-auth',user, {
              withCredentials: true,
            })
            .then((response) => {})
            .catch((error) => {
              toast.success("user authenticated failed!");
            });
            } else {
                setLoading(false);
                setUser(null);
            }
        })

        //component unmount , clean up
        return () => {
            unSubscribe()
        }
    }, [user])

    const logoutUser = async () => {
        setLoading(true);
        try {
          // Send a logout request to the server
          await axios.post('https://real-estate-flax-psi.vercel.app/logout', {}, { withCredentials: true });
    
          // Clear all accessible cookies on the client side
          document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name =
              eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          });
    
          toast.success("Logged out successfully!", {
            position: "top-center",
            autoClose: 3000,
          });
    
          // Clear authentication state
          await signOut(auth);
        } catch (error) {
          alert("An error occurred during logout.");
        } finally {
          setLoading(false);
        }
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logoutUser,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

/*
    1. Create a context with a default value of null
    2. Create a component called AuthProvider
    3. Set Default value for the context
    4. Use the auth provider in main.jsx
    5. Access the children prop in the AuthProvider component
*/