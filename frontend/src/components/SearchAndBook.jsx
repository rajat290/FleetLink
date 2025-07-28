import { useState } from 'react';
import api from '../api/axiosConfig';

export default function AddVehicle() {
  const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/vehicles', {
        name: form.name,
        capacityKg: Number(form.capacityKg),
        tyres: Number(form.tyres),
      });
      setMessage('Vehicle added successfully!');
      setForm({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      setMessage('Error adding vehicle');
    }
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold mb-2">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" placeholder="Vehicle Name" value={form.name} onChange={handleChange} required className="border p-2" />
        <input name="capacityKg" placeholder="Capacity (Kg)" value={form.capacityKg} onChange={handleChange} type="number" required className="border p-2" />
        <input name="tyres" placeholder="Tyres" value={form.tyres} onChange={handleChange} type="number" required className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4">Submit</button>
      </form>
      {message && <p className="mt-2 text-center text-green-600">{message}</p>}
    </div>
  );
}