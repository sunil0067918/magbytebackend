const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  Hiref,
  Employee,
  Contact,
  Inqueryform,
  Consultionform,
} = require("./Modals/Modals");

const nodemailer = require("nodemailer");n
const app = express();
app.use(express.json());
app.use(cors());


app.use(
  cors({
    origin: ["http://localhost:3001", "http://145.223.21.29/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://sunil1234:Sunilmehra1234@cluster0.gg8va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "s0067918@gmail.com",
    pass: "wvia ufem tzno ecxk",
  },
});

app.post("/register", async (req, res) => {
  try {
    const { company, Email, firstName, requriement, number } = req.body;
    if (!firstName || !Email || !number || !company || !requriement) {
      return res
        .status(400)
        .json({ error: "All fields (name, email, position) are required." });
    }
    const employee = await Employee.create(req.body);
    const mailOptions = {
      from: "s0067918@gmail.com",
      to: Email,
      subject: "Employee Registration Successful",
      text: `Dear ${firstName},\n\nYou have been successfully registered as an employee at ${company}. We look forward to working with you!`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return res.status(201).json({
      message: " customer registered successfully",
      employee,
    });
  } catch (err) {
    console.error("Error in registering  Customer:", err);
    return res
      .status(500)
      .json({ error: "Failed to register Customer. Please try again." + err });
  }
});

// second form  //
app.post("/hireresister", async (req, res) => {
  try {
    const { fullName, email, phone, jobposition } = req.body;
    if (!fullName || !email || !phone || !jobposition) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newJobApplication = new Hiref({
      fullName,
      email,
      phone,
      jobposition,
    });
    const href = await newJobApplication.save();
    const mailOptionshire = {
      from: "s0067918@gmail.com",
      to: email,
      subject: "Employee Registration Successful",
      text: `Dear ${fullName},\n\n  Your resume has been shortlisted. The HR team will contact you soon`,
    };

    transporter.sendMail(mailOptionshire, (error, info) => {
      if (error) {
        console.log("email sending message", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      message: "The HR team will reach out to you shortly",
      href,
      status: true,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error processing the job application", status: false });
  }
});

// third Form api / /

app.post("/contactregister", async (req, res) => {
  try {
    const { Firstname, Contactemail, Contactnumber, textareamessage } =
      req.body;
    if (!Firstname || !Contactemail || !Contactnumber || !textareamessage) {
      return res.status(400).json({ error: "all fieldare required " });
    }
    const newJobApplicationContact = new Contact({
      Firstname,
      Contactemail,
      Contactnumber,
      textareamessage,
    });
    const Contactf = await newJobApplicationContact.save();

    const mailOptionsContact = {
      from: "s0067918@gmail.com",
      to: Contactemail,
      subject: "Employee Registration Successful",
      text: `Dear sir ,  ${Firstname},\n\n  our team contact you  `,
    };

    transporter.sendMail(mailOptionsContact, (error, info) => {
      if (error) {
        console.log("email sending message ", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.status(201).json({
      message: " our team Contact you",
      Contactf,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: " Error processing the job application", status: false });
  }
});

// forth Form  ///
app.post("/inquerform", async (req, res) => {
  try {
    const {
      inquryfirstname,
      inqueryemail,
      inquerylastname,
      inqueynumber,
      inqurymessage,
    } = req.body;

    if (
      !inquryfirstname ||
      !inqueryemail ||
      !inquerylastname ||
      !inqueynumber ||
      !inqurymessage
    ) {
      return res.status(400).json({ error: "all field are required" });
    }

    const newJobApplicationInquery = new Inqueryform({
      inquryfirstname,
      inqueryemail,
      inquerylastname,
      inqueynumber,
      inqurymessage,
    });
    const Inqueryf = await newJobApplicationInquery.save();

    res.status(201).json({
      message: " our team contact you",
      Inqueryf,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: " Error processing the job application", status: false });
  }
});

app.post("/Consultresister", async (req, res) => {
  try {
    const {
      Consultationfirstname,
      Consultationemail,
      Consultationnumber,
      Consultationmessage,
    } = req.body;

    if (
      !Consultationfirstname ||
      !Consultationemail ||
      !Consultationnumber ||
      !Consultationmessage
    ) {
      return res.status(400).json({ error: "all field are required" });
    }

    const newJobApplicationConsult = new Consultionform({
      Consultationfirstname,
      Consultationemail,
      Consultationnumber,
      Consultationmessage,
    });
    const Consult = await newJobApplicationConsult.save();

    res.status(201).json({
      message: " our team contact you",
      Consult,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: " Error processing the job application", status: false });
  }
});



app.listen(3000, () => {
  console.log("server is running");
});
