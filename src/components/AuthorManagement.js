'use client';

import { useState, useEffect } from 'react';
import { User, Edit, Power, Trash2, Search, RefreshCw, Upload, X, Globe, Link2 } from 'lucide-react';
import Image from 'next/image';
import { getAuthorsAdmin, createAuthor, updateAuthor, deleteAuthor } from '@/actions/authors';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function AuthorManagement() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null); // null when adding
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    twitter: '',
    linkedin: '',
    website: '',
    isActive: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState('');

  // Fetch Authors
  const fetchAuthors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAuthorsAdmin();
      if (data.success) {
        setAuthors(data.authors || []);
      } else {
        setError(data.error || 'Failed to fetch authors');
      }
    } catch (err) {
      setError('An error occurred while fetching authors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Handle Search Input Change
  const filteredAuthors = authors.filter((author) => {
    const query = searchQuery.toLowerCase();
    return (
      author.name.toLowerCase().includes(query) ||
      author.email.toLowerCase().includes(query)
    );
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingAuthor(null);
    setFormData({
      name: '',
      email: '',
      bio: '',
      avatar: '',
      twitter: '',
      linkedin: '',
      website: '',
      isActive: true,
    });
    setError('');
    setSuccess('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      email: author.email,
      bio: author.bio || '',
      avatar: author.avatar || '',
      twitter: author.social?.twitter || '',
      linkedin: author.social?.linkedin || '',
      website: author.social?.website || '',
      isActive: author.isActive !== undefined ? author.isActive : true,
    });
    setError('');
    setSuccess('');
    setIsModalOpen(true);
  };

  // Handle Avatar Image Upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be under 2MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const result = await uploadToCloudinary(file, 'avatars');
      if (result.success) {
        setFormData((prev) => ({ ...prev, avatar: result.url }));
        setSuccess('Profile picture uploaded successfully!');
      } else {
        setError(result.error || 'Failed to upload image. Please try again.');
      }
    } catch (err) {
      setError('Image upload failed');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.bio.trim()) {
      setError('Name, Email, and Bio are required');
      return;
    }

    if (!formData.avatar) {
      setError('Please upload a profile picture');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    const authorPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      bio: formData.bio.trim(),
      avatar: formData.avatar,
      social: {
        twitter: formData.twitter.trim(),
        linkedin: formData.linkedin.trim(),
        website: formData.website.trim(),
      },
      isActive: formData.isActive,
    };

    try {
      let response;
      if (editingAuthor) {
        response = await updateAuthor(editingAuthor._id, authorPayload);
      } else {
        response = await createAuthor(authorPayload);
      }

      if (response.success) {
        setSuccess(response.message || 'Saved successfully!');
        setIsModalOpen(false);
        fetchAuthors();
      } else {
        setError(response.error || 'Failed to save author');
      }
    } catch (err) {
      setError('Failed to save author details');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Deactivate/Activate Status
  const handleToggleStatus = async (author) => {
    const nextStatus = !author.isActive;
    if (
      !confirm(
        `Are you sure you want to ${
          nextStatus ? 'activate' : 'deactivate'
        } ${author.name}?`
      )
    ) {
      return;
    }

    setActionLoadingId(author._id);
    try {
      const response = await updateAuthor(author._id, {
        name: author.name,
        email: author.email,
        bio: author.bio,
        avatar: author.avatar,
        social: author.social || {},
        isActive: nextStatus,
      });

      if (response.success) {
        fetchAuthors();
      } else {
        alert(response.error || 'Failed to update author status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating author status');
    } finally {
      setActionLoadingId('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Author Management</h1>
          <p className="text-gray-600 mt-1">
            Manage author accounts, profiles, bios, and permissions ({authors.length} total)
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchAuthors}
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
          >
            <User className="h-4 w-4 mr-2" />
            Add Author
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-gray-200/60 rounded-2xl p-6">
        <div className="flex gap-4 relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-850 text-gray-800 text-sm"
              placeholder="Search authors by name or email..."
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && !isModalOpen && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Authors List Table */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading authors list...</p>
          </div>
        ) : filteredAuthors.length === 0 ? (
          <div className="p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-sm">No authors found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50/70">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-700">Avatar</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-700">Name</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-700">Email</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white/40">
                {filteredAuthors.map((author) => (
                  <tr key={author._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200 shadow-inner bg-gray-100 shrink-0">
                        {author.avatar ? (
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <User className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {author.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {author.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {author.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500 space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(author)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex"
                        title="Edit Author"
                      >
                        <Edit className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(author)}
                        disabled={actionLoadingId === author._id}
                        className={`p-1.5 rounded-lg transition-colors inline-flex ${
                          author.isActive
                            ? 'text-amber-600 hover:bg-amber-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={author.isActive ? 'Deactivate Author' : 'Activate Author'}
                      >
                        {actionLoadingId === author._id ? (
                          <div className="animate-spin rounded-full h-4.5 w-4.5 border-b-2 border-indigo-600"></div>
                        ) : (
                          <Power className="h-4.5 w-4.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Add / Edit Author */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingAuthor ? 'Edit Author Profile' : 'Add New Author'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}

              {/* Profile Image Upload Zone */}
              <div className="flex flex-col items-center gap-4 bg-gray-50/50 border border-dashed border-gray-300 rounded-2xl p-6">
                <span className="text-sm font-semibold text-gray-700">Profile Picture (Avatar) *</span>
                
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-indigo-100 shadow-md bg-white">
                  {formData.avatar ? (
                    <>
                      <Image
                        src={formData.avatar}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, avatar: '' }))}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors"
                        title="Remove profile image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
                      <User className="h-10 w-10 mb-1" />
                      <span className="text-[10px] text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <label
                    className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-sm transition-colors ${
                      isUploading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    <Upload className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <span className="text-[11px] text-gray-500">Square WebP/JPG format recommended, max 2MB</span>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                    placeholder="jane.doe@example.com"
                  />
                </div>
              </div>

              {/* Bio Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Biography *</label>
                  <span className="text-xs text-gray-500">{formData.bio.length}/500</span>
                </div>
                <textarea
                  required
                  rows={4}
                  maxLength={500}
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm resize-none"
                  placeholder="Tell readers about this author's experience, specialization, and role..."
                />
              </div>

              {/* Social URLs */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-gray-500" />
                  Social Links & Portfolio
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Twitter URL</label>
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-xs"
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-xs"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Personal Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-xs"
                      placeholder="https://mywebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Status checkbox */}
              {editingAuthor && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActiveInput"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="isActiveInput" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">
                    Author account is active
                  </label>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-250 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || isUploading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors shadow-sm inline-flex items-center"
              >
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
