import nodemailer from 'nodemailer';
import Twilio from 'twilio';

const emailTransporter = createEmailTransporter();
const twilioClient = createTwilioClient();

function createEmailTransporter() {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

function createTwilioClient() {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;
  return Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

export async function sendEmailNotification(toEmail, subject, html) {
  if (!emailTransporter) {
    console.warn('Email transporter not configured. Skipping email send.');
    return { success: false, reason: 'EMAIL_NOT_CONFIGURED' };
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const info = await emailTransporter.sendMail({
    from,
    to: toEmail,
    subject,
    html
  });

  return { success: true, info };
}

export async function sendSmsNotification(toPhone, message) {
  if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
    console.warn('Twilio not configured. Skipping SMS send.');
    return { success: false, reason: 'TWILIO_NOT_CONFIGURED' };
  }

  const sms = await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: toPhone
  });

  return { success: true, sid: sms.sid };
}
