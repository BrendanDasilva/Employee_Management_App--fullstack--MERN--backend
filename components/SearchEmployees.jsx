import React, { useState } from "react";
import apiClient from "../axiosConfig";

const SearchEmployees = () => {
  const [criteria, setCriteria] = useState({ department: "", position: "" });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await apiClient.get("/emp/employees/search", {
        params: criteria,
      });
      if (response.data.length > 0) {
        setResults(response.data);
        setMessage("Employees found!");
        setMessageType("success");
      } else {
        setMessage("No employees found matching the criteria.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error searching employees. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div>
      <h1>Search Employees</h1>
      {message && (
        <div
          className={`message ${messageType}`}
          style={{
            color: messageType === "success" ? "green" : "red",
            marginBottom: "1rem",
          }}
        >
          {message}
        </div>
      )}
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
