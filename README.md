# Vehicle Rental System API

A robust RESTful API for managing vehicle rentals with user authentication, vehicle inventory, and booking management.

**Live URL:** `https://your-deployed-url.com` *(Update with your live deployment URL)*

---

## Features

- **User Management**
  - User registration and authentication
  - JWT-based authorization
  - Password encryption with bcryptjs

- **Vehicle Management**
  - Browse and search available vehicles
  - Add and manage vehicle inventory
  - Real-time availability tracking

- **Booking System**
  - Create and manage rental bookings
  - Track booking history
  - Calculate rental costs

- **Security**
  - JWT authentication tokens
  - Password hashing and verification
  - Protected API endpoints

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for building REST APIs
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management

### Development Tools
- **tsx** - TypeScript executor for Node.js
- **TypeScript Compiler** - Type checking and compilation

---

## Setup & Usage Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle_rental_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=vehicle_rental_db
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Setup database**
   ```bash
   # Create PostgreSQL database and run migrations
   createdb vehicle_rental_db
   # Run any SQL setup scripts if available
   ```

5. **Build TypeScript**
   ```bash
   npm run build
   ```

### Running the Application

**Development mode** (with auto-restart on file changes)
```bash
npm run dev
```

**Production mode**
```bash
npm start
```

The API server will start on `http://localhost:3000`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

#### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles` - Add new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

#### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Project Structure

```
vehicle_rental_system/
├── src/
│   ├── auth/                 # Authentication module
│   ├── modules/
│   │   ├── users/           # User management
│   │   ├── vehicle/         # Vehicle management
│   │   └── booking/         # Booking management
│   ├── config/              # Database configuration
│   ├── middleware/          # Authentication & authorization
│   ├── types/               # TypeScript type definitions
│   └── server.ts            # Express app entry point
├── package.json
├── tsconfig.json
├── .env                     # Environment variables (not committed)
└── README.md
```

---

## Best Practices

- All endpoints require JWT authentication (except login/register)
- Request/response payloads use JSON format
- Password fields are hashed before storing
- All user inputs are validated

---

## License

ISC

---

## Author

Created as part of the Programming Hero Level 2 Mission 3 - Node.js & Express
