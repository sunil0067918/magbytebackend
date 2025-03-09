const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./Modals/Modals");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string
mongoose
  .connect(
    "mongodb+srv://sunilmehra356305:sunilmehra1234@cluster0.ckzrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// POST route to create a new Employee
app.post("/register", (req, res) => {
  // Make sure to send a request body matching the schema in Employee model
  Employee.create(req.body)
    .then((employee) => res.json(employee)) // Send the created employee object in response
    .catch((err) => res.status(400).json({ error: err.message })); // Handle error and send it back
  // console.log(req.body)
  // res.send("data suces")
});
app.listen(3000, () => {
  console.log("server is running");
});
