import React, { useEffect, useState } from "react";
import apiClient from "../axiosConfig";

const EmployeeDetails = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details.");
      }
    };
    fetchEmployee();
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <p>
        Name: {employee.first_name} {employee.last_name}
      </p>
      <p>Email: {employee.email}</p>
      <p>Position: {employee.position}</p>
      <p>Salary: ${employee.salary}</p>
      <p>Department: {employee.department}</p>
      <p>
        Date of Joining: {new Date(employee.date_of_joining).toDateString()}
      </p>
    </div>
  );
};

export default EmployeeDetails;
