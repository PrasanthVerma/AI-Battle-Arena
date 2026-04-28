import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function Register() {

  const navigate = useNavigate();
  const { handleRegister, handleGoogleLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({ username, email, password });
      navigate('/login', { replace: true });
    } catch {
      // Error already shown via toast in useAuth
    }
  };

  const handleGoogleLoginHook = (e) => {
    handleGoogleLogin()
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-8 md:p-10 border border-surface-highest/30 relative overflow-hidden">
        {/* Subtle gradient glow effect at the top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-surface-low border border-surface-highest/50 mb-4 shadow-sm">
            <span className="text-2xl">⚔️</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-on-surface">Join the Arena</h1>
          <p className="text-secondary text-sm">Create an account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. AI_Master"
              className="w-full bg-surface-low border border-surface-highest rounded-xl px-4 py-3 text-on-surface placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-surface-low border border-surface-highest rounded-xl px-4 py-3 text-on-surface placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-low border border-surface-highest rounded-xl px-4 py-3 text-on-surface placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold rounded-xl px-4 py-3.5 hover:bg-primary-container hover:shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all duration-200 active:scale-[0.98] mt-4"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-highest/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-surface text-secondary">OR</span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleGoogleLogin();
          }}
          className="w-full bg-white text-gray-700 font-semibold rounded-xl px-4 py-3.5 hover:bg-gray-50 hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition-all duration-200 active:scale-[0.98] border border-gray-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="mt-8 pt-6 border-t border-surface-highest/30 text-center">
          <p className="text-sm text-secondary">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="font-semibold text-primary hover:text-primary-container transition-colors cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
