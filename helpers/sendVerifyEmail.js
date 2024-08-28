import nodemailer from "nodemailer";
import User from "../models/user.js";

const sendVerifyEmail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Secure port
      secure: true, // Use TLS
      auth: {
        user: process.env.EMAIL, // Use environment variables
        pass: process.env.PASSWORD, // Use environment variables
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Email",
      html: `<h1>Hi ${name}</h1>
             <p>Click on the link to verify your email</p>
             <a href="http://127.0.0.1:8000/api/users/verify?id=${user_id}">Click Here</a>`,
    };

    const result = await transporter.sendMail(mailOptions);
    if (!result) throw new Error("Unable to send Verify Mail");

    console.log("Verify Mail sent successfully", result.response);
  } catch (error) {
    console.error("Unable to send Verify Mail:", error.message);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const updatedInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { isVerified: true } }
    );

    if (!updatedInfo || updatedInfo.nModified === 0) {
      throw new Error("Unable to verify email or email already verified");
    }

    console.log("Email verified successfully", updatedInfo);
    res.status(200).send({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Unable to verify email:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to verify email",
    });
  }
};

export { sendVerifyEmail, verifyEmail };
