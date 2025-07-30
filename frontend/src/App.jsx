import { Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./components/AddVehicle";
import SearchAndBook from "./components/SearchAndBook";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <div>
      <nav className="bg-indigo-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">FleetLink 🚚</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/add-vehicle" className="hover:underline">Add Vehicle</Link>
          <Link to="/search" className="hover:underline">Search & Book</Link>
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
