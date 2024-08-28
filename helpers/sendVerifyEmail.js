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

    const baseUrl = process.env.BASE_URL || "http://127.0.0.1:8000"; 

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email - Konnect",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://konnect-dashboard-frontend.vercel.app/static/media/light.ec426defdd7d4b90064b.png" alt="Konnect" style="width: 100px; background-color:#06183d">
          </div>
          <div style="background-color: #f7f7f7; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; text-align: center;">Welcome to Konnect, ${name}!</h2>
            <p style="font-size: 16px; color: #666; text-align: center;">
              You're just one step away from joining our community of mentors and students. Please verify your email address to get started.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/api/users/verify?id=${user_id}" 
                 style="background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                 Verify Email
              </a>
            </div>
            <p style="font-size: 14px; color: #999; text-align: center;">
              If you did not create an account, please ignore this email.
            </p>
          </div>
          <div style="text-align: center; padding-top: 20px;">
            <p style="font-size: 14px; color: #999;">
              © 2024 Konnect. All rights reserved.
            </p>
            <p style="font-size: 14px; color: #999;">
              <a href="${baseUrl}/privacy-policy" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a> | 
              <a href="${baseUrl}/terms-of-service" style="color: #4CAF50; text-decoration: none;">Terms of Service</a>
            </p>
          </div>
        </div>
      `,
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
