import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/rooms">Rooms</Link>
      <Link to="/my-bookings">My Bookings</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
