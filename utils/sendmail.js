var nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure:true,
  host:'smtp.gmail.com',
  port:465,
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_KEY,
  }
});

 function send_mail(to,sub,msg)
{
    console.log("placing")
    var mailOptions = {
        from: process.env.NODEMAILER_MAIL,
        to:to,
        subject:sub,
        text: msg
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


}

module.exports = send_mail



