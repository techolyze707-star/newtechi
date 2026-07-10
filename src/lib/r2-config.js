import { S3Client } from '@aws-sdk/client-s3';

// Cloudflare R2 Configuration
const R2_ACCOUNT_ID = '6b5e58e422a2a6066b34b07c2db04eb5';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '9a1bb15b711a5cc308d03bf64da4c4e5';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'c91c90576744bf68910278d4c2fcc521c3017516619e87939a165d7d704c20b4';
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'Techolyze-docs';
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Public CDN URL for serving files (configure custom domain or use R2.dev)
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || `https://pub-${R2_ACCOUNT_ID}.r2.dev`;

// Validate required credentials
if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.warn('⚠️  R2 credentials not configured. File uploads will not work.');
}

// Configure S3 client for Cloudflare R2
export const r2Client = new S3Client({
    region: 'auto', // R2 uses 'auto' for region
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

export const R2_CONFIG = {
    bucketName: R2_BUCKET_NAME,
    publicUrl: R2_PUBLIC_URL,
    endpoint: R2_ENDPOINT,
    accountId: R2_ACCOUNT_ID,
};

export default r2Client;
