import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function Register() {
  
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({username, email, password}).then(() => {
      navigate('/login', { replace: true });
    });
  };

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
          <p className="text-secondary text-sm">Create an account to start judging AI models.</p>
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
