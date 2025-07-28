import AddVehicle from './components/AddVehicle';
import SearchAndBook from './components/SearchAndBook';
// import App from './App.jsx';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">FleetLink System</h1>
      <AddVehicle />
      <SearchAndBook />
    </div>
  );
}

export default App;