// src/components/SearchAndBook.jsx
import { useState } from 'react';
import api from '../api/axiosConfig';

export default function SearchAndBook() {
  const [form, setForm] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: '',
  });

  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.get('/vehicles/available', {
        params: form,
      });
      setVehicles(res.data.availableVehicles || []);
      setMessage(`Estimated Duration: ${res.data.estimatedRideDurationHours} hrs`);
    } catch (err) {
      setMessage('❌ Error fetching vehicles');
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      await api.post('/bookings', {
        vehicleId,
        ...form,
        customerId: 'demo123',
      });
      alert('✅ Booking successful');
    } catch (err) {
      alert('❌ Booking failed: Vehicle may be unavailable');
    }
  };

  return (
    <div className="p-4 border rounded max-w-xl mx-auto my-4">
      <h2 className="text-xl font-semibold mb-2">Search & Book Vehicles</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <input name="capacityRequired" placeholder="Capacity Required" value={form.capacityRequired} onChange={handleChange} required className="border p-2" />
        <input name="fromPincode" placeholder="From Pincode" value={form.fromPincode} onChange={handleChange} required className="border p-2" />
        <input name="toPincode" placeholder="To Pincode" value={form.toPincode} onChange={handleChange} required className="border p-2" />
        <input name="startTime" type="datetime-local" value={form.startTime} onChange={handleChange} required className="border p-2" />
        <button type="submit" className="bg-green-500 text-white py-2 px-4">Search Availability</button>
      </form>

      {message && <p className="mt-2 text-center text-blue-600">{message}</p>}

      <div className="mt-4">
        {vehicles.map((v) => (
          <div key={v._id} className="border p-3 mb-2">
            <p><strong>Name:</strong> {v.name}</p>
            <p><strong>Capacity:</strong> {v.capacityKg} Kg</p>
            <p><strong>Tyres:</strong> {v.tyres}</p>
            <button onClick={() => handleBook(v._id)} className="bg-purple-500 text-white px-4 py-1 mt-2">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
