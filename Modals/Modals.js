const mongoose = require("mongoose");
const ConsultationFormSchema = new mongoose.Schema({
  inquryfirstname: {
    type: String,
    require: true,
  },

  inqueryemail: {
    type: String,
    require: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },

  inqueynumber: {
    type: Number,
    require: true,
    match: [
      /^\+?\d{1,4}?[.\-\s]?\(?\d{1,3}?\)?[.\-\s]?\d{1,4}[.\-\s]?\d{1,4}$/,
      "Please fill a valid phone number",
    ],
  },
  inqurymessage: {
    type: String,
    require: true,
  },
  inquerylastname: {
    type: String,
    require: true,
  }
});



const inquerFormSchema = new mongoose.Schema({
  inquryfirstname: {
    type: String,
    require: true,
  },

  inqueryemail: {
    type: String,
    require: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },

  inqueynumber: {
    type: Number,
    require: true,
    match: [
      /^\+?\d{1,4}?[.\-\s]?\(?\d{1,3}?\)?[.\-\s]?\d{1,4}[.\-\s]?\d{1,4}$/,
      "Please fill a valid phone number",
    ],
  },
  inqurymessage: {
    type: String,
    require: true,
  },
  inquerylastname: {
    type: String,
    require: true,
  }
});

const contactFormSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    require: true,
  },

  Contactemail: {
    type: String,
    require: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },

  Contactnumber: {
    type: Number,
    require: true,
    match: [
      /^\+?\d{1,4}?[.\-\s]?\(?\d{1,3}?\)?[.\-\s]?\d{1,4}[.\-\s]?\d{1,4}$/,
      "Please fill a valid phone number",
    ],
  },
  textareamessage: {
    type: String,
    require: true,
  },
});

const hireform = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  jobposition: {
    type: String,
    required: true,
  },
});

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
});

module.exports = {
  Hiref: mongoose.model("Hiref", hireform),
  Employee: mongoose.model("Employee", employeeSchema),
  Contact: mongoose.model("Contact", contactFormSchema),
  Inqueryform : mongoose.model("Inquery" , inquerFormSchema),
  Consultionform  :  mongoose.model("Consultionform" ,  ConsultationFormSchema ) 
};
