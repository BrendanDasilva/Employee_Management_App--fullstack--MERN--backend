import React, { useEffect, useState } from "react";
import apiClient from "../axiosConfig";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get("/emp/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employees: ", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
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
