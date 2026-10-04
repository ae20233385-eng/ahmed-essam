import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ForumPost } from '../types';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Pin,
  Send,
  X,
  Code2,
  Filter,
} from 'lucide-react';

export const ForumView: React.FC = () => {
  const { language, forumPosts, addForumPost, upvoteForumPost, addForumComment, userProfile } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // New post state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('graduation_project');

  const categories = [
    { id: 'all', labelAr: 'جميع النقاشات', labelEn: 'All Posts' },
    { id: 'graduation_project', labelAr: 'مشاريع التخرج', labelEn: 'Grad Projects' },
    { id: 'erd_analysis', labelAr: 'الـ ERD وتحليل النظم', labelEn: 'ERD & Analysis' },
    { id: 'code_help', labelAr: 'مساعدة برمجية', labelEn: 'Code Help' },
    { id: 'career_guidance', labelAr: 'التوجيه وسوق العمل', labelEn: 'Career' },
  ];

  const filteredPosts = forumPosts.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addForumPost({
      author: userProfile.name,
      authorRole: `${userProfile.department} - سنة رابعة`,
      avatarSeed: userProfile.avatarSeed,
      title: newTitle,
      content: newContent,
      codeSnippet: newCode.trim() || undefined,
      category: newCategory,
    });

    setNewTitle('');
    setNewContent('');
    setNewCode('');
    setShowNewPostModal(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;
    addForumComment(postId, text);
    setCommentInput(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'منتدى النقاش وتبادل الخبرات بين الطلبة' : 'Student Community & Discussion Forum'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'اطرح أسئلتك حول مشاريع التخرج، استشر زملاءك في حلول الـ ERD والبرمجة، وشارك تجاربك.'
              : 'Ask graduation project questions, exchange ERD architecture advice, and collaborate.'}
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ar' ? 'طرح سؤال أو موضوع جديد' : 'New Question'}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {language === 'ar' ? cat.labelAr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredPosts.map(post => {
          const isExpanded = expandedPostId === post.id;

          return (
            <div
              key={post.id}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all space-y-4 text-xs ${
                post.isPinned
                  ? 'border-indigo-300 dark:border-indigo-800 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              {/* Author & Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-xs shrink-0">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {post.author}
                      </span>
                      {post.isPinned && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                          <Pin className="w-3 h-3 fill-current" />
                          <span>{language === 'ar' ? 'مثبت' : 'Pinned'}</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {post.authorRole} · {post.timestamp}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  #{post.category}
                </span>
              </div>

              {/* Title & Content */}
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                {post.title}
              </h3>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Code Snippet if present */}
              {post.codeSnippet && (
                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 dir-ltr text-left">
                  <code>{post.codeSnippet}</code>
                </pre>
              )}

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => upvoteForumPost(post.id)}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="tabular-nums">{post.upvotes}</span>
                  </button>

                  <button
                    onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="tabular-nums">{post.comments.length}</span>
                    <span>{language === 'ar' ? 'تعليقات' : 'Replies'}</span>
                  </button>
                </div>
              </div>

              {/* Expanded Comments & Reply Form */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in">
                  <div className="space-y-3">
                    {post.comments.map(c => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-900 dark:text-white">{c.author}</span>
                          <span className="text-slate-400">{c.timestamp}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                          {c.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Reply Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={commentInput[post.id] || ''}
                      onChange={e => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleSendComment(post.id)}
                      placeholder={language === 'ar' ? 'اكتب ردك أو نصيحتك لزميلك...' : 'Write your answer or suggestion...'}
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'طرح سؤال أو موضوع جديد في المنتدى' : 'Ask a Question in Student Community'}
              </h3>
              <button onClick={() => setShowNewPostModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'عنوان الموضوع أو السؤال' : 'Post Title'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: كيف أربط جدول المشرف بالطلاب في الـ ERD؟' : 'e.g. How to structure supervisor relationship in ERD?'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'القسم' : 'Category'}
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="graduation_project">{language === 'ar' ? 'مشاريع التخرج' : 'Graduation Projects'}</option>
                  <option value="erd_analysis">{language === 'ar' ? 'الـ ERD وتحليل النظم' : 'ERD & Analysis'}</option>
                  <option value="code_help">{language === 'ar' ? 'مساعدة برمجية' : 'Code Help'}</option>
                  <option value="career_guidance">{language === 'ar' ? 'سوق العمل والتوجيه' : 'Career Guidance'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'تفاصيل السؤال أو الاستفسار' : 'Question Details'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder={language === 'ar' ? 'اشرح المشكلة بالتفصيل...' : 'Detail your issue...'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'كود توضيحي (اختياري)' : 'Code Snippet (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  placeholder={language === 'ar' ? 'الصق كود SQL أو JavaScript هنا...' : 'Paste code here...'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono text-[11px] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                >
                  {language === 'ar' ? 'نشر السؤال' : 'Post Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
