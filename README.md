# FleetLink - Vehicle Booking System

FleetLink is a full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing vehicle bookings in a logistics company. The system allows users to add vehicles to the fleet, search for available vehicles based on date ranges, and book vehicles for specific periods.

## Features

- Add vehicles to the fleet with details
- Search for available vehicles based on start and end dates
- Book vehicles for specific date ranges
- MongoDB for data persistence
- RESTful API design
- Docker containerization for easy deployment
- React frontend with responsive UI

## Prerequisites

- Node.js and npm installed on your machine
- Docker and Docker Compose installed (optional, for containerized setup)
- MongoDB (either local installation or Docker container)

## Project Structure

```
FleetLink/
├── backend/          # Node.js/Express backend server
│   ├── controllers/  # Request handlers
│   ├── models/       # MongoDB data models
│   ├── routes/       # API route definitions
│   ├── config/       # Database configuration
│   └── tests/        # Jest test files
├── Frontend/         # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── api/         # API client configuration
│   │   └── assets/      # Static assets
└── nginx/            # Nginx configuration for production
```

## Backend API Endpoints

### Vehicle Endpoints
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Add a new vehicle
- `GET /api/vehicles/available` - Search for available vehicles

### Booking Endpoints
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking

## Setup Instructions

### Option 1: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/fleetlink
   PORT=5000
   ```

4. Run the backend server:
   ```bash
   npm start
   ```
   or for development with auto-restart:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend application:
   ```bash
   npm run dev
   ```

### Option 2: Docker Setup

To run both backend and frontend using Docker Compose, run the following command from the root directory:

```bash
docker-compose up
```

This will start all services defined in the `docker-compose.yml` file:
- MongoDB database
- Backend Node.js server
- Frontend React application served through Nginx

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing

### Backend Testing

Run backend tests with Jest:
```bash
cd backend
npm test
```

## Environment Variables

### Backend (.env file)
```
MONGO_URI=mongodb://localhost:27017/fleetlink
PORT=5000
```

## Troubleshooting

### Common Issues

1. **Frontend API calls returning 404 errors**: 
   - Ensure the backend is running on port 5000
   - Check that the baseURL in `Frontend/src/api/axiosConfig.js` is set to `http://localhost:5000/api`

2. **Database connection errors**:
   - Verify MongoDB is running and accessible
   - Check the MONGO_URI in the backend `.env` file

3. **CORS errors**:
   - The backend should have CORS configured to allow requests from the frontend origin

## Additional Notes

- The backend runs on port 5000 by default
- The frontend runs on port 5173 in development mode
- All API endpoints are prefixed with `/api`
- Docker setup serves the frontend through Nginx on port 3000

For any issues or questions, please contact @ rajatsinghtomarofficial@gmail.com.
