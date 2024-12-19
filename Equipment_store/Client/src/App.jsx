// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import AddEquipmentPage from './pages/AddEquipmentPage';
import MyEquipmentListPage from './pages/MyEquipmentListPage';
import AddEquipment from './components/Layout/AddEquipment';
import EquipmentDetails from './pages/EquipmentDetails';
import AllEquipment from './pages/AllEquipment';
import { AuthProvider } from './providers/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-equipment-page" element={<AddEquipmentPage />} />
          <Route path="/equipment" element={<EquipmentDetails />} />
          <Route path = "/add-equipment" element={<AddEquipment />} />
          <Route path="/all-equipment" element={<AllEquipment />} />
          <Route path="/my-equipment" element={<MyEquipmentListPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
