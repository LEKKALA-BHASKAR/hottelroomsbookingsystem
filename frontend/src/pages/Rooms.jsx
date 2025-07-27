// src/pages/Rooms.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get('/rooms').then(res => setRooms(res.data));
  }, []);

  const bookRoom = async (roomId) => {
    await API.post('/bookings', { userId: user.id, roomId });
    alert('We will confirm your booking within 1–2 hours!');
  };

  return (
    <div>
      <h2>All Rooms</h2>
      {rooms.map(room => (
        <div key={room._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h4>Room No: {room.number}</h4>
          <p>Status: {room.status}</p>
          <button disabled={room.status !== 'available'} onClick={() => bookRoom(room._id)}>
            {room.status === 'available' ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Rooms;
