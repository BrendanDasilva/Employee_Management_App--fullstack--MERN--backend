Project Title: COMP3123 Full Stack Development Assignment 1

1. Project Overview
   This project is a Full Stack development assignment for COMP3123. The backend was built using Node.js, Express.js, MongoDB, and JWT for authentication. The project demonstrates RESTful API design and includes user and employee management with CRUD functionality.

2. Features

- User Management:

  - User signup with hashed password and JWT-based login
  - Retrieve all users
  - Delete a user by ID

- Employee Management:
  - Retrieve all employees
  - Add a new employee
  - Get employee details by ID
  - Update employee details by ID
  - Delete employee by ID

3. Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT (jsonwebtoken)
- bcrypt.js for password hashing
- express-validator for input validation

4. API Endpoints

User Management Endpoints:

- POST /api/v1/user/signup: Create a new user
- POST /api/v1/user/login: Login a user and receive a JWT
- GET /api/v1/user/users: Retrieve all users
- DELETE /api/v1/user/:id: Delete a user by ID

Employee Management Endpoints:

- GET /api/v1/emp/employees: Retrieve all employees
- POST /api/v1/emp/employees: Create a new employee
- GET /api/v1/emp/employees/:eid: Get employee details by ID
- PUT /api/v1/emp/employees/:eid: Update employee details by ID
- DELETE /api/v1/emp/employees?eid=xxx: Delete employee by ID

5. Testing
   Testing done via Postman using API Endpoints from item 4.
