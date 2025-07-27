import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import Admin from './pages/Admin';
import MyBookings from './pages/MyBookings';
import AdminRooms from './pages/AdminRooms';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
      </Routes>
    </Router>
  );
}

export default App;
