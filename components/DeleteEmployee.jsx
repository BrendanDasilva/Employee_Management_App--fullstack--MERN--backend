import React, { useState } from "react";
import apiClient from "../axiosConfig";

const DeleteEmployee = ({ employeeId, onDelete }) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleDelete = async () => {
    try {
      await apiClient.delete("/emp/employees", { params: { eid: employeeId } });
      setMessage("Employee deleted successfully.");
      setMessageType("success");
      onDelete(employeeId);
    } catch (error) {
      setMessage("Error deleting employee. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div>
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteEmployee;
