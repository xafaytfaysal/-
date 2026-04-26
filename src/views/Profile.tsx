import { Camera, Edit2, Grid, Plus, MoreHorizontal, MapPin, GraduationCap, Briefcase, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="-mx-4 md:mx-0">
      {/* Cover and Header */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="relative h-[200px] md:h-[300px] w-full bg-slate-100 group">
          <img 
            src="https://images.unsplash.com/photo-1541462608141-ad43d0309995?w=1600&h=600&fit=crop" 
            className="w-full h-full object-cover"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
          <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm hover:bg-white flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg text-slate-800">
            <Camera className="w-4 h-4" />
            <span className="hidden md:inline">কভার ফটো পরিবর্তন</span>
          </button>
        </div>

        <div className="px-8 pb-6">
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 mb-6">
            <div className="relative group">
              <img 
                src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop"} 
                className="w-40 h-40 rounded-full border-8 border-white object-cover shadow-xl group-hover:ring-4 group-hover:ring-indigo-100 transition-all"
                alt="Avatar"
              />
              <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left pt-4">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user?.displayName || 'ব্যবহারকারীর নাম'}</h1>
              <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">৫৫০ জন বন্ধু • ১০০ জন ফলোয়ার</p>
              <div className="flex items-center justify-center md:justify-start -space-x-3 mt-4">
                {[1,2,3,4,5,6].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?u=${i + 100}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100" alt="friend" />
                ))}
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm ring-1 ring-slate-100">+৫০</div>
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                স্টোরি যোগ করুন
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                প্রোফাইল এডিট
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-2 border-t border-slate-100 pt-1">
            {['পোস্ট', 'তথ্য', 'বন্ধু', 'ছবি', 'ভিডিও', 'অন্যান্য'].map((tab, i) => (
              <button 
                key={tab} 
                className={`px-5 py-4 font-bold text-sm transition-all relative ${i === 0 ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-indigo-600 after:rounded-t-full' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl'}`}
              >
                {tab}
              </button>
            ))}
            <button className="p-2 ml-auto text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mt-8 pb-12">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest text-[11px]">পরিচয়</h2>
            <div className="space-y-6">
              <p className="text-center py-4 px-6 bg-slate-50 rounded-2xl italic text-slate-600 text-sm leading-relaxed">
                "আমি একজন প্রফেশনাল ইউএক্স/ইউআই ডিজাইনার। নতুন কিছু শেখা এবং তৈরি করাই আমার প্যাশন।"
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600 text-[13px] font-medium">
                  <Briefcase className="w-5 h-5 text-slate-400" />
                  <span>পেশা: <b className="text-slate-900">ডিজিটাল ক্রিয়েটর</b></span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 text-[13px] font-medium">
                  <GraduationCap className="w-5 h-5 text-slate-400" />
                  <span>শিক্ষা: <b className="text-slate-900">ঢাকা বিশ্ববিদ্যালয়</b></span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 text-[13px] font-medium">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span>বসবাস: <b className="text-slate-900">ঢাকা, বাংলাদেশ</b></span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 text-[13px] font-medium">
                  <LinkIcon className="w-5 h-5 text-slate-400" />
                  <span className="text-indigo-600 font-bold hover:underline cursor-pointer">portfolio.me</span>
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:bg-slate-800 tracking-wide">বিস্তারিত এডিট করুন</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest text-[11px]">পোস্ট সমূহ</h2>
                <div className="flex gap-2">
                   <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Grid className="w-5 h-5" /></button>
                   <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
             </div>
           </div>
           
           <div className="bg-white border-2 border-dashed border-slate-200 p-20 rounded-3xl text-center shadow-sm">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit2 className="w-6 h-6 text-slate-300" />
             </div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">এখনো কোন পোস্ট পাওয়া যায়নি</p>
             <button className="mt-6 text-indigo-600 font-black text-xs uppercase tracking-tighter hover:underline transition-all">আপনার প্রথম পোস্টটি করুন</button>
           </div>
        </div>
      </div>
    </div>
  );
}
