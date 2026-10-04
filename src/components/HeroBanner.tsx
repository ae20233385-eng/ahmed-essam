import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowLeft, ArrowRight, BookOpen, Users, CheckCircle, GraduationCap } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { language, setActiveTab, userProfile, completedLessonIds, currentTeam } = useApp();

  const heroImage = '/src/assets/images/hero_graduation_software_1791116271180.jpg';

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white mb-8 border border-slate-800 shadow-xl">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Graduation Project Collaboration"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-700 hover:scale-100"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled CSS fallback container
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl">
        {/* Creator & Faculty Credit Badge (Unboxed text with separators) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-indigo-400 mb-3">
          <span className="font-bold text-white bg-indigo-600/60 border border-indigo-400/40 px-2.5 py-0.5 rounded-lg shadow-sm">
            {language === 'ar' ? 'إنشاء وتطوير الطالب: أحمد عصام' : 'Created & Developed by Ahmed Essam'}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{language === 'ar' ? 'كلية الحاسبات والمعلومات' : 'Faculty of Computers & Information'}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{language === 'ar' ? 'مشروع التخرج دفعة 2027' : 'Graduation Class of 2027'}</span>
        </div>

        {/* Display Headline with text-wrap: balance */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight text-balance">
          {language === 'ar'
            ? 'دليلك الشامل لتعلم هندسة البرمجيات وإنجاز مشروع تخرج استثنائي'
            : 'Your Complete Companion to Master Software Engineering & Excel in Graduation'}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-6">
          {language === 'ar'
            ? 'مسارات تعليمية منظمة تبدأ معك من الصفر، مصادر مجانية ومترجمة بالعربي، نظام إدارة مهام ومخططات ERD & DFD، بنك برومتات Vibe Coding، ونظام متابعة وتقييم دوري متكامل.'
            : 'Curated zero-to-hero tracks, verified Arabic resources, full graduation team timeline, ERD/DFD quality audits, AI Vibe Coding prompts, and real-time comprehension analytics.'}
        </p>

        {/* Interactive Action Points */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('tracks')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 group cursor-pointer"
          >
            <span>{language === 'ar' ? 'ابدأ مسار التعلم الآن' : 'Explore Learning Tracks'}</span>
            {language === 'ar' ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('project_hub')}
            className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 rounded-xl font-semibold text-sm transition-all border border-slate-700/60 flex items-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ar' ? 'متابعة خطة مشروع التخرج' : 'Graduation Team Hub'}</span>
          </button>

          <button
            onClick={() => setActiveTab('vibe_coding')}
            className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl font-semibold text-xs transition-all border border-rose-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>{language === 'ar' ? 'بنك برومتات البرمجة' : 'Vibe Coding AI Lab'}</span>
          </button>
        </div>

        {/* Quiet Footnote stats (Unboxed metadata) */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'ar'
                ? `${completedLessonIds.length} دروس مكتملة لك`
                : `${completedLessonIds.length} lessons mastered`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">🔥 {userProfile.studyStreakDays}</span>
            <span>{language === 'ar' ? 'أيام متتالية في المذاكرة' : 'Days daily streak'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>
              {currentTeam
                ? (language === 'ar'
                    ? `فريقك: ${currentTeam.name} (${currentTeam.members.length} أعضاء)`
                    : `Active: ${currentTeam.name} (${currentTeam.members.length} members)`)
                : (language === 'ar'
                    ? 'فضاء مخصص لكل فريق بكلمة مرور خاصة'
                    : 'Private Team Hub with Password Access')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
