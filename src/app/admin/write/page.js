import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowLeft, PenTool } from 'lucide-react';
import BlogWriteForm from '@/components/BlogWriteForm';

export const metadata = {
  title: 'Write New Blog - Techolyze',
  description: 'Create and publish a new blog post on Techolyze',
};

export default function BlogWritePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-100 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Blogs</span>
          </Link>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-950/50 border border-blue-900/30 rounded-lg">
              <PenTool className="h-6 w-6 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-50 tracking-tight">
              Write New Blog Post
            </h1>
          </div>
          <p className="text-slate-400">
            Share your knowledge and insights with the Techolyze community.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl shadow-xl p-8">
          <Suspense fallback={<div className="p-8 text-slate-500 animate-pulse">Loading form...</div>}>
            <BlogWriteForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}