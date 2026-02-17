const { Resend } = require("resend");
const ENV = require("./env");
// ⚠️ dotenv should ideally be required once in server.js
// require("dotenv").config();

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

const resendClient = new Resend(ENV.RESEND_API_KEY);

const sender = {
  email: ENV.EMAIL_FROM || "onboarding@resend.dev",
  name: ENV.EMAIL_FROM_NAME || "ChatApp",
};

module.exports = { resendClient, sender };
