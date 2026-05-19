# Hotel Management Application

A full-stack web application for managing hotel reservations and bookings. Built with Express.js backend and vanilla JavaScript frontend.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Hotel Management**: CRUD operations for hotel listings
- **Reservations**: Create and manage hotel reservations
- **Password Security**: Bcrypt hashing for secure password storage
- **Database**: MySQL database with structured schema
- **Authorization**: Middleware-based role and token verification

## Project Structure

```
hotel-app/
├── public/                     # Frontend assets
│   ├── index.html             # Main dashboard
│   ├── login.html             # Login page
│   ├── register.html          # Registration page
│   ├── app.js                 # Frontend main script
│   ├── register.js            # Registration form handler
│   ├── style.css              # Main styles
│   └── styles.css             # Additional styles
│
├── src/                        # Backend source code
│   ├── config/
│   │   └── db.js              # MySQL database configuration
│   │
│   ├── controllers/
│   │   ├── auth.controller.js      # Authentication logic
│   │   ├── hotel.controller.js     # Hotel management logic
│   │   └── reservation.controller.js # Reservation logic
│   │
│   ├── routes/
│   │   ├── auth.routes.js     # Authentication endpoints
│   │   ├── hotel.routes.js    # Hotel endpoints
│   │   └── reservation.routes.js   # Reservation endpoints
│   │
│   ├── middleware/
│   │   └── auth.middleware.js # JWT verification middleware
│   │
│   └── server.js              # Main server file
│
├── package.json               # Project dependencies
├── README.md                  # Spanish documentation
├── README_EN.md              # English documentation (this file)
└── LICENSE                    # GNU General Public License v3
```

## Technologies Used

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt

### Frontend
- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **Fetch API**

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14+)
- **MySQL** (v5.7+)
- **npm** or **yarn**

## Installation

### 1. Clone or download the repository

```bash
cd hotel-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a MySQL database and update the connection details in `src/config/db.js`:

```javascript
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'hotel_db'
});
```

### 4. Create database tables

Execute the following SQL script:

```sql
CREATE DATABASE IF NOT EXISTS hotel_db;

USE hotel_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);
```

### 5. Start the server

```bash
npm start
```

The application will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Login and receive JWT token

### Hotels
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create a new hotel (requires auth)
- `PUT /api/hotels/:id` - Update hotel details (requires auth)
- `DELETE /api/hotels/:id` - Delete a hotel (requires auth)

### Reservations
- `GET /api/reservations` - Get user reservations (requires auth)
- `POST /api/reservations` - Create a new reservation (requires auth)
- `DELETE /api/reservations/:id` - Cancel a reservation (requires auth)

## Usage

### Register a new account
1. Navigate to `/register.html`
2. Fill in your name, email, and password
3. Click "Create Account"

### Login
1. Go to `/login.html`
2. Enter your email and password
3. Click "Sign In"

### Manage Hotels
1. After login, you'll see the hotel list on the dashboard
2. Add hotels by filling in name, location, and price
3. Click "Add Hotel" to create new entries

## Environment Variables

Create a `.env` file in the root directory (optional):

```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hotel_db
JWT_SECRET=your_jwt_secret_key
```

## Security Considerations

- ✅ Passwords are hashed using Bcrypt
- ✅ JWT tokens are used for authentication
- ✅ Sensitive operations require authentication middleware
- ✅ Input validation on server side
- ⚠️ **Note**: Store JWT_SECRET in environment variables in production
- ⚠️ **Note**: Use HTTPS in production environments

## Deployment

This application is currently deployed on **Render** at:
https://hotel-app-1-8jqy.onrender.com/login.html

### To deploy your own:
1. Push your code to GitHub
2. Connect your repository to Render
3. Set up environment variables on Render dashboard
4. Configure the MySQL database (use a cloud database service like ClearDB or AWS RDS)

## Testing

To test the API endpoints, you can use:
- **Postman**: Import the API collection
- **Thunder Client**: VS Code extension
- **cURL**: Command-line tool

Example:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Troubleshooting

### Database connection error
- Ensure MySQL is running
- Check credentials in `src/config/db.js`
- Verify database exists: `CREATE DATABASE hotel_db;`

### Port already in use
- Change the PORT in `.env` or app.js
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### CORS errors
- Add CORS headers or middleware if frontend is on different domain
- Update API_URL in `public/app.js` if needed

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

## License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

## Author

Developed by Gerardo

## Support

For issues, questions, or suggestions, please open an issue on the project repository or contact the development team.

---

**Last Updated**: May 2026
