'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { MessageCircle, Send, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { createComment } from '@/actions/comments';
import { formatDistanceToNow } from 'date-fns';

function CommentItem({ comment }) {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  return (
    <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 hover:bg-neutral-100 transition-colors duration-200">
      <div className="flex items-start gap-3">
        <div className="bg-neutral-200 p-2 rounded-full flex-shrink-0">
          <User className="h-4 w-4 text-neutral-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-neutral-900">{comment.name}</span>
            <div className="flex items-center text-sm text-neutral-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <p className="text-neutral-700 whitespace-pre-wrap break-words">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ documentId, initialComments, initialPagination }) {
  const [isPending, startTransition] = useTransition();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [message, setMessage] = useState({ type: '', content: '' });
  
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments || [],
    (state, newComment) => [newComment, ...state]
  );
  
  const [pagination, setPagination] = useState(initialPagination);
  const [allComments, setAllComments] = useState(initialComments || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.content.trim()) {
      setMessage({ type: 'error', content: 'Please fill in all fields' });
      return;
    }

    const tempComment = {
      _id: `temp-${Date.now()}`,
      name: formData.name.trim(),
      content: formData.content.trim(),
      createdAt: new Date().toISOString(),
      documentId
    };

    setMessage({ type: '', content: '' });

    startTransition(async () => {
      // Optimistically add the comment inside the transition
      addOptimisticComment(tempComment);
      try {
        const result = await createComment(documentId, formData.name, formData.content);
        
        if (result.success) {
          // Update the actual comments list
          setAllComments(prev => [result.comment, ...prev]);
          setPagination(prev => ({
            ...prev,
            totalCount: prev.totalCount + 1
          }));
          
          // Clear form
          setFormData({ name: '', content: '' });
          setMessage({ type: 'success', content: 'Comment posted successfully!' });
          
          // Clear success message after 3 seconds
          setTimeout(() => setMessage({ type: '', content: '' }), 3000);
        } else {
          setMessage({ type: 'error', content: result.error || 'Failed to post comment' });
        }
      } catch (error) {
        setMessage({ type: 'error', content: 'An unexpected error occurred' });
      }
    });
  };

  const loadMoreComments = async () => {
    if (isLoadingMore || !pagination.hasMore) return;
    
    setIsLoadingMore(true);
    
    try {
      const response = await fetch(`/api/comments?documentId=${documentId}&page=${pagination.currentPage + 1}`);
      const result = await response.json();
      
      if (result.success) {
        setAllComments(prev => [...prev, ...result.comments]);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error('Error loading more comments:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const displayedComments = optimisticComments.length > 0 ? optimisticComments : allComments;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-neutral-900" />
        <h3 className="text-lg font-semibold text-neutral-900">
          Comments ({pagination?.totalCount || 0})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        {message.content && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
            message.type === 'success'
              ? 'bg-neutral-100 text-neutral-800 border border-neutral-200'
              : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-neutral-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-neutral-600" />
            )}
            <span>{message.content}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            disabled={isPending}
            className="col-span-1 border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:opacity-50 transition-colors"
            maxLength={100}
            required
          />
          <textarea
            placeholder="Write your comment..."
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            disabled={isPending}
            className="col-span-1 sm:col-span-2 border border-neutral-300 rounded-md px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:opacity-50 resize-none transition-colors"
            rows={3}
            maxLength={2000}
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-neutral-500">
            {formData.content.length}/2000 characters
          </div>
          <button
            type="submit"
            disabled={isPending || !formData.name.trim() || !formData.content.trim()}
            className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>{isPending ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      {displayedComments.length > 0 ? (
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}

          {/* Load More Button */}
          {pagination?.hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={loadMoreComments}
                disabled={isLoadingMore}
                className="bg-neutral-100 text-neutral-900 px-6 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isLoadingMore ? 'Loading...' : 'Load More Comments'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
          <h4 className="text-lg font-medium text-neutral-900 mb-2">No comments yet</h4>
          <p className="text-neutral-600">Be the first to share your thoughts about this document!</p>
        </div>
      )}
    </div>
  );
}