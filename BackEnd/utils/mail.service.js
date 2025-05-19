import nodemailer from 'nodemailer';

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS
      }
    });
  }

  async sendVerificationEmail(toEmail, verificationLink) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'VotingX: Email Verification',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VotingX Email Verification</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
          }
          .logo {
            margin-bottom: 20px;
            width: 150px;
            height: auto;
          }
          .content {
            padding: 30px 20px;
            text-align: center;
          }
          .title {
            font-size: 24px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
          }
          .message {
            font-size: 16px;
            margin-bottom: 30px;
            color: #555;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            margin: 15px 0;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #2980b9;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
          }
          .support {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://via.placeholder.com/150x60?text=VotingX" alt="VotingX Logo" class="logo">
          </div>
          <div class="content">
            <h1 class="title">Verify Your Email Address</h1>
            <p class="message">Thank you for registering with VotingX. To complete your registration and access all features, please verify your email address.</p>
            <a href="${verificationLink}" class="button">Verify Email Address</a>
            <p class="message">If you did not create an account with VotingX, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 VotingX. All rights reserved.</p>
            <p class="support">Need help? Contact us at <a href="mailto:support@votingx.com">support@votingx.com</a></p>
          </div>
        </div>
      </body>
      </html>`
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent to:', toEmail);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }

  // Function to send password reset email
  async sendPasswordResetEmail(toEmail, resetToken) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'VotingX: Password Reset',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VotingX Password Reset</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
    }
    .logo {
      margin-bottom: 20px;
      width: 150px;
      height: auto;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 15px;
    }
    .message {
      font-size: 16px;
      margin-bottom: 30px;
      color: #555;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      margin: 15px 0;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #2980b9;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }
    .support {
      margin-top: 10px;
    }
    .security-note {
      font-size: 14px;
      color: #777;
      font-style: italic;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://via.placeholder.com/150x60?text=VotingX" alt="VotingX Logo" class="logo">
    </div>
    <div class="content">
      <h1 class="title">Reset Your Password</h1>
      <p class="message">We received a request to reset your password for your VotingX account. Click the button below to create a new password.</p>
      <a href="${resetToken}" class="button">Reset Password</a>
      <p class="message">If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
      <p class="security-note">For security reasons, this password reset link will expire in 24 hours.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 VotingX. All rights reserved.</p>
      <p class="support">Need help? Contact us at <a href="mailto:support@votingx.com">support@votingx.com</a></p>
    </div>
  </div>
</body>
</html>`
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent to:', toEmail);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}

export default mailService;