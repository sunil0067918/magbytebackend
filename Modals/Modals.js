const mongoose = require("mongoose");

// Employee schema definition
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  requriement: {
    type: String,
    required: true,
  },
  

  // Add other fields as necessary
});






// Export the Employee model
module.exports = mongoose.model("Employee", employeeSchema);
