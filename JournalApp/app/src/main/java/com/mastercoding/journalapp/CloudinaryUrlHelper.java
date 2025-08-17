package com.mastercoding.journalapp;

/**
 * Utility class for Cloudinary URL transformations
 * Helps optimize images for different use cases
 */
public class CloudinaryUrlHelper {

    /**
     * Add width and height transformation to Cloudinary URL
     */
    public static String addSizeTransformation(String originalUrl, int width, int height) {
        if (originalUrl == null || !originalUrl.contains("cloudinary.com")) {
            return originalUrl;
        }

        if (originalUrl.contains("/upload/")) {
            String transformation = String.format("w_%d,h_%d,c_fill/", width, height);
            return originalUrl.replace("/upload/", "/upload/" + transformation);
        }

        return originalUrl;
    }

    /**
     * Add quality transformation to Cloudinary URL
     */
    public static String addQualityTransformation(String originalUrl, int quality) {
        if (originalUrl == null || !originalUrl.contains("cloudinary.com")) {
            return originalUrl;
        }

        if (originalUrl.contains("/upload/")) {
            String transformation = String.format("q_%d/", quality);
            return originalUrl.replace("/upload/", "/upload/" + transformation);
        }

        return originalUrl;
    }

    /**
     * Add format transformation (e.g., auto for automatic format selection)
     */
    public static String addFormatTransformation(String originalUrl, String format) {
        if (originalUrl == null || !originalUrl.contains("cloudinary.com")) {
            return originalUrl;
        }

        if (originalUrl.contains("/upload/")) {
            String transformation = String.format("f_%s/", format);
            return originalUrl.replace("/upload/", "/upload/" + transformation);
        }

        return originalUrl;
    }

    /**
     * Create optimized URL for thumbnails
     */
    public static String createThumbnailUrl(String originalUrl, int size) {
        return addSizeTransformation(originalUrl, size, size);
    }

    /**
     * Create optimized URL for profile pictures
     */
    public static String createProfilePictureUrl(String originalUrl, int size) {
        String sizedUrl = addSizeTransformation(originalUrl, size, size);
        return addQualityTransformation(sizedUrl, 80);
    }

    /**
     * Create optimized URL for full-size images
     */
    public static String createFullSizeUrl(String originalUrl, int maxWidth) {
        if (originalUrl == null || !originalUrl.contains("cloudinary.com")) {
            return originalUrl;
        }

        if (originalUrl.contains("/upload/")) {
            String transformation = String.format("w_%d,c_scale/", maxWidth);
            return originalUrl.replace("/upload/", "/upload/" + transformation);
        }

        return originalUrl;
    }

    /**
     * Check if URL is a valid Cloudinary URL
     */
    public static boolean isCloudinaryUrl(String url) {
        return url != null && url.contains("cloudinary.com");
    }
} 