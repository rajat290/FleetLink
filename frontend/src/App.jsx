import { Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./components/AddVehicle";
import SearchAndBook from "./components/SearchAndBook";
import LandingPage from "./components/LandingPage";
import Bookings from "./components/Bookings";

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white py-4 px-6 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">FleetLink</h1>

        {/* Links + Buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <Link to="/" className="text-sm sm:text-base hover:underline">
            Home
          </Link>
          <Link to="/bookings" className="hover:underline">My Bookings</Link>

          <Link
            to="/search"
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-semibold shadow"
          >
            Book Vehicle
          </Link>
          <Link
            to="/add-vehicle"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-semibold shadow"
          >
            Add Vehicle
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/search" element={<SearchAndBook />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </div>
  );
}
