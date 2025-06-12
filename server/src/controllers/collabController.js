import nodemailer from 'nodemailer';

export const createCollab = async (req, res) => {
  try {
    const { name, email, type, message, github } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_COLLAB_PASS  
      }
    });

    const mailOptions = {
      from: `"Collab Request 👨‍💻" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL, 
      subject: `🤝 New Collaboration: ${type}`,
      html: `
        <h2>New Collaboration Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        ${github ? `<p><strong>GitHub:</strong> <a href="${github}">${github}</a></p>` : ''}
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Collaboration request sent successfully' });

  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ error: 'Failed to send collaboration request' });
  }
};
