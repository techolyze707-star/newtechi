"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAdminSession } from '@/lib/auth';
import { adminLogin } from '@/actions/admin';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminLogin(formData.username, formData.password);

      if (data.success) {
        setAdminSession();
        // Redirect back to the page they tried to visit, or /admin
        const redirect = searchParams.get('redirect') || '/admin';
        router.push(redirect);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-800 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-indigo-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">Admin Login</h1>
            <p className="text-slate-400">Access the admin dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-slate-950/40 backdrop-blur-sm text-slate-200 placeholder-slate-600 transition-all duration-200"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-slate-950/40 backdrop-blur-sm text-slate-200 placeholder-slate-600 transition-all duration-200"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <p className="text-sm text-slate-500">
              Authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}