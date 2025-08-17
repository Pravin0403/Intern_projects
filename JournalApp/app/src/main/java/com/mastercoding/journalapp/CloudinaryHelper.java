package com.mastercoding.journalapp;

import android.content.Context;
import android.net.Uri;
import android.util.Log;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.Map;

public class CloudinaryHelper {
    private static final String TAG = "CloudinaryHelper";
    private Cloudinary cloudinary;

    public CloudinaryHelper() {
        // Initialize Cloudinary with your credentials
        Map config = ObjectUtils.asMap(
                "cloud_name", CloudinaryConfig.CLOUD_NAME,
                "api_key", CloudinaryConfig.API_KEY,
                "api_secret", CloudinaryConfig.API_SECRET
        );
        cloudinary = new Cloudinary(config);
    }

    public interface UploadCallback {
        void onSuccess(String imageUrl);
        void onError(String error);
    }

    public void uploadImage(Context context, Uri imageUri, UploadCallback callback) {
        new Thread(() -> {
            try {
                // Upload the image to Cloudinary
                Map result = cloudinary.uploader().upload(
                        imageUri.getPath(),
                        ObjectUtils.asMap(
                                "public_id", "journal_" + System.currentTimeMillis(),
                                "folder", "journal_app",
                                "resource_type", "image"
                        )
                );

                // Get the secure URL of the uploaded image
                String imageUrl = (String) result.get("secure_url");
                
                Log.d(TAG, "Image uploaded successfully: " + imageUrl);
                
                // Call the success callback on the main thread
                ((android.app.Activity) context).runOnUiThread(() -> {
                    callback.onSuccess(imageUrl);
                });

            } catch (IOException e) {
                Log.e(TAG, "Error uploading image: " + e.getMessage());
                ((android.app.Activity) context).runOnUiThread(() -> {
                    callback.onError("Failed to upload image: " + e.getMessage());
                });
            } catch (Exception e) {
                Log.e(TAG, "Unexpected error uploading image: " + e.getMessage());
                ((android.app.Activity) context).runOnUiThread(() -> {
                    callback.onError("Unexpected error: " + e.getMessage());
                });
            }
        }).start();
    }
} 