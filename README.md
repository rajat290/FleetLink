# FleetLink

This project consists of a backend and frontend application for FleetLink.

## Prerequisites

- Node.js and npm installed on your machine
- Docker and Docker Compose installed (optional, for containerized setup)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the backend server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

## Frontend Setup

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
   npm start
   ```

## Running with Docker Compose

To run both backend and frontend using Docker Compose, run the following command from the root directory:

```bash
docker-compose up
```

This will start all services defined in the `docker-compose.yml` file.

## Additional Notes

- Make sure ports required by backend and frontend are free before starting the services.
- For any issues or questions, please contact the project maintainer.
