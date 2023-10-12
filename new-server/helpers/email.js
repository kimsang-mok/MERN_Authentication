import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    transporter.sendMail(emailData, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    console.log("Problem occurred while sending the email:", err);
  }

  res.send("Signup successful! Please check your email for verification.");
};
