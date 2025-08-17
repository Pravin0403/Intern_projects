package com.mastercoding.journalapp;

import android.content.Context;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;

/**
 * Glide configuration optimized for Cloudinary images
 * Provides methods for loading images with different transformations
 */
public class GlideConfig {

    /**
     * Load image from Cloudinary with default settings
     */
    public static void loadImage(Context context, String imageUrl, ImageView imageView) {
        Glide.with(context)
                .load(imageUrl)
                .apply(getDefaultRequestOptions())
                .into(imageView);
    }

    /**
     * Load image with custom size transformation
     * Useful for optimizing image loading
     */
    public static void loadImageWithSize(Context context, String imageUrl, ImageView imageView, int width, int height) {
        // Add Cloudinary transformation parameters to URL
        String optimizedUrl = CloudinaryUrlHelper.addSizeTransformation(imageUrl, width, height);
        
        Glide.with(context)
                .load(optimizedUrl)
                .apply(getDefaultRequestOptions())
                .into(imageView);
    }

    /**
     * Load image with rounded corners
     */
    public static void loadImageWithRoundedCorners(Context context, String imageUrl, ImageView imageView, int cornerRadius) {
        Glide.with(context)
                .load(imageUrl)
                .apply(getDefaultRequestOptions())
                .transform(new com.bumptech.glide.load.resource.bitmap.RoundedCorners(cornerRadius))
                .into(imageView);
    }

    /**
     * Load image with placeholder and error handling
     */
    public static void loadImageWithPlaceholder(Context context, String imageUrl, ImageView imageView, int placeholderResId, int errorResId) {
        Glide.with(context)
                .load(imageUrl)
                .apply(getDefaultRequestOptions())
                .placeholder(placeholderResId)
                .error(errorResId)
                .into(imageView);
    }

    /**
     * Get default request options for Cloudinary images
     */
    private static RequestOptions getDefaultRequestOptions() {
        return new RequestOptions()
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .centerCrop()
                .timeout(30000); // 30 seconds timeout
    }



    /**
     * Clear Glide cache (useful for debugging or memory management)
     */
    public static void clearCache(Context context) {
        Glide.get(context).clearMemory();
        new Thread(() -> {
            Glide.get(context).clearDiskCache();
        }).start();
    }
} 