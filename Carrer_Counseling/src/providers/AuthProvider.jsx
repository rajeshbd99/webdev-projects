import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.init';
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
                console.log('User logged in:', currentUser);
                setUser(currentUser);
                setLoading(false);
            } else {
                console.log('No user logged in');
                setUser(null);
            }
        })

        return () => {
            unSubscribe()
        }
    }, [user])

    const logoutUser = () => {
        setLoading(true);
        toast.success('Logged out successfully!');
        return signOut(auth)
    }

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