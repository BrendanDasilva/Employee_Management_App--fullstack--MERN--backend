import React, { useEffect, useState } from "react";
import apiClient from "../axiosConfig";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get("/emp/employees");
        setEmployees(response.data);
        setMessage("");
      } catch (error) {
        setMessage("Error fetching employees. Please try again.");
        setMessageType("error");
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      {message && (
        <div
          className={`message ${messageType}`}
          style={{
            color: messageType === "error" ? "red" : "black",
            marginBottom: "1rem",
          }}
        >
          {message}
        </div>
      )}
      {employees.length > 0 ? (
        <ul>
          {employees.map((emp) => (
            <li key={emp.employee_id}>
              {emp.first_name} {emp.last_name} - {emp.position}
            </li>
          ))}
        </ul>
      ) : (
        !message && <div>Loading...</div>
      )}
    </div>
  );
};

export default EmployeeList;
