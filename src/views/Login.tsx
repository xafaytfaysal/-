import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginWithGoogle, auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans">
      <div className="max-w-[1100px] w-full flex flex-col md:flex-row items-center gap-16 md:gap-32">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 transform -rotate-6">
              <span className="text-white text-3xl font-black">স</span>
            </div>
            <h1 className="text-5xl font-black text-indigo-600 tracking-tighter">সোশ্যালকানেক্ট</h1>
          </div>
          <p className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
            আপনার বন্ধু এবং পরিবারের সদস্যদের সাথে যুক্ত হোন এবং মুহূর্তগুলো ভাগাভাগি করুন।
          </p>
          <div className="flex items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-xs pt-4">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            নিরাপদ এবং বিশ্বাসযোগ্য সোশ্যাল নেটওয়ার্ক
          </div>
        </div>

        <div className="md:w-[420px] w-full space-y-8">
          <div className="bg-white p-10 shadow-2xl shadow-indigo-50/50 rounded-3xl border border-slate-100">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">পাসওয়ার্ড</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700"
                />
              </div>
              {error && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider text-center">{error}</p>}
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl text-sm transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-indigo-100 uppercase tracking-widest">
                লগ ইন করুন
              </button>
              <div className="text-center">
                <Link to="/forgot" className="text-indigo-600 hover:underline text-[11px] font-bold uppercase tracking-wider">পাসওয়ার্ড ভুলে গেছেন?</Link>
              </div>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-300 bg-white px-4">অথবা</div>
              </div>
              <button 
                type="button"
                onClick={() => loginWithGoogle()}
                className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-[13px]"
              >
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                গুগল দিয়ে প্রবেশ করুন
              </button>
              <div className="pt-4 text-center">
                <Link
                  to="/signup"
                  className="text-emerald-500 hover:text-emerald-600 font-black text-sm uppercase tracking-tighter"
                >
                  নতুন একাউন্ট খুলুন
                </Link>
              </div>
            </form>
          </div>
          <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <p><span className="text-indigo-600 hover:underline cursor-pointer">পেজ তৈরি করুন</span> সেলেব্রিটি, ব্র্যান্ড বা ব্যবসার জন্য।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
