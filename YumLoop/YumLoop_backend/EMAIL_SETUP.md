# Email Setup Guide for Password Reset

## Backend Environment Configuration

Create a `.env` file in the `YumLoop_backend` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/yumloop

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Server Configuration
PORT=8000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
```

## Gmail App Password Setup

To use Gmail for sending emails, you need to create an App Password:

1. **Enable 2-Factor Authentication** on your Google account
2. **Go to Google Account Settings** → Security
3. **Generate App Password**:
   - Select "Mail" as the app
   - Select "Other" as the device
   - Enter a name like "YumLoop Backend"
   - Copy the generated 16-character password
4. **Use the App Password** in your `.env` file (not your regular Gmail password)

## Alternative Email Services

You can also use other email services by modifying the `emailService.js` file:

### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### For Custom SMTP:
```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## Testing Email Functionality

1. Start the backend server
2. Try the forgot password functionality
3. Check your email for the reset link
4. Check the console logs for any email errors

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**: Make sure you're using an App Password, not your regular password
2. **"Less secure app access"**: Enable 2FA and use App Passwords instead
3. **Email not sending**: Check the console logs for detailed error messages
4. **Frontend URL issues**: Make sure FRONTEND_URL matches your frontend URL exactly

### Debug Mode:

To see detailed email logs, add this to your `.env` file:
```env
DEBUG=nodemailer:*
```