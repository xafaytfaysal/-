import { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Smile, ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const Story = ({ img, name, isUser }: { img: string, name: string, isUser?: boolean }) => (
  <div className="relative w-28 h-48 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl group">
    <img src={img} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="story" />
    <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 group-hover:bg-black/10 transition-colors"></div>
    <div className="absolute top-3 left-3 w-9 h-9 border-4 border-blue-600 rounded-full overflow-hidden">
      <img src={isUser ? img : `https://i.pravatar.cc/150?u=${name}`} className="w-full h-full object-cover" alt="avatar" />
    </div>
    <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold truncate">{isUser ? 'Create Story' : name}</span>
  </div>
);

const Post = ({ author, time, content, image, likes, comments }: any) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={author.avatar || "https://i.pravatar.cc/150?u=anon"} className="w-10 h-10 rounded-full" alt="avatar" />
          <div>
            <h4 className="font-semibold text-[15px] leading-tight hover:underline cursor-pointer">{author.name}</h4>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pb-3">
        <p className="text-[15px] text-gray-800 border-none outline-none">{content}</p>
      </div>

      {image && (
        <div className="bg-gray-100">
          <img src={image} className="w-full h-auto max-h-[500px] object-contain" alt="post content" />
        </div>
      )}

      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1">
          <div className="bg-blue-600 rounded-full p-1">
            <ThumbsUp className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="text-sm text-gray-500">{liked ? (likes || 0) + 1 : (likes || 0)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{comments || 0} comments</span>
          <span>0 shares</span>
        </div>
      </div>

      <div className="px-1 py-1 flex items-center justify-around">
        <button 
          onClick={() => setLiked(!liked)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm",
            liked ? "text-blue-600" : "text-gray-600"
          )}
        >
          <ThumbsUp className={cn("w-5 h-5", liked && "fill-blue-600")} />
          <span>Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm text-gray-600">
          <MessageSquare className="w-5 h-5" />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm text-gray-600">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    }, (error) => {
      console.error("Error fetching posts:", error);
    });
    return unsubscribe;
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return;
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        authorAvatar: user.photoURL || '',
        content: newPostContent,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
      });
      setNewPostContent('');
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Stories - Sample data for visual perfection */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        <Story name="You" img={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=300&fit=crop"} isUser />
        <Story name="Julia" img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=300&fit=crop" />
        <Story name="Robert" img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=300&fit=crop" />
        <Story name="Sarah" img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=300&fit=crop" />
        <Story name="Mike" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=300&fit=crop" />
      </div>

      {/* Create Post Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 shrink-0 flex items-center justify-center font-bold text-indigo-700">
            {user?.displayName ? user.displayName.charAt(0) : 'আ'}
          </div>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="আপনি কি ভাবছেন?"
            className="flex-1 border-none bg-slate-50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-100 resize-none h-14 outline-none transition-all"
          />
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <span className="w-4 h-4 rounded bg-rose-50 border border-rose-100 flex items-center justify-center">
                <ImageIcon className="w-2.5 h-2.5 text-rose-500" />
              </span> 
              ছবি / ভিডিও
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <span className="w-4 h-4 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Smile className="w-2.5 h-2.5 text-emerald-500" />
              </span> 
              অনুভূতি
            </button>
          </div>
          <button 
            onClick={handleCreatePost}
            disabled={isPosting || !newPostContent.trim()}
            className="bg-indigo-600 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            {isPosting ? 'পোস্ট হচ্ছে...' : 'পোস্ট'}
          </button>
        </div>
      </div>

      {/* Posts Area */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-2xl border border-slate-200 text-slate-400 italic shadow-sm">
            এখনো কোন পোস্ট নেই। প্রথম পোস্টটি আপনিই করুন!
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transform transition-all hover:shadow-md">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm overflow-hidden">
                    {post.authorAvatar ? <img src={post.authorAvatar} className="w-full h-full object-cover" /> : post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors">{post.authorName}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString('bn-BD', { hour: 'numeric', minute: 'numeric', hour12: true }) : 'এই মাত্র'} • ঢাকা
                    </div>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-600 p-2 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="px-4 pb-4">
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
                {post.imageUrl && (
                  <div className="mt-4 w-full min-h-[200px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                    <img src={post.imageUrl} className="w-full h-auto object-contain" alt="Post" />
                  </div>
                )}
              </div>
              <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex gap-8">
                <button className="flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider group">
                  <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  লাইক ({post.likesCount || 0})
                </button>
                <button className="flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider group">
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  কমেন্ট ({post.commentsCount || 0})
                </button>
                <button className="flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider group">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  শেয়ার
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
