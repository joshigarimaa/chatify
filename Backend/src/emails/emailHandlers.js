const { resendClient, sender } = require("../lib/resend");
const { welcomeEmailTemplate } = require("./emailTemplate");

const sendWelcomeEmail = async (email, name, clientUrl) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: welcomeEmailTemplate(name, clientUrl),
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (err) {
    console.error("Email sending failed:", err);
    return null;
  }
};

module.exports = sendWelcomeEmail;
