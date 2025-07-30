// src/components/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to FleetLink 🚚</h1>
        <p className="text-lg max-w-2xl mx-auto">
          FleetLink is a Logistics Vehicle Booking System, built as a practical
          task for <span className="font-bold">Knovator Company</span>.  
          I am showcasing my full MERN stack skills to secure a position.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          About FleetLink
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          FleetLink is designed to manage and book logistics vehicles efficiently. 
          It allows administrators to add vehicles, users to search for available 
          ones, and initiate bookings with real-time availability checks.  
          This project demonstrates my ability to build a complete full-stack 
          application — including backend APIs, frontend UI, and MongoDB integration.
        </p>
      </section>

      {/* Motivation Section */}
      <section className="bg-indigo-100 py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Why I’m Building This
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed text-center">
          This is not just a coding task — it’s my way to showcase professional MERN 
          stack development skills. From database modeling to API design and responsive 
          UI, everything here is structured to meet real-world development standards 
          expected by Knovator.
        </p>
      </section>

      {/* Action Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Ready to Explore FleetLink?
        </h2>
        <div className="flex justify-center gap-6">
          <Link
            to="/search"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            🚛 Book a Vehicle
          </Link>
          <Link
            to="/add-vehicle"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            ➕ Add Vehicle
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center mt-12">
        <p>
          Built with ❤️ by <span className="font-bold">Rajat Singh Tomar</span> 
          to showcase MERN stack skills for Knovator.
        </p>
      </footer>
    </div>
  );
}
