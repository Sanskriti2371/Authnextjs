import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // ✅ better token
    const token = crypto.randomBytes(32).toString("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const actionUrl =
      emailType === "VERIFY"
        ? `${process.env.domain}/verifyemail?token=${token}`
        : `${process.env.domain}/resetpassword?token=${token}`;

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>
      Click <a href="${actionUrl}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } <br/>
      ${actionUrl}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    console.log("✅ Mail sent");
    return mailresponse;
  } catch (error: any) {
    console.log("❌ Email error:", error.message);
    throw new Error(error.message);
  }
};
