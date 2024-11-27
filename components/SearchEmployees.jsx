import React, { useState } from "react";
import apiClient from "../axiosConfig";

const SearchEmployees = () => {
  const [criteria, setCriteria] = useState({ department: "", position: "" });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await apiClient.get("/emp/employees/search", {
        params: criteria,
      });
    } catch (error) {
      console.log("Error searching employees:", error);
    }
  };

  return (
    <div>
      <h1>Search Employees</h1>
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={criteria.department}
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={criteria.position}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((emp) => (
          <li key={emp.employee_id}>
            {emp.first_name} {emp.last_name} - {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchEmployees;
