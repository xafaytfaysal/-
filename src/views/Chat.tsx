import { Search, Phone, Video, Info, Smile, Plus, Send, Edit2 } from 'lucide-react';
import { useState } from 'react';

const Contact = ({ name, avatar, active, onClick }: any) => (
  <div 
    onClick={onClick}
    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50 rounded-2xl transition-all relative group"
  >
    <div className="relative shrink-0">
      <img src={avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-100" alt="avatar" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
    </div>
    <div className="flex-1 overflow-hidden">
      <h3 className="font-bold text-slate-800 text-[13px] truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{name}</h3>
      <p className="text-[10px] text-slate-400 font-bold truncate uppercase tracking-widest">৫ মিনিট আগে সক্রিয় ছিল</p>
    </div>
  </div>
);

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState({ name: 'সাবিহা আক্তার', avatar: 'https://i.pravatar.cc/150?u=julia' });

  return (
    <div className="fixed inset-0 top-16 left-0 md:left-[280px] xl:right-[320px] bg-slate-50 flex overflow-hidden z-10 border-x border-slate-200 shadow-2xl">
      {/* Sidebar - Contacts */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-white">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-widest">আলাপন</h1>
            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"><Edit2 className="w-4 h-4" /></button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="মেসেজ খুঁজুন..."
              className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">সক্রিয় বন্ধুগণ</div>
          {[1,2,3,4,5,6,7,8].map(i => (
            <Contact 
              key={i} 
              name={`বন্ধু ${i}`} 
              avatar={`https://i.pravatar.cc/150?u=${i + 50}`}
              onClick={() => setSelectedContact({ name: `বন্ধু ${i}`, avatar: `https://i.pravatar.cc/150?u=${i + 50}` })}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
        {/* Header */}
        <div className="h-20 px-8 border-b border-slate-200 flex items-center justify-between bg-white shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img src={selectedContact.avatar} className="w-11 h-11 rounded-full border-2 border-white shadow-md ring-1 ring-slate-100" alt="Active" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 leading-tight uppercase tracking-widest text-[13px]">{selectedContact.name}</h4>
              <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">সক্রিয়</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"><Phone className="w-5 h-5" /></button>
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"><Video className="w-5 h-5" /></button>
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"><Info className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-white rounded-full p-1 border border-slate-200 shadow-sm mx-auto mb-4">
              <img src={selectedContact.avatar} className="w-full h-full rounded-full" alt="Main" />
            </div>
            <h5 className="font-bold text-slate-900 text-sm uppercase tracking-widest">{selectedContact.name}</h5>
            <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-widest">আপনি এখন সাবিহা আক্তারের সাথে চ্যাট করছেন</p>
          </div>

          <div className="flex gap-4 max-w-[80%]">
            <img src={selectedContact.avatar} className="w-8 h-8 rounded-full self-end shadow-sm" alt="avatar" />
            <div className="bg-white p-4 rounded-3xl rounded-bl-none text-[13px] text-slate-700 font-medium shadow-sm border border-slate-100 leading-relaxed">
              আসসালামু আলাইকুম! কেমন আছেন? অনেকদিন পর যোগাযোগ হলো। কাজ কেমন চলছে?
            </div>
          </div>
          <div className="flex gap-4 max-w-[80%] ml-auto">
            <div className="bg-indigo-600 p-4 rounded-3xl rounded-br-none text-[13px] text-white font-medium shadow-lg shadow-indigo-100 leading-relaxed">
              ওয়ালাইকুম আসসালাম। আমি আলহামদুলিল্লাহ ভালো আছি। নতুন একটা প্রজেক্ট নিয়ে একটু বিজি ছিলাম। আপনার কি খবর?
            </div>
          </div>
          <div className="flex gap-4 max-w-[80%]">
            <img src={selectedContact.avatar} className="w-8 h-8 rounded-full self-end shadow-sm" alt="avatar" />
            <div className="bg-white p-4 rounded-3xl rounded-bl-none text-[13px] text-slate-700 font-medium shadow-sm border border-slate-100 leading-relaxed">
              শুনে ভালো লাগলো! কাজ শেষে আমাকে একটু ইনফর্ম করবেন, একটা আইডিয়া শেয়ার করার ছিল।
            </div>
          </div>
        </div>

        {/* Footer Input */}
        <div className="p-6 bg-white border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"><Plus className="w-6 h-6" /></button>
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                placeholder="মেসেজ লিখুন..."
                className="w-full bg-slate-100 border-none rounded-2xl py-3 px-6 pr-12 text-[13px] font-medium outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
              />
              <Smile className="absolute right-4 w-5 h-5 text-indigo-600 cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <button className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:translate-y-0">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
