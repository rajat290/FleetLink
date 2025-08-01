import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await api.get("/bookings");
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`/bookings/${id}`);
    setBookings(bookings.filter((b) => b._id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} className="border rounded p-4 mb-3 flex justify-between items-center">
          <div>
            <p><strong>Vehicle:</strong> {b.vehicleId?.name}</p>
            <p><strong>From:</strong> {b.fromPincode}</p>
            <p><strong>To:</strong> {b.toPincode}</p>
            <p><strong>Start:</strong> {new Date(b.startTime).toLocaleString()}</p>
          </div>
          <button
            onClick={() => handleCancel(b._id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
