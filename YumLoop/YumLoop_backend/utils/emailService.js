import nodemailer from 'nodemailer';

// Validate email configuration
const validateEmailConfig = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return false;
  }
  return true;
};

// Create transporter
const createTransporter = () => {
  if (!validateEmailConfig()) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - YumLoop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your YumLoop account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to YumLoop!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Welcome to YumLoop!</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Welcome to YumLoop! We're excited to have you join our community of food lovers, shoppers, and social enthusiasts.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              With YumLoop, you can:
            </p>
            
            <ul style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              <li>Order delicious food from local restaurants</li>
              <li>Shop for groceries and household items</li>
              <li>Connect with friends and share your food experiences</li>
              <li>Discover new restaurants and products</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block; 
                        font-weight: bold;">
                Start Exploring
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If you have any questions or need help getting started, feel free to reach out to our support team.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Happy exploring!
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              The YumLoop Team
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              This is an automated email from YumLoop. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}; 