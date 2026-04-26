import React, { useState } from 'react';
import { X, HelpCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setError('দয়া করে সব তথ্য পূরণ করুন');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
        gender,
        createdAt: serverTimestamp(),
        friendsCount: 0
      });
      
    } catch (err: any) {
      setError('তথ্য সঠিক নয় অথবা ইমেইলটি আগে থেকেই ব্যবহৃত হচ্ছে');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans">
      <div className="bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-slate-100">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-indigo-600">
          <div className="text-white">
            <h1 className="text-2xl font-black uppercase tracking-tight">নতুন একাউন্ট</h1>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-1">খুব দ্রুত এবং সহজেই!</p>
          </div>
          <Link to="/login" className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all">
            <X className="w-5 h-5 text-white" />
          </Link>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={handleSignup}>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">নামের প্রথম অংশ</label>
              <input 
                type="text" 
                placeholder="কামাল" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700" 
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">নামের শেষ অংশ</label>
              <input 
                type="text" 
                placeholder="হোসেন" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ইমেইল ঠিকানা</label>
            <input 
              type="text" 
              placeholder="example@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">নতুন পাসওয়ার্ড</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700" 
            />
          </div>
          
          {error && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider text-center py-2 bg-rose-50 rounded-xl">{error}</p>}

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
              লিঙ্গ <HelpCircle className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="flex gap-4 text-sm">
               <label className={`flex-1 flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${gender === 'Female' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-50 bg-slate-50 text-slate-500'}`} onClick={() => setGender('Female')}>
                  <span className="font-bold">নারী</span>
                  <input type="radio" name="gender" className="accent-indigo-600 hidden" checked={gender === 'Female'} readOnly />
               </label>
               <label className={`flex-1 flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${gender === 'Male' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-50 bg-slate-50 text-slate-500'}`} onClick={() => setGender('Male')}>
                  <span className="font-bold">পুরুষ</span>
                  <input type="radio" name="gender" className="accent-indigo-600 hidden" checked={gender === 'Male'} readOnly />
               </label>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase leading-tight py-2 border-t border-slate-50 pt-6">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            একাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে সম্মত হচ্ছেন।
          </div>
          
          <div className="flex justify-center pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl text-sm transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-indigo-100 uppercase tracking-widest"
            >
              {isLoading ? 'একাউন্ট খোলা হচ্ছে...' : 'সাইন আপ করুন'}
            </button>
          </div>
          <div className="text-center pt-2">
             <Link to="/login" className="text-indigo-600 font-bold text-xs uppercase hover:underline">আগের একাউন্টে ফিরে যান</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
