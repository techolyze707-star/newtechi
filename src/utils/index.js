export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) => {
      // Sort by publishedAt date in descending order (newest first)
      if (a.publishedAt && b.publishedAt) {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
      // If no publishedAt, sort by createdAt
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
};
export const handleShare = async (e, title, excerpt) => {
  e.preventDefault();

  const shareData = {
    title: title,
    text: excerpt || title,
    url: window.location.href
  };

  try {
    // Try to use native Web Share API
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  } catch (err) {
    // If sharing fails or is cancelled, copy to clipboard
    if (err.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardErr) {
        alert('Unable to share. Please copy the URL manually.');
      }
    }
  }
};