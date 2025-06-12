import { transporter } from "../config/nodemailer.js";

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Message",
      html: `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${req.body.phone || "N/A"}</p>
  <p><strong>Company:</strong> ${req.body.company || "N/A"}</p>
  <p><strong>Services:</strong> ${
    (req.body.services || []).join(", ") || "N/A"
  }</p>
  <p><strong>Budget:</strong> ${req.body.budget || "N/A"}</p>
  <p><strong>Urgent:</strong> ${req.body.urgent ? "Yes" : "No"}</p>
  <p><strong>Message:</strong><br/> ${message}</p>
  <hr/>
  <p><small>Sent from Arpit’s Portfolio Contact Form</small></p>
`,

      replyTo: email,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message.", error });
  }
};
