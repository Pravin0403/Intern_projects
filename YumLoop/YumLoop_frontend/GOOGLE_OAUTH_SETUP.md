# Google OAuth Setup Guide

## Frontend Setup

1. Create a `.env` file in the `YumLoop_frontend` directory with the following variables:

```env
# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000/api

# Socket Configuration
REACT_APP_SOCKET_URL=http://localhost:8000
```

## Backend Setup

1. Create a `.env` file in the `YumLoop_backend` directory with:

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

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

2. Install the Google Auth Library:
```bash
cd YumLoop_backend
npm install google-auth-library
```

## Google OAuth Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Set the application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret
8. Add them to both frontend and backend `.env` files

## Features Implemented

### Google OAuth
- **Complete OAuth Flow**: Authorization code exchange with Google
- **User Creation/Login**: Automatic user creation for new Google users
- **Profile Sync**: Syncs name, email, and profile picture from Google
- **Secure Token Handling**: Proper JWT token generation and validation
- **Error Handling**: Comprehensive error handling and user feedback

### Forgot Password
- **Email-based password reset** with secure token generation
- **HTML email templates** with YumLoop branding
- **Token expiration** (10 minutes) for security
- **User-friendly success/error messages**

### Reset Password
- **Token-based password reset** with validation
- **Password confirmation** and strength validation
- **Automatic redirect** to login after success

## Testing

### Test Google OAuth:
1. Start both frontend and backend servers
2. Click the Google button on login/signup pages
3. Complete the Google OAuth flow
4. Verify user is logged in and redirected to home

### Test Password Reset:
1. Click "Forgot your password?" on login page
2. Enter your email address
3. Check your email for the reset link
4. Click the link and set a new password

## Troubleshooting

### Google OAuth Issues:
1. **"Invalid client"**: Check that Client ID matches in both frontend and backend
2. **"Redirect URI mismatch"**: Ensure redirect URI exactly matches Google Console
3. **"Invalid grant"**: Authorization code expired, try again
4. **"Popup blocked"**: Allow popups for your domain

### Email Issues:
1. **"Missing credentials"**: Set up Gmail App Password correctly
2. **"Authentication failed"**: Use App Password, not regular password
3. **Email not received**: Check spam folder and email configuration

### General Issues:
1. **Environment variables**: Ensure all required variables are set
2. **Database connection**: Check MongoDB connection
3. **Port conflicts**: Ensure ports 8000 (backend) and 5173 (frontend) are available

## Security Notes

- **Never commit `.env` files** to version control
- **Use App Passwords** for Gmail, not regular passwords
- **Enable 2FA** on Google account for App Passwords
- **Use HTTPS** in production for secure OAuth flow
- **Validate tokens** on both frontend and backend
- **Implement rate limiting** for OAuth endpoints in production 