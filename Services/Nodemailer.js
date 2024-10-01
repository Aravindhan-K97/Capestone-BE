import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//Function to send mail to reset password using a third party package Node Mailer
export const sendLink = async (email, token, employeeId) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.PASSMAIL,
      pass: process.env.PASSKEY,
    },
  });
  async function main(req, res) {
    try {
      const info = await transporter.sendMail({
        from: process.env.PASSMAIL,
        to: email,
        subject: "Reset Password",
        text: `https://lambent-kulfi-76a377.netlify.app/resetpw/${employeeId}/${token}`,
        html: `<p>A request is made to reset your password. If it is made by you click the following link to proceed: <a href="https://lambent-kulfi-76a377.netlify.app/resetpw/${employeeId}/${token}">Reset Password</a>. If it is not done by you, ignore the mail.</p>`,
      });
      console.log("Mail Sent Successfully");
    } catch (error) {
      console.log(error);
      console.log("Internal Server Error Unable to Sent Mail");
    }
  }
  main();
};
