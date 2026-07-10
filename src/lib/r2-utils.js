import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from './r2-config';

/**
 * Generate R2 storage key with organized folder structure
 * @param {string} documentType - Type of document (note, book, handout, etc.)
 * @param {string} filename - Original filename
 * @returns {string} - Storage key with folder structure
 */
export function generateR2Key(documentType, filename) {
    const sanitized = sanitizeFilename(filename);
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);

    // Create unique filename: timestamp-random-originalname.ext
    const uniqueFilename = `${timestamp}-${randomStr}-${sanitized}`;

    // Organize by document type: /note/file.pdf, /book/file.pdf, etc.
    return `${documentType}/${uniqueFilename}`;
}

/**
 * Sanitize filename for safe storage
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
export function sanitizeFilename(filename) {
    return filename
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9.-]/g, '') // Remove special characters
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .substring(0, 100); // Limit length
}

/**
 * Get public CDN URL for an R2 object
 * @param {string} key - R2 object key
 * @returns {string} - Public CDN URL
 */
export function getR2PublicUrl(key) {
    return `${R2_CONFIG.publicUrl}/${key}`;
}

/**
 * Get download URL for an R2 object (same as public URL for R2)
 * @param {string} key - R2 object key
 * @returns {string} - Download URL
 */
export function getR2DownloadUrl(key) {
    return getR2PublicUrl(key);
}

/**
 * Validate file type for document uploads
 * @param {File} file - File object to validate
 * @returns {Object} - { valid: boolean, error?: string }
 */
export function validateFileType(file) {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const allowedExtensions = ['.pdf', '.doc', '.docx'];

    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        return {
            valid: false,
            error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.',
        };
    }

    return { valid: true };
}

/**
 * Validate file size
 * @param {File} file - File object to validate
 * @param {number} maxSizeMB - Maximum size in MB (default 50MB)
 * @returns {Object} - { valid: boolean, error?: string }
 */
export function validateFileSize(file, maxSizeMB = 50) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File size exceeds ${maxSizeMB}MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        };
    }

    return { valid: true };
}

/**
 * Upload file to R2 storage
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} key - Storage key
 * @param {string} contentType - MIME type
 * @returns {Promise<Object>} - Upload result with URL
 */
export async function uploadToR2(fileBuffer, key, contentType) {
    try {
        const command = new PutObjectCommand({
            Bucket: R2_CONFIG.bucketName,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
        });

        await r2Client.send(command);

        return {
            success: true,
            url: getR2PublicUrl(key),
            key,
        };
    } catch (error) {
        console.error('R2 upload error:', error);
        return {
            success: false,
            error: error.message || 'Failed to upload file to R2',
        };
    }
}

/**
 * Check if URL is an R2 URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if R2 URL
 */
export function isR2Url(url) {
    if (!url) return false;
    return url.includes(R2_CONFIG.publicUrl) || url.includes('.r2.dev') || url.includes('.r2.cloudflarestorage.com');
}

/**
 * Extract R2 key from URL
 * @param {string} url - R2 URL
 * @returns {string|null} - Extracted key or null
 */
export function extractR2Key(url) {
    if (!isR2Url(url)) return null;

    try {
        const urlObj = new URL(url);
        // Remove leading slash
        return urlObj.pathname.substring(1);
    } catch (error) {
        return null;
    }
}
