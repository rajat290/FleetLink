import { Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./components/AddVehicle";
import SearchAndBook from "./components/SearchAndBook";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <div>
      <nav className="bg-indigo-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">FleetLink </h1> 
        <div className="space-x-4">
          {/* <Link to="/" className="hover:underline">Home</Link> */}
            <Link
            to="/add-vehicle"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            ➕ Add Vehicle
          </Link>
            <Link
            to="/search"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            🚛 Book a Vehicle
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/search" element={<SearchAndBook />} />
      </Routes>
    </div>
  );
}
