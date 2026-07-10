'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';

/**
 * File upload component with drag-and-drop support
 * @param {Object} props
 * @param {File|null} props.file - Currently selected file
 * @param {Function} props.onFileSelect - Callback when file is selected
 * @param {Function} props.onFileRemove - Callback when file is removed
 * @param {boolean} props.disabled - Whether upload is disabled
 * @param {number} props.progress - Upload progress (0-100)
 */
export default function FileUploadZone({ file, onFileSelect, onFileRemove, disabled = false, progress = 0 }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const validateFile = (selectedFile) => {
        setError('');

        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));

        if (!allowedTypes.includes(selectedFile.type) && !allowedExtensions.includes(fileExtension)) {
            setError('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
            return false;
        }

        // Check file size (50MB max)
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes
        if (selectedFile.size > maxSize) {
            setError(`File size exceeds 50MB limit. Current size: ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`);
            return false;
        }

        return true;
    };

    const handleFileSelect = (selectedFile) => {
        if (validateFile(selectedFile)) {
            onFileSelect(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleInputChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleClick = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    const handleRemove = () => {
        setError('');
        onFileRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-3">
            {/* Upload Zone */}
            {!file && (
                <div
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragging
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleInputChange}
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        disabled={disabled}
                    />

                    <div className="flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <Upload className={`h-8 w-8 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>

                        <div>
                            <p className="text-base font-medium text-gray-700">
                                {isDragging ? 'Drop file here' : 'Drag & drop your file here'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                or <span className="text-blue-600 font-medium">browse</span> to choose a file
                            </p>
                        </div>

                        <p className="text-xs text-gray-400">
                            Supported formats: PDF, DOC, DOCX • Max size: 50MB
                        </p>
                    </div>
                </div>
            )}

            {/* Selected File Preview */}
            {file && (
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-2 bg-blue-50 rounded">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {formatFileSize(file.size)}
                            </p>

                            {/* Progress Bar */}
                            {progress > 0 && progress < 100 && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                        <span>Uploading...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {progress === 100 && (
                                <p className="text-xs text-green-600 mt-2 font-medium">
                                    ✓ Upload complete
                                </p>
                            )}
                        </div>

                        {!disabled && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Remove file"
                            >
                                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
