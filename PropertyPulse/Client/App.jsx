import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import AllProperties from '../pages/AllProperties';
import PropertyDetails from './src/pages/PropertyDetails';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import Dashboard from './src/pages/Dashboard/Dashboard';
import MyProfile from './src/pages/Dashboard/MyProfile';
import Wishlist from './src/pages/Dashboard/Wishlist';
import PropertyBought from './src/pages/Dashboard/PropertyBought';
import MyReviews from './src/pages/Dashboard/MyReviews';
import UserDashboard from './src/pages/Dashboard/UserDashboard';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/all-properties" element={<PrivateRoute><AllProperties /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/dashboard/*"
                            element={
                                <UserDashboard>
                                    <Routes>
                                        <Route path="profile" element={<MyProfile />} />
                                        <Route path="wishlist" element={<Wishlist />} />
                                        <Route path="property-bought" element={<PropertyBought />} />
                                        <Route path="my-reviews" element={<MyReviews />} />
                                    </Routes>
                                </UserDashboard>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Routes>
        </Router>
    );
};

export default App;
