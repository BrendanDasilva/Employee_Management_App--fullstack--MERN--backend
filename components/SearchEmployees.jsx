import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const SearchEmployees = () => {
  const [criteria, setCriteria] = useState({ department: "", position: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await apiClient.get("/emp/employees/search", {
        params: criteria,
      });
      if (response.data.length > 0) {
        navigate("/employee-list", {
          state: { message: "Employees found!", messageType: "success" },
        });
      } else {
        navigate("/employee-list", {
          state: {
            message: "No employees found matching the criteria.",
            messageType: "error",
          },
        });
      }
    } catch (error) {
      navigate("/employee-list", {
        state: {
          message: "Error searching employees. Please try again.",
          messageType: "error",
        },
      });
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
    </div>
  );
};

export default SearchEmployees;
