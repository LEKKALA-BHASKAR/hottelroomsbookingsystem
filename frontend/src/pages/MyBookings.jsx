import React, { useEffect, useState } from 'react';
import API from '../api';

function MyBookings() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get(`/bookings/user/${user.id}`).then(res => setBookings(res.data));
  }, [user.id]);

  return (
    <div>
      <h2>My Booking History</h2>
      {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map(b => (
        <div key={b._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
          <p><strong>Room No:</strong> {b.roomId?.number}</p>
          <p><strong>Booked At:</strong> {new Date(b.bookedAt).toLocaleString()}</p>
          <p><strong>Status:</strong> {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
