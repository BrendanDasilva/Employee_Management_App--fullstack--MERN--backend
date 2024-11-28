import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../axiosConfig";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [messageType, setMessageType] = useState(
    location.state?.messageType || ""
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get("/emp/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees.");
      }
    };
    fetchEmployees();

    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      <h1>Employee List</h1>
      {message && (
        <div
          style={{
            color: messageType === "success" ? "green" : "red",
            marginBottom: "1rem",
          }}
        >
          {message}
        </div>
      )}
      <ul>
        {employees.map((emp) => (
          <li key={emp.employee_id}>
            {emp.first_name} {emp.last_name} - {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
