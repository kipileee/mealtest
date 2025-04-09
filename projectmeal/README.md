## Project Structure

The project is organized into two main directories:
- `frontend/`: React application
- `backend/`: Express API server

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd frontend && npm install
```

3. Install backend dependencies:
```bash
cd backend && npm install
```

4. Install concurrently:
```bash
npm install concurrently --save-dev
```

### Running the Application

1. Start both frontend and backend servers:
```bash
npm run dev
```

This will start:
- Frontend server on http://localhost:5173
- Backend server on http://localhost:3000

## Environment Variables

The backend uses the following environment variables:
- `PORT`: The port number for the backend server (default: 3000)

## API Endpoints

- `GET /api/recipes`: Get all recipes or filter by query parameters
  - Query parameters:
    - `ingredient`: Filter by ingredient
    - `country`: Filter by country
    - `category`: Filter by category
- `GET /api/recipes/:id`: Get detailed information about a specific recipe