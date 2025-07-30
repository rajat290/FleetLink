import { useState } from "react";
import api from "../api/axiosConfig";

export default function AddVehicle() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/vehicles", {
        name: form.name,
        capacityKg: Number(form.capacityKg),
        tyres: Number(form.tyres),
      });
      setMessage("✅ Vehicle added successfully!");
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch {
      setMessage("❌ Error adding vehicle");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Add New Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="capacityKg"
          placeholder="Capacity (Kg)"
          type="number"
          value={form.capacityKg}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="tyres"
          placeholder="Tyres"
          type="number"
          value={form.tyres}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Add Vehicle
        </button>
      </form>
      {message && (
        <p className="mt-3 text-center font-medium text-green-600">{message}</p>
      )}
    </div>
  );
}
