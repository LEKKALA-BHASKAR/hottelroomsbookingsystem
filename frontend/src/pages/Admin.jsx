import { useEffect, useState } from 'react';
import API from '../api';

function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/bookings/all').then(res => setBookings(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/bookings/${id}/status`, { status });
    alert('Booking status updated!');
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {bookings.map(b => (
        <div key={b._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <p>User: {b.userId?.name}</p>
          <p>Room No: {b.roomId?.number}</p>
          <p>Status: {b.status}</p>
          <button onClick={() => updateStatus(b._id, 'confirmed')}>Confirm</button>
          <button onClick={() => updateStatus(b._id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
