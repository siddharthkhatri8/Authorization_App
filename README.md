# authorization-app

Project Name: Authorization App
Overview
The Authorization App is a role-based access control (RBAC) system built using Node.js, Express.js, and MongoDB. It includes user authentication (signup and login), user authorization for specific roles (e.g., Admin, Student), and JWT-based session handling. The app provides protected routes that restrict access based on user roles and allows users to log in and out seamlessly.

Additionally, a responsive front-end is implemented using HTML, CSS, and JavaScript to provide user-friendly interfaces for Signup, Login, and Dashboard pages.

Endpoints
Public Routes
POST /api/v1/signup: Registers a new user.
POST /api/v1/login: Authenticates a user and generates a JWT token.
POST /api/v1/logout: Logs out a user by clearing the session token.
Protected Routes
GET /api/v1/student: Accessible only to users with the Student role.
GET /api/v1/admin: Accessible only to users with the Admin role.

File Structure

root
├── backend
│   ├── controllers
│   │   └── auth.js           # Handles signup, login, logout logic
│   ├── middlewares
│   │   └── auth.js           # Middleware for authentication and role-based access
│   ├── models
│   │   └── User.js           # Mongoose schema for user data
│   ├── routes
│   │   └── user.js           # Defines API routes
│   ├── config
│   │   └── database.js       # MongoDB connection logic
│   └── server.js             # Entry point for the backend server
├── frontend
│   ├── index.html            # Signup page
│   ├── login.html            # Login page
│   ├── dashboard.html        # User dashboard page
│   ├── style.css             # Stylesheet for all pages
│   └── script.js             # Handles API calls and page interactivity
├── .env                      # Environment variables
└── package.json              # Dependencies and scripts

Environment Variables
Ensure the following variables are set in a .env file:
PORT=3000
MONGODB_URL=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>


Here’s a detailed project documentation for your Authorization App:

Project Name: Authorization App
Overview
The Authorization App is a role-based access control (RBAC) system built using Node.js, Express.js, and MongoDB. It includes user authentication (signup and login), user authorization for specific roles (e.g., Admin, Student), and JWT-based session handling. The app provides protected routes that restrict access based on user roles and allows users to log in and out seamlessly.

Additionally, a responsive front-end is implemented using HTML, CSS, and JavaScript to provide user-friendly interfaces for Signup, Login, and Dashboard pages.

Features
Backend
User Signup:

Allows new users to register with their name, email, password, and role.
Passwords are securely hashed using bcrypt before storing in the database.
User Login:

Authenticates users with email and password.
Generates a JWT token for session management upon successful login.
Stores the JWT token in cookies for secure session handling.
Role-Based Access Control (RBAC):

Includes predefined roles: Admin, Student, and Moderator.
Provides middleware to restrict access to specific routes based on roles.
Protected Routes:

Routes are secured using custom middleware to check authentication and role authorization.
User Logout:

Clears the session token stored in cookies.
Database Integration:

MongoDB is used to store user data securely.
Connection to the database is managed using Mongoose.
Frontend
Signup Page:

Allows users to create an account by providing their name, email, password, and role.
Integrates with the backend API to register new users.
Login Page:

Enables existing users to log in with their email and password.
Fetches and displays the logged-in user's details.
Dashboard Page:

Displays a welcome message with the logged-in user's name and role.
Provides a Logout button for session termination.
Responsive Design:

Clean and modern UI built using HTML, CSS, and JavaScript.
Fully responsive for mobile and desktop users.
Technical Stack
Backend:

Node.js: Runtime environment.
Express.js: Web framework for routing and middleware.
Mongoose: MongoDB Object Data Modeling (ODM) library.
bcrypt: For hashing passwords.
jsonwebtoken: For generating and verifying JWT tokens.
Frontend:

HTML5: Structure of web pages.
CSS3: Styling and responsiveness.
JavaScript (ES6): Logic for interactivity and API communication.
Database:

MongoDB: NoSQL database for storing user credentials and role information.
Endpoints
Public Routes
POST /api/v1/signup: Registers a new user.
POST /api/v1/login: Authenticates a user and generates a JWT token.
POST /api/v1/logout: Logs out a user by clearing the session token.
Protected Routes
GET /api/v1/student: Accessible only to users with the Student role.
GET /api/v1/admin: Accessible only to users with the Admin role.
File Structure
bash
Copy code
root
├── backend
│   ├── controllers
│   │   └── auth.js           # Handles signup, login, logout logic
│   ├── middlewares
│   │   └── auth.js           # Middleware for authentication and role-based access
│   ├── models
│   │   └── User.js           # Mongoose schema for user data
│   ├── routes
│   │   └── user.js           # Defines API routes
│   ├── config
│   │   └── database.js       # MongoDB connection logic
│   └── server.js             # Entry point for the backend server
├── frontend
│   ├── index.html            # Signup page
│   ├── login.html            # Login page
│   ├── dashboard.html        # User dashboard page
│   ├── style.css             # Stylesheet for all pages
│   └── script.js             # Handles API calls and page interactivity
├── .env                      # Environment variables
└── package.json              # Dependencies and scripts
Environment Variables
Ensure the following variables are set in a .env file:

makefile
Copy code
PORT=3000
MONGODB_URL=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>

How to Run the Project
Backend
Install dependencies:
npm install
Set up the .env file with the required variables.
Start the backend server:
node server.js

Frontend
Navigate to the frontend folder.
Open index.html in your browser or use a live server (e.g., VSCode Live Server).


Sample API Flow

Signup a User:

Endpoint: POST /api/v1/signup
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "Student"
}
Response:
{
  "success": true,
  "message": "User created successfully"
}

Login a User:

Endpoint: POST /api/v1/login
Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "token": "<JWT_TOKEN>",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student"
  },
  "message": "User logged in successfully"
}

Access Protected Route:

Endpoint: GET /api/v1/student
Headers:
Authorization: Bearer <JWT_TOKEN>

Logout:

Endpoint: POST /api/v1/logout
Response:
{
  "success": true,
  "message": "User logged out successfully"
}


