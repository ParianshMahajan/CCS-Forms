const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const EmailUser=process.env.EmailUser;
const EmailPassword=process.env.EmailPassword;

module.exports.sendMail = async function sendMail(email,str,otp){

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EmailUser,
        pass: EmailPassword,
      },
    });

    // Define the email options
    let mailOptions = {
      from: EmailUser,
      to: email,
      subject: 'CCS Registrations',
      text: `YOU HAVE BEEN REGISTERED SUCCESSFULLY`
    }

    if(str=="OTP"){
      mailOptions.subject="Registeration Admin Portal";
      mailOptions.text=`YOUR REGISTERATION OTP IS :: ${otp}`;
    }


    try {
        
        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
              console.error('Error:', error);
            } else {
              console.log('Email sent:', info.response);
            }
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
