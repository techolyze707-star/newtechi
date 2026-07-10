'use client';

import { useEffect } from 'react';
import { CheckCircle, X, Download, Bookmark } from 'lucide-react';

export default function Toast({ message, isVisible, onClose, type = 'success' }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    download: <Download className="w-5 h-5 text-blue-500" />,
    bookmark: <Bookmark className="w-5 h-5 text-amber-500" />
  };

  const bgColors = {
    success: 'bg-white',
    download: 'bg-white',
    bookmark: 'bg-white'
  };

  return (
    <div className="fixed top-20 right-4 z-[99999] animate-slide-in-right">
      <div className={`${bgColors[type]} rounded-lg shadow-2xl border border-slate-200 p-4 pr-12 min-w-[320px] max-w-md`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {icons[type]}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
