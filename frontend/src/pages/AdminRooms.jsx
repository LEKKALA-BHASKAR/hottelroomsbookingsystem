import { useEffect, useState } from 'react';
import API from '../api';

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ number: '', type: '', price: '', status: 'available' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await API.get('/rooms');
    setRooms(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/rooms/${editId}`, form);
      alert('Room updated!');
    } else {
      await API.post('/rooms', form);
      alert('Room created!');
    }
    setForm({ number: '', type: '', price: '', status: 'available' });
    setEditId(null);
    fetchRooms();
  };

  const handleEdit = (room) => {
    setForm(room);
    setEditId(room._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
    }
  };

  return (
    <div>
      <h2>Admin - Manage Rooms</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Room Number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} />
        <input placeholder="Type (e.g. AC, Non-AC)" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button type="submit">{editId ? 'Update Room' : 'Add Room'}</button>
      </form>

      <hr />
      <h3>All Rooms</h3>
      {rooms.map(room => (
        <div key={room._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <p>Number: {room.number}</p>
          <p>Type: {room.type}</p>
          <p>Price: ₹{room.price}</p>
          <p>Status: {room.status}</p>
          <button onClick={() => handleEdit(room)}>Edit</button>
          <button onClick={() => handleDelete(room._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminRooms;
