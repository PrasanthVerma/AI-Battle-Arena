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
    <div className="min-h-screen grid-bg text-on-surface flex flex-col items-center justify-center p-4 font-outfit">
      {/* Small top header outside the card */}
      <div className="flex items-center gap-2 mb-4 text-amber-500/80 font-bebas tracking-[0.25em] text-xs">
        <span>⚔️</span>
        <span>Register Screen</span>
      </div>

      <div className="w-full max-w-md bg-surface rounded-[24px] border border-zinc-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(234,179,8,0.07)] p-8 md:p-10 relative overflow-hidden">
        {/* Subtle glowing border effect at the top */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />

        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-5 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <span className="text-2xl">⚔️</span>
          </div>
          <h1 className="text-4xl font-bebas tracking-wider text-amber-500 mb-1">Join the Arena</h1>
          <p className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.2em] block" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="YourHandle"
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.2em] block" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.2em] block" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 border border-zinc-700/80 text-white font-bebas tracking-[0.2em] rounded-xl px-4 py-3.5 hover:bg-zinc-800 hover:border-amber-500/70 hover:shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-all duration-200 active:scale-[0.98] mt-4 text-sm uppercase cursor-pointer"
          >
            Enter The Arena
          </button>
        </form>

        <div className="mt-8 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/80"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-surface text-zinc-500 font-semibold lowercase">or</span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleGoogleLogin();
          }}
          className="w-full bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 font-medium rounded-xl px-4 py-3.5 hover:bg-zinc-800 hover:text-white transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3 text-sm cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
          </div>
          Continue with Google
        </button>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
          <p className="text-sm text-zinc-500">
            Already a contender?{' '}
            <span
              onClick={() => navigate('/login')}
              className="font-bold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
