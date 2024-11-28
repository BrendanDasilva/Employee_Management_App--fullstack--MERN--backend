import React from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const DeleteEmployee = ({ employeeId, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await apiClient.delete("/emp/employees", { params: { eid: employeeId } });
      onDelete(employeeId);
      navigate("/employee-list", {
        state: {
          message: "Employee deleted successfully!",
          messageType: "success",
        },
      });
    } catch (error) {
      navigate("/employee-list", {
        state: {
          message: "Error deleting employee. Please try again.",
          messageType: "error",
        },
      });
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteEmployee;
