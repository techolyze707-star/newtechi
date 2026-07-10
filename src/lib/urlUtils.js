// Utility functions for handling different file URL types

/**
 * Convert Google Drive share URL to direct download URL
 * @param {string} url - Google Drive share URL
 * @returns {string} - Direct download URL or original URL if not Google Drive
 */
export function convertGoogleDriveUrl(url) {
  if (!url) return url;

  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Return direct download URL for Google Drive that forces download
      return `https://drive.google.com/uc?export=download&id=${fileId}&confirm=1`;
    }
  }

  // Check if it's already a Google Drive direct link
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }

  return url;
}

/**
 * Convert Google Drive URL to embeddable preview URL
 * @param {string} url - Google Drive share URL
 * @returns {string} - Embeddable preview URL or original URL
 */
export function convertGoogleDrivePreviewUrl(url) {
  if (!url) return url;

  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Return embeddable preview URL for Google Drive
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  // Check if it's already a preview URL
  if (url.includes('/preview')) {
    return url;
  }

  return url;
}

/**
 * Check if URL is a Google Drive URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if Google Drive URL
 */
export function isGoogleDriveUrl(url) {
  return url && url.includes('drive.google.com');
}

/**
 * Check if URL is an R2 URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if R2 URL
 */
export function isR2Url(url) {
  if (!url) return false;
  return url.includes('.r2.dev') || url.includes('.r2.cloudflarestorage.com');
}

/**
 * Get the appropriate URL for PDF preview based on the source
 * @param {string} url - Original file URL
 * @returns {object} - Object with preview URL and type information
 */
export function getPdfPreviewInfo(url) {
  if (!url) {
    return { previewUrl: null, type: 'unknown', canPreview: false };
  }

  // Check for R2 URLs first
  if (isR2Url(url)) {
    return {
      previewUrl: url,
      downloadUrl: url,
      type: 'r2',
      canPreview: true,
      requiresIframe: false
    };
  }

  if (isGoogleDriveUrl(url)) {
    return {
      previewUrl: convertGoogleDrivePreviewUrl(url),
      downloadUrl: convertGoogleDriveUrl(url),
      type: 'googledrive',
      canPreview: true,
      requiresIframe: true
    };
  }

  // For direct PDF URLs
  if (url.toLowerCase().endsWith('.pdf') || url.includes('pdf')) {
    return {
      previewUrl: url,
      downloadUrl: url,
      type: 'direct',
      canPreview: true,
      requiresIframe: false
    };
  }

  // For other URLs, assume they can be previewed
  return {
    previewUrl: url,
    downloadUrl: url,
    type: 'other',
    canPreview: true,
    requiresIframe: true
  };
}