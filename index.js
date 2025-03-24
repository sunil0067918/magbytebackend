// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Employee = require("./Modals/Modals");
// const http =  require("http")
// const nodemailer  =  require("nodemailer")

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB connection string
// mongoose
//   .connect(
//     "mongodb+srv://sunil1234:Sunilmehra1234@cluster0.gg8va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error: ", err));

// // POST route to create a new Employee
// // POST route to create a new Employee
// app.post("/register", async (req, res) => {
//   try {
//     // Validate the request body (example validation)
//     const { company, Email, firstName , requriement , number } = req.body;

//     if (!firstName || !Email || !number  || !company || !requriement) {
//       return res.status(400).json({ error: "All fields (name, email, position) are required." });
//     }

//     // Create a new employee in the database
//     const employee = await Employee.create(req.body);

//     // Return the created employee object in the response
//     return res.status(201).json({
//       message: "Employee registered successfully",
//       employee,
//     });
//   } catch (err) {
//     // Catch any errors and send a response with the error message
//     console.error("Error in registering employee:", err);
//     return res.status(500).json({ error: "Failed to register employee. Please try again." + err });
//   }
// });

// app.listen(3000, () => {
//   console.log("server is running");
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./Modals/Modals");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect(
    "mongodb+srv://sunil1234:Sunilmehra1234@cluster0.gg8va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use your email service, e.g., 'gmail', 'hotmail', etc.
  auth: {
    user: "s0067918@gmail.com", // Your email address
    pass: "oczg bcan xclp rjbk", // Your email password or app password

  },
});

// POST route to create a new Employee
app.post("/register", async (req, res) => {
  try {
    // Validate the request body
    const { company, Email, firstName, requriement, number } = req.body;

    if (!firstName || !Email || !number || !company || !requriement) {
      return res
        .status(400)
        .json({ error: "All fields (name, email, position) are required." });
    }

    // Create a new employee in the database
    const employee = await Employee.create(req.body);

    // Send a confirmation email to the employee
    const mailOptions = {
      from: "s0067918@gmail.com", // Sender address
      to: Email, // Recipient address (from the request)
      subject: "Employee Registration Successful",
      text: `Dear ${firstName},\n\nYou have been successfully registered as an employee at ${company}. We look forward to working with you!`,
    };

    // Send the email using nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Return the created employee object in the response
    return res.status(201).json({
      message: "Employee registered successfully",
      employee,
    });
  } catch (err) {
    // Catch any errors and send a response with the error message
    console.error("Error in registering employee:", err);
    return res
      .status(500)
      .json({ error: "Failed to register employee. Please try again." + err });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
