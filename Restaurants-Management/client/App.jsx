import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AllFoods from './pages/AllFoods';
import SingleFoodPage from './pages/SingleFoodPage';
import FoodPurchasePage from './src/pages/FoodPurchasePage';
import GalleryPage from './pages/GalleryPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyFoodsPage from './src/pages/MyFoodsPage';
import AddFoodPage from './pages/AddFoodPage';
import MyOrders from './src/pages/MyOrdersPage';
import PrivateRoute from './routes/PrivateRoute';
import'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ToastContainer />
        <main className="flex-grow bg-base-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<AllFoods />} />
            <Route path="/foods/:id" element={<SingleFoodPage />} />
            <Route
              path="/purchase/:id"
              element={
                <PrivateRoute>
                  <FoodPurchasePage />
                </PrivateRoute>
              }
            />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/my-foods"
              element={
                <PrivateRoute>
                  <MyFoodsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-food"
              element={
                <PrivateRoute>
                  <AddFoodPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
