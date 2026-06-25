import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, EyeOff, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

interface AdminLoginProps {
  onLoginSuccess: (adminName: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('deepashika571@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Custom Event listener for authorization denial from App.tsx
  useEffect(() => {
    const handleAuthDenied = (e: Event) => {
      const email = (e as CustomEvent).detail;
      setError(`Access Denied: The email ${email} is not authorized to enter this private sanctuary.`);
      setIsLoading(false);
    };

    window.addEventListener('auth_denied', handleAuthDenied);
    return () => window.removeEventListener('auth_denied', handleAuthDenied);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const trimmedEmail = username.trim();
    const adminEmails = ["deepashika571@gmail.com"];

    if (!trimmedEmail) {
      setError('Please provide a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!adminEmails.includes(trimmedEmail.toLowerCase())) {
      setError('Access Denied: Only deepashika571@gmail.com is permitted to enter.');
      setIsLoading(false);
      return;
    }

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let friendlyMessage = 'An error occurred during verification.';
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        friendlyMessage = 'Invalid credentials. If you haven\'t created your account yet, switch to Register mode.';
      } else if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'The password must be at least 6 characters.';
      } else if (err.message) {
        friendlyMessage = err.message;
      }
      
      setError(friendlyMessage);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      // Suppress popup-closed errors or print user friendly alert
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Error signing in with Google.');
      }
      setIsLoading(false);
    }
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
        <div className="text-center mb-6">
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
            Secure Admin Gateway
          </p>
          <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto mt-4" />
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-zinc-800 mb-6 relative">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(false);
              setError('');
            }}
            className={`flex-1 pb-3 text-xs uppercase tracking-wider font-mono transition-colors relative flex items-center justify-center gap-2 ${
              !isRegisterMode ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
            {!isRegisterMode && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setError('');
            }}
            className={`flex-1 pb-3 text-xs uppercase tracking-wider font-mono transition-colors relative flex items-center justify-center gap-2 ${
              isRegisterMode ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register
            {isRegisterMode && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
              />
            )}
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-red-400 bg-red-950/30 border border-red-500/20 p-3 rounded-lg text-center font-sans mb-5"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase font-mono text-[#D4AF37]/80 mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D4AF37]/50">
                <User className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none"
                placeholder="deepashika571@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] tracking-[0.15em] uppercase font-mono text-[#D4AF37]/80">
                Password
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
                placeholder={isRegisterMode ? "Choose password (min 6 chars)" : "••••••••••••"}
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
                Authenticating...
              </span>
            ) : (
              isRegisterMode ? 'Register Admin Credentials' : 'Enter Admin Sanctuary'
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 w-full">
            <div className="h-[1px] bg-gray-800 flex-1" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Or Sign In With</span>
            <div className="h-[1px] bg-gray-800 flex-1" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 text-xs bg-white text-zinc-950 font-medium px-4 py-3 rounded-lg w-full hover:bg-gray-100 transition-all duration-300 shadow-md cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Authorized Google Account</span>
          </button>

          <p className="text-[9px] text-center text-gray-500 max-w-[280px]">
            Notice: Access is strictly reserved for authorized administrator email: <span className="text-[#D4AF37] font-semibold">deepashika571@gmail.com</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
