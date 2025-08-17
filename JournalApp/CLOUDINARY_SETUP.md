# Cloudinary Setup for JournalApp

## What Changed
- Replaced Firebase Storage with Cloudinary for image storage
- Added Cloudinary dependencies to `build.gradle.kts`
- Created `CloudinaryHelper.java` for image uploads
- Created `CloudinaryConfig.java` for credentials
- Updated `AddJournalActivity.java` to use Cloudinary

## Setup Steps

### 1. Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

### 2. Get Your Credentials
1. Log into your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy your:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Update Your App
1. Open `app/src/main/java/com/mastercoding/journalapp/CloudinaryConfig.java`
2. Replace the placeholder values with your actual credentials:

```java
public static final String CLOUD_NAME = "your_actual_cloud_name";
public static final String API_KEY = "your_actual_api_key";
public static final String API_SECRET = "your_actual_api_secret";
```

### 4. Build and Run
1. Sync your project with Gradle files
2. Build and run your app

## How It Works
- When you add a journal entry with an image, it will:
  1. Upload the image to Cloudinary
  2. Get the secure URL of the uploaded image
  3. Save the journal entry to Firestore with the Cloudinary image URL
  4. Navigate to the journal list

## Benefits of Cloudinary
- **Free tier**: 25 GB storage, 25 GB bandwidth per month
- **Image transformations**: Resize, crop, filter images on-the-fly
- **CDN**: Fast global delivery
- **Easy integration**: Simple API
- **No Firebase Storage dependency**: Reduces Firebase costs

## Security Note
- Keep your API credentials secure
- Consider using environment variables for production
- The API secret should never be exposed in client-side code for production apps 