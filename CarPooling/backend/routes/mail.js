const express = require('express');
const mail = express.Router();
const MailController = require('../controllers/nodemailer.controller');

// POST route to send feedback
mail.post("/sendfeedback", MailController.sendMail);

module.exports = mail;
