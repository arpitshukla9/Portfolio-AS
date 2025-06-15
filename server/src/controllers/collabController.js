import nodemailer from 'nodemailer';

export const createCollab = async (req, res) => {
  try {
    const { name, email, type, message, github, linkedin } = req.body;

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

    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: `"Collab Request 👨‍💻" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `🤝 New ${type} Collaboration Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .header {
                    background: linear-gradient(135deg, #6e8efb, #a777e3);
                    color: white;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                }
                .content {
                    background: white;
                    padding: 25px;
                    border-radius: 0 0 8px 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .details {
                    margin: 20px 0;
                    padding: 15px;
                    background: #f5f7fa;
                    border-left: 4px solid #6e8efb;
                    border-radius: 0 4px 4px 0;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                }
                h1 {
                    margin: 0;
                    font-size: 24px;
                }
                h2 {
                    color: #6e8efb;
                    margin-top: 0;
                }
                a {
                    color: #6e8efb;
                    text-decoration: none;
                    font-weight: 500;
                }
                a:hover {
                    text-decoration: underline;
                }
                .social-badge {
                    display: inline-block;
                    background: #f0f4f8;
                    padding: 8px 12px;
                    border-radius: 20px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    font-size: 14px;
                }
                .message {
                    white-space: pre-wrap;
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 4px;
                    border: 1px solid #e9ecef;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>✨ New Collaboration Request</h1>
                <p>${currentDate}</p>
            </div>
            
            <div class="content">
                <h2>👋 Hello there!</h2>
                <p>You've received a new collaboration request from:</p>
                
                <div class="details">
                    <p><strong>👤 Name:</strong> ${name}</p>
                    <p><strong>✉️ Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>🏷️ Type:</strong> ${type || 'N/A'}</p>

                    ${github ? `
                        <div class="social-badge">
                            <strong>💻 GitHub:</strong> 
                            <a href="${github}" target="_blank">View Profile</a>
                        </div>
                    ` : ''}

                    ${linkedin ? `
                        <div class="social-badge">
                            <strong>🔗 LinkedIn:</strong> 
                            <a href="${linkedin}" target="_blank">View Profile</a>
                        </div>
                    ` : ''}
                </div>
                
                <h3>📝 Message:</h3>
                <div class="message">
                    ${message.replace(/\n/g, '<br>')}
                </div>
                
                <p style="margin-top: 25px;">
                    <a href="mailto:${email}" style="background: #6e8efb; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">
                        Reply to ${name.split(' ')[0]}
                    </a>
                </p>
                
                <div class="footer">
                    <p>This request was sent via your portfolio contact form.</p>
                    <p>💡 Tip: Reply within 24-48 hours for best engagement!</p>
                </div>
            </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Collaboration request sent successfully' });

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Collab Email Error:', error.message);
    }
    res.status(500).json({ error: 'Failed to send collaboration request' });
  }
};
