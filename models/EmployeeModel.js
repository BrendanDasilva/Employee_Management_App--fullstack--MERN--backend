const mongoose = require("mongoose");

// Employee schema
const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  date_of_joining: { type: Date, required: true },
  department: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Export Employee Model
module.exports = mongoose.model("Employee", EmployeeSchema);
