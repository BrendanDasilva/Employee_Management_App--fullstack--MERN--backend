import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/emp/employees", formData);
      navigate("/employee-list", {
        state: {
          message: "Employee added successfully!",
          messageType: "success",
        },
      });
    } catch (error) {
      navigate("/employee-list", {
        state: {
          message: "Error adding employee. Please try again.",
          messageType: "error",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date_of_joining"
        value={formData.date_of_joining}
        onChange={handleChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
