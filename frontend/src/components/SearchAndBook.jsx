import { useState } from "react";
import api from "../api/axiosConfig";

export default function SearchAndBook() {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.get("/vehicles/available", { params: form });
      setVehicles(res.data.availableVehicles || []);
      setMessage(
        `Estimated Duration: ${res.data.estimatedRideDurationHours} hrs`
      );
    } catch {
      setMessage("❌ Error fetching vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (vehicleId) => {
    setBookingLoading(true);
    try {
      await api.post("/bookings", {
        vehicleId,
        ...form,
        customerId: "demo123",
      });
      alert("✅ Booking successful!");
    } catch {
      alert("❌ Booking failed: Vehicle may be unavailable.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
        Search & Book Vehicles
      </h2>
      <form onSubmit={handleSearch} className="grid grid-cols-2 gap-4">
        <input
          name="capacityRequired"
          placeholder="Capacity Required"
          value={form.capacityRequired}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-green-400 col-span-2 md:col-span-1"
          disabled={loading}
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={form.fromPincode}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-green-400 col-span-2 md:col-span-1"
          disabled={loading}
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={form.toPincode}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-green-400 col-span-2 md:col-span-1"
          disabled={loading}
        />
        <input
          name="startTime"
          type="datetime-local"
          value={form.startTime}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-green-400 col-span-2 md:col-span-1"
          disabled={loading}
        />
        <button
          type="submit"
          className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Availability"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-blue-600 font-medium">{message}</p>
      )}

      <div className="mt-6 space-y-4">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className="border rounded-lg p-4 flex justify-between items-center shadow"
          >
            <div>
              <p className="font-bold text-lg">{v.name}</p>
              <p>Capacity: {v.capacityKg} Kg</p>
              <p>Tyres: {v.tyres}</p>
            </div>
            <button
              onClick={() => handleBook(v._id)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
              disabled={bookingLoading}
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
