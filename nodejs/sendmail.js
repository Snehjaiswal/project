var nodemailer = require('nodemailer');
const user = require('./connect')
var transporter = nodemailer.createTransport({
  host : "tls://smtp.gmail.com",
  service: 'gmail',
  port:587,
  auth: {
    user: 'anmol.r@zecdata.com',
    pass: 'gjzdqysldrgrcxge'
  }
});

function sendVerificationMail(to, url, text) {
  console.log("to",to);
  const mailOptions = {
    from: 'anmol.r@zecdata.com',
    to: to,
    subject: "Email Verification",
    html: `
  		<div style="max-width: 500px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
  			<h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome!!!</h2>
              <h3 style="text-align: center; text-transform: uppercase;color: teal;">to zecdata! 😍 </h3>
  			<a  style="color: black; padding: 40px 20px; margin: 10px 10; display: inline-block;"></a>
  		</div>`,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
module.exports = {
  sendVerificationMail,
};
