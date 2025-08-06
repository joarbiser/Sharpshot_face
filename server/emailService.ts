import nodemailer from 'nodemailer';

// Email service for sending password reset emails
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure email transporter based on environment
    if (process.env.NODE_ENV === 'production') {
      // Production email configuration - using environment variables
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development - use console output for testing
      this.transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true
      } as any);
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@sharpshot.com',
      to: email,
      subject: 'Sharp Shot - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D8AC35, #E5C347); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Sharp Shot</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Sports Betting Analytics Platform</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #3B3B3D; margin-bottom: 20px;">Password Reset Request</h2>
            
            <p style="color: #666; margin-bottom: 20px;">
              We received a request to reset your password for your Sharp Shot account. 
              Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #D8AC35, #E5C347); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 6px; 
                        font-weight: bold;
                        display: inline-block;">
                Reset Your Password
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="color: #D8AC35; font-size: 14px; word-break: break-all; margin-bottom: 20px;">
              ${resetUrl}
            </p>
            
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
              <p style="color: #999; font-size: 12px; margin-bottom: 5px;">
                This password reset link will expire in 1 hour for security reasons.
              </p>
              <p style="color: #999; font-size: 12px; margin-bottom: 0;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </p>
            </div>
          </div>
          
          <div style="background: #3B3B3D; padding: 20px; text-align: center;">
            <p style="color: #D8AC35; margin: 0; font-size: 14px;">
              Sharp Shot - Professional Sports Betting Analytics
            </p>
          </div>
        </div>
      `,
      text: `
        Sharp Shot - Password Reset Request
        
        We received a request to reset your password for your Sharp Shot account.
        
        To reset your password, click on the following link:
        ${resetUrl}
        
        This link will expire in 1 hour for security reasons.
        
        If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
        
        Sharp Shot - Professional Sports Betting Analytics
      `
    };

    if (process.env.NODE_ENV === 'development') {
      // In development, log the email content instead of sending
      console.log('📧 Password Reset Email (Development Mode):');
      console.log(`To: ${email}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log('Email would be sent in production environment.');
    } else {
      // Send actual email in production
      await this.transporter.sendMail(mailOptions);
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true; // Always return true in development
      }
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();