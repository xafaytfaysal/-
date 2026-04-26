/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Users, MessageSquare, Flag, Menu, Search, Plus, Bell, MessageCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { logout } from '../lib/firebase';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 p-3 rounded-lg transition-all",
      active ? "bg-indigo-50 text-indigo-700 shadow-sm" : "hover:bg-slate-50 text-slate-600"
    )}
  >
    <Icon className="w-5 h-5" />
    <span className="font-semibold hidden lg:block text-sm">{label}</span>
  </Link>
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              স
            </div>
            <span className="text-2xl font-bold text-indigo-600 tracking-tight transition-all">সোশ্যালকানেক্ট</span>
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="সার্চ করুন..."
              className="bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavItem to="/" icon={Home} label="হোম" active={location.pathname === '/'} />
          <NavItem to="/pages" icon={Flag} label="পেজ" active={location.pathname === '/pages'} />
          <NavItem to="/chat" icon={MessageSquare} label="মেসেঞ্জার" active={location.pathname === '/chat'} />
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-rose-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-200">
            <Link to="/profile" className="flex items-center gap-3 pr-2 group">
              <img
                src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200 group-hover:ring-indigo-300 transition-all"
              />
              <span className="hidden lg:block font-semibold text-sm text-slate-700">{user?.displayName?.split(' ')[0] || 'ইউজার'}</span>
            </Link>
            <button 
              onClick={() => logout()}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto flex gap-8 px-8 py-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6 w-64 sticky top-24 self-start">
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">প্রধান মেনু</div>
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-semibold",
                location.pathname === '/' 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", location.pathname === '/' ? "bg-indigo-600" : "bg-slate-300")}></div>
              হোম ফিড
            </Link>
            <Link
              to="/pages"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-semibold",
                location.pathname === '/pages' 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", location.pathname === '/pages' ? "bg-indigo-600" : "bg-slate-300")}></div>
              পেজ সমূহ
            </Link>
            <Link
              to="/friends"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-semibold",
                location.pathname === '/friends' 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", location.pathname === '/friends' ? "bg-indigo-600" : "bg-slate-300")}></div>
              বন্ধুর তালিকা
            </Link>
          </nav>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">আমার শর্টকাট</div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
              <div className="w-6 h-6 bg-amber-100 rounded text-[10px] flex items-center justify-center font-bold text-amber-700">বি</div>
              বিডিকানেক্ট পেজ
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
              <div className="w-6 h-6 bg-emerald-100 rounded text-[10px] flex items-center justify-center font-bold text-emerald-700">টি</div>
              টেক টক গ্রুপ
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 max-w-[640px] mx-auto w-full">
          {children}
        </section>

        {/* Right Sidebar - only sample data for visual perfection */}
        <aside className="hidden xl:flex flex-col gap-8 w-80 sticky top-24 self-start">
           {/* Mini Profile Card */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-4 mb-6">
                <img src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"} className="w-12 h-12 rounded-full border-4 border-slate-50 shadow-sm" alt="Me" />
                <div>
                  <div className="font-bold text-sm text-slate-900">{user?.displayName || 'ব্যবহারকারী'}</div>
                  <Link to="/profile" className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-wider">প্রোফাইল দেখুন</Link>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-4">
                <div><div className="text-xs font-bold text-slate-900">২৫০</div><div className="text-[9px] text-slate-400 uppercase font-bold">বন্ধু</div></div>
                <div><div className="text-xs font-bold text-slate-900">৪৫</div><div className="text-[9px] text-slate-400 uppercase font-bold">পোস্ট</div></div>
                <div><div className="text-xs font-bold text-slate-900">১২</div><div className="text-[9px] text-slate-400 uppercase font-bold">পেজ</div></div>
             </div>
           </div>

           {/* Contacts Section */}
           <div>
             <div className="flex items-center justify-between mb-4 px-2">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">চ্যাট (অনলাইন)</div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
             </div>
             <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-[10px]">এস</div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">সাবিহা আক্তার</div>
                      <div className="text-[10px] text-slate-400">এখনই সক্রিয়</div>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-2 border border-dashed border-slate-300 rounded-xl text-[11px] font-bold text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-all uppercase tracking-wider">সবগুলো মেসেজ দেখুন</button>
           </div>
        </aside>
      </main>
    </div>
  );
}
