import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

require("dotenv").config();

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: { user: process.env.SMTP_MAIL, pass: process.env.SMTP_PASSWORD },
  });

  const { email, subject, template, data } = options;

  const templatePath = path.join(__dirname, "..", "mails", template);

  //   Render email template với EJS
  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: "Booking Care <support@bookingcare.vn>",
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export const sendMailWithAttachment = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: { user: process.env.SMTP_MAIL, pass: process.env.SMTP_PASSWORD },
  });

  const { email, subject, template, data, attachments } = options;

  const templatePath = path.join(__dirname, "..", "mails", template);

  //   Render email template với EJS
  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: "Booking Care <support@bookingcare.vn>",
    to: email,
    subject,
    html,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};
