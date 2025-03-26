### See Frontend here: https://github.com/BrendanDasilva/Employee_Management_App--fullstack--MERN--frontend


# **COMP3123 Full Stack Development - Assignment 1**

## **Project Overview**

This project is a Full Stack web application for **COMP3123 Full Stack Development**. The backend is built using **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. It follows RESTful API design principles and implements **user authentication** and **employee management** with CRUD functionality.

The backend supports:

- **User Authentication** (Signup, Login with JWT)
- **User Management** (Retrieve and delete users)
- **Employee Management** (CRUD operations on employee data)
- **Employee Search** (Filter employees by department or position)

## **Features**

### **User Management**

✅ User signup with hashed passwords and JWT-based authentication\
✅ User login and token generation\
✅ Retrieve all users\
✅ Delete a user by ID

### **Employee Management**

✅ Retrieve all employees\
✅ Add a new employee with validation\
✅ Get employee details by ID\
✅ Update employee details by ID\
✅ Delete an employee by ID\
✅ Search employees by **department** or **position**

## **Technologies Used**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken), bcrypt.js for password hashing
- **Validation:** express-validator
- **Security & CORS:** dotenv for environment variables, CORS middleware

## **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/your-repository-link.git
cd your-repository-folder
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Setup Environment Variables**

Create a `.env` file in the root directory and define the following:

```sh
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4. Run the Server**

```sh
npm start
```

The backend should now be running on `http://localhost:3000`.

---

## **API Endpoints**

### **User Management Endpoints**

| Method     | Endpoint              | Description                    |
| ---------- | --------------------- | ------------------------------ |
| **POST**   | `/api/v1/user/signup` | Register a new user            |
| **POST**   | `/api/v1/user/login`  | User login & receive JWT token |
| **GET**    | `/api/v1/user/users`  | Retrieve all users             |
| **DELETE** | `/api/v1/user/:id`    | Delete a user by ID            |

### **Employee Management Endpoints**

| Method     | Endpoint                                                      | Description                                |
| ---------- | ------------------------------------------------------------- | ------------------------------------------ |
| **GET**    | `/api/v1/emp/employees`                                       | Retrieve all employees                     |
| **POST**   | `/api/v1/emp/employees`                                       | Create a new employee                      |
| **GET**    | `/api/v1/emp/employees/:eid`                                  | Get details of an employee by ID           |
| **PUT**    | `/api/v1/emp/employees/:eid`                                  | Update an employee by ID                   |
| **DELETE** | `/api/v1/emp/employees?eid=xxx`                               | Delete an employee by ID                   |
| **GET**    | `/api/v1/emp/employees/search?department=HR&position=Manager` | Search employees by department or position |

---

## **Testing**

Testing was conducted using **Postman** to verify API functionality. You can import the provided Postman collection to test endpoints.

### **Run API Tests in Postman**

1. Open **Postman**.
2. Import the provided collection.
3. Ensure the backend is running.
4. Send requests to the API endpoints.

---

## **Project Structure**

```
📂 project-root/
├── 📂 models/              # Mongoose schemas
│   ├── EmployeeModel.js
│   ├── UserModel.js
├── 📂 routes/              # API Routes
│   ├── employee.js
│   ├── user.js
├── 📂 config/              # Configuration files
├── 📂 controllers/         # (If applicable, for modularity)
├── app.js                 # Main entry point
├── package.json           # Dependencies
├── .env.example           # Example environment file
```

---

## **Future Enhancements**

🔹 Improve error handling with custom error messages\
🔹 Implement role-based authentication (Admin/User)\
🔹 Add pagination for retrieving employees\
🔹 Implement unit tests using Jest or Mocha

---

## **Contributors**

- **Brendan Dasilva** - _Full Stack Developer_
