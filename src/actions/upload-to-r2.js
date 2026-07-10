'use server';

import { generateR2Key, uploadToR2, validateFileType, validateFileSize } from '@/lib/r2-utils';

/**
 * Server action to upload file to Cloudflare R2
 * @param {FormData} formData - Form data containing file and metadata
 * @returns {Promise<Object>} - Upload result with URL and metadata
 */
export async function uploadFileToR2(formData) {
    try {
        const file = formData.get('file');
        const documentType = formData.get('documentType') || 'note';

        if (!file) {
            return {
                success: false,
                error: 'No file provided',
            };
        }

        // Validate file type
        const typeValidation = validateFileType(file);
        if (!typeValidation.valid) {
            return {
                success: false,
                error: typeValidation.error,
            };
        }

        // Validate file size (50MB max)
        const sizeValidation = validateFileSize(file, 50);
        if (!sizeValidation.valid) {
            return {
                success: false,
                error: sizeValidation.error,
            };
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate unique key with folder structure
        const key = generateR2Key(documentType, file.name);

        // Upload to R2
        const uploadResult = await uploadToR2(buffer, key, file.type);

        if (!uploadResult.success) {
            return {
                success: false,
                error: uploadResult.error,
            };
        }

        return {
            success: true,
            url: uploadResult.url,
            key: uploadResult.key,
            metadata: {
                originalName: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString(),
            },
        };
    } catch (error) {
        console.error('Upload to R2 error:', error);
        return {
            success: false,
            error: 'Failed to upload file. Please try again.',
        };
    }
}
