import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, EyeOff, Lock, User, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (adminName: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('Jaisri@admin');
  const [password, setPassword] = useState('beauty');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate luxury verification
    setTimeout(() => {
      if (
        (username.trim().toLowerCase() === 'jaisri@admin' || username.trim() === 'Jaisri@admin') &&
        password === 'beauty'
      ) {
        onLoginSuccess('Lady Genevieve');
      } else if (username.trim() === 'demo' && password === 'demo') {
        onLoginSuccess('Demo Manager');
      } else {
        setError('The golden keys did not match our luxury directory.');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleQuickLogin = () => {
    setUsername('Jaisri@admin');
    setPassword('beauty');
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess('Lady Genevieve');
    }, 600);
  };

  return (
    <div id="login-container" className="min-h-screen bg-[#0B0B0C] text-[#E5D3B3] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Luxury Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(11,11,12,1),transparent_70%)] pointer-events-none" />
      
      {/* Golden Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-[180px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#AA7C11] rounded-full blur-[150px] opacity-5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#131316]/90 border border-[#D4AF37]/20 rounded-2xl backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
      >
        {/* Branding */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#1C1C1F] text-[#D4AF37] mb-4"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E5D3B3] uppercase font-light">
            Aura Luxe
          </h1>
          <p className="text-xs text-[#D4AF37] tracking-[0.25em] uppercase font-mono mt-1">
            Beauty Studio Admin
          </p>
          <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-xs text-red-400 bg-red-950/30 border border-red-500/20 p-3 rounded-lg text-center font-sans"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase font-mono text-[#D4AF37]/80 mb-2">
              Admin Directory ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D4AF37]/50">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none"
                placeholder="Jaisri@admin"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] tracking-[0.15em] uppercase font-mono text-[#D4AF37]/80">
                Studio Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D4AF37]/50">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg py-3 pl-10 pr-12 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none"
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#AA7C11] text-black font-medium text-xs tracking-[0.2em] uppercase rounded-lg py-3.5 shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 hover:opacity-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                Validating Entry...
              </span>
            ) : (
              'Enter Admin Sanctuary'
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 w-full">
            <div className="h-[1px] bg-gray-800 flex-1" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Or Experience Immediately</span>
            <div className="h-[1px] bg-gray-800 flex-1" />
          </div>

          <button
            onClick={handleQuickLogin}
            className="flex items-center justify-center gap-2 text-xs bg-transparent border border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 text-[#D4AF37] px-4 py-2.5 rounded-lg w-full transition-all duration-300"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Demo Quick Bypass (Preloaded Credentials)</span>
          </button>

          <div className="text-[10px] text-center text-gray-500 space-y-1 mt-2">
            <p>Admin Profile: <span className="text-[#E5D3B3]">Jaisri@admin</span></p>
            <p>Secret Password: <span className="text-[#E5D3B3]">beauty</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
