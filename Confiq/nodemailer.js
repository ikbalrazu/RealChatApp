const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "iqbalraju123@gmail.com",
      pass: "hiecmizjnqytqast"
    }
})

module.exports = transporter;