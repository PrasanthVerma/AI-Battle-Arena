import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Logout() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    // Perform logout when component mounts
    handleLogout().catch((error) => {
      console.error('Logout failed:', error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-8 md:p-10 border border-surface-highest/30 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-low border border-surface-highest/50 mb-6 shadow-sm">
          <span className="text-3xl">👋</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-on-surface">Logged Out</h1>
        <p className="text-secondary text-sm mb-8 leading-relaxed">
          You have been successfully logged out of your account. We hope to see you back in the arena soon!
        </p>

        <button
          onClick={() => navigate('/login', { replace: true })}
          className="w-full bg-primary text-white font-semibold rounded-xl px-4 py-3.5 hover:bg-primary-container hover:shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all duration-200 active:scale-[0.98]"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
