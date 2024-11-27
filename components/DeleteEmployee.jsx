import React from "react";
import apiClient from "../axiosConfig";

const DeleteEmployee = ({ employeeId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await apiClient.delete("/emp/employees", { params: { eid: employeeId } });
      console.log("Employee Deleted Successfully");
      onDelete(employeeId);
    } catch (error) {
      console.log("Error deleting employee", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteEmployee;
