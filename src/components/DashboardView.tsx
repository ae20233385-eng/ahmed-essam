import React from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_TRACKS } from '../data/learningTracks';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Flame,
  Layers,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Download,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    language,
    setActiveTab,
    userProfile,
    completedLessonIds,
    quizScores,
    currentTeam,
    teams,
    developerCreditAr,
    developerCreditEn,
  } = useApp();

  const totalPossibleLessons = LEARNING_TRACKS.reduce((acc, t) => acc + t.lessons.length, 0);
  const completionPercentage = Math.round((completedLessonIds.length / totalPossibleLessons) * 100);

  // Get active team's tasks and milestones or default empty
  const activeTasks = currentTeam ? currentTeam.tasks : [];
  const activeMilestones = currentTeam ? currentTeam.milestones : [];
  const activeQuality = currentTeam ? currentTeam.qualityStandards : [];

  // Comprehension Analysis across key academic disciplines
  const comprehensionSkills = [
    {
      skillAr: 'تحليل النظم والـ ERD والـ DFD',
      skillEn: 'System Analysis, ERD & DFD',
      score: quizScores['quiz-system-analysis'] ? quizScores['quiz-system-analysis'].score : 90,
      benchmark: 85,
      statusAr: 'متقن ومستعد للمناقشة',
      statusEn: 'Jury Ready',
    },
    {
      skillAr: 'الباك إند وواجهات الـ REST API',
      skillEn: 'Backend Node.js & REST APIs',
      score: quizScores['quiz-backend-node'] ? quizScores['quiz-backend-node'].score : 85,
      benchmark: 80,
      statusAr: 'أداء ممتاز',
      statusEn: 'Excellent',
    },
    {
      skillAr: 'قواعد البيانات العلاقية و SQL',
      skillEn: 'Databases & SQL Normalization',
      score: quizScores['quiz-databases'] ? quizScores['quiz-databases'].score : 88,
      benchmark: 75,
      statusAr: 'مستوى متقدم',
      statusEn: 'Advanced',
    },
    {
      skillAr: 'الواجهات الحديثة والتجاوب',
      skillEn: 'Frontend & Responsive UI',
      score: quizScores['quiz-frontend-js'] ? quizScores['quiz-frontend-js'].score : 92,
      benchmark: 80,
      statusAr: 'متقن بالكامل',
      statusEn: 'Mastered',
    },
    {
      skillAr: 'الـ Vibe Coding وهندسة البرومت',
      skillEn: 'Vibe Coding & AI Workflows',
      score: 95,
      benchmark: 70,
      statusAr: 'سرعة إنتاجية فائقة',
      statusEn: '10x Velocity',
    },
  ];

  const urgentTasks = activeTasks.filter(t => t.priority === 'urgent' && t.status !== 'done');
  const checkedQualityCount = activeQuality.filter(q => q.isChecked).length;
  const qualityPercentage = activeQuality.length > 0 ? Math.round((checkedQualityCount / activeQuality.length) * 100) : 100;

  const currentMilestone = activeMilestones.find(m => m.status === 'in_progress') || activeMilestones[1] || {
    title: 'المرحلة 2: تحليل النظم والـ ERD',
    titleEn: 'Phase 2: System Analysis & ERD',
    targetDate: '2026-12-30',
    description: 'رسم الـ ERD والتحقق من 3NF وصياغة DFD Level 0 و Level 1.',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Metric Strip (Clean Single-Elevation Cards with Unboxed Metadata) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak Counter */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {userProfile.studyStreakDays} <span className="text-xs font-normal text-slate-400">{language === 'ar' ? 'يوم' : 'days'}</span>
            </div>
            <div className="text-xs text-slate-500">
              {language === 'ar' ? 'المواظبة اليومية' : 'Daily Streak'}
            </div>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {completedLessonIds.length} <span className="text-xs font-normal text-slate-400">/ {totalPossibleLessons}</span>
            </div>
            <div className="text-xs text-slate-500">
              {language === 'ar' ? 'دروس منجزة' : 'Lessons Done'}
            </div>
          </div>
        </div>

        {/* Study Hours */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {userProfile.totalStudyHours} <span className="text-xs font-normal text-slate-400">{language === 'ar' ? 'ساعة' : 'hrs'}</span>
            </div>
            <div className="text-xs text-slate-500">
              {language === 'ar' ? 'ساعات المذاكرة' : 'Total Study'}
            </div>
          </div>
        </div>

        {/* Quality Standard Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {qualityPercentage}%
            </div>
            <div className="text-xs text-slate-500">
              {language === 'ar' ? 'معايير جودة التسليم' : 'Academic QA Score'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Comprehensive Analytics + Current Project Sprint */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Comprehension Analytics & Track Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Comprehension Analytics Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>{language === 'ar' ? 'تحليل مستوى استيعاب المهارات التقنية' : 'Skill Comprehension Analytics'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'ar'
                    ? 'تقييم دوري مبني على نتائج الاختبارات والتمارين العملية في المنصة'
                    : 'Periodic evaluation calibrated against quizzes and exercises'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('quizzes')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'خوض اختبار جديد' : 'Take Quiz'}
              </button>
            </div>

            {/* Comprehension Bars */}
            <div className="space-y-4 pt-2">
              {comprehensionSkills.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {language === 'ar' ? item.skillAr : item.skillEn}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">
                        {language === 'ar' ? item.statusAr : item.statusEn}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {item.score}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Tracks Preview */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'مسارات التعلم من الصفر' : 'Foundation Learning Tracks'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'ar' ? 'مسارات مصممة خصيصاً لطلبة حاسبات لمشروع التخرج' : 'Structured tracks customized for CS graduation'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('tracks')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'ar' ? 'عرض كافة المسارات' : 'View All'}</span>
                {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LEARNING_TRACKS.slice(0, 4).map(track => {
                const trackDoneLessons = track.lessons.filter(l => completedLessonIds.includes(l.id)).length;
                const trackPct = Math.round((trackDoneLessons / track.lessons.length) * 100);

                return (
                  <div
                    key={track.id}
                    onClick={() => setActiveTab('tracks')}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {language === 'ar' ? track.title : track.titleEn}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                      {language === 'ar' ? track.subtitle : track.subtitleEn}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                        <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                          {trackDoneLessons} / {track.lessons.length} ({trackPct}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{ width: `${trackPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Urgent Team Deadlines & Graduation Sprint */}
        <div className="space-y-6">
          
          {/* Graduation Milestone Spotlight */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-950 text-white border border-indigo-800/50 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="text-xs font-semibold text-indigo-300">
                {language === 'ar' ? 'المرحلة الحالية لمشروع التخرج' : 'Active Graduation Milestone'}
              </div>
              <h4 className="text-lg font-bold text-white leading-snug">
                {language === 'ar' ? currentMilestone.title : currentMilestone.titleEn}
              </h4>
              <p className="text-xs text-indigo-200 leading-relaxed">
                {currentMilestone.description}
              </p>

              <div className="pt-2 border-t border-indigo-800/60 flex items-center justify-between text-xs">
                <span className="text-indigo-300">{language === 'ar' ? 'موعد التسليم للمشرف:' : 'Target Date:'}</span>
                <span className="font-bold text-white tabular-nums">{currentMilestone.targetDate}</span>
              </div>

              <button
                onClick={() => setActiveTab('project_hub')}
                className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition cursor-pointer"
              >
                {language === 'ar' ? 'لوحة مهام الفريق (Kanban)' : 'Go to Team Kanban'}
              </button>
            </div>
          </div>

          {/* Urgent Deadline Warnings */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>{language === 'ar' ? 'مهام عاجلة اقترب موعدها' : 'Urgent Task Deadlines'}</span>
              </h3>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {urgentTasks.length} {language === 'ar' ? 'مهام' : 'tasks'}
              </span>
            </div>

            <div className="space-y-3">
              {urgentTasks.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs text-center font-medium">
                  {language === 'ar' ? 'ممتاز! لا توجد مهام متأخرة أو عاجلة حالياً.' : 'Great job! No urgent overdue tasks.'}
                </div>
              ) : (
                urgentTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {task.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 shrink-0">
                        {task.deliverableType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>{language === 'ar' ? `المسؤول: ${task.assigneeName}` : `Assignee: ${task.assigneeName}`}</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400 tabular-nums">
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Action: Vibe Coding & Prompts */}
          <div
            onClick={() => setActiveTab('vibe_coding')}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white cursor-pointer hover:border-rose-500/50 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">
                  {language === 'ar' ? 'مختبر الـ Vibe Coding' : 'AI Vibe Coding Lab'}
                </h4>
                <div className="text-[11px] text-slate-400">
                  {language === 'ar' ? 'برومتات جاهزة لمشاريع التخرج' : 'Ready architectural prompts'}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'استخدم برومتات الـ ERD و Express و Unit Tests لتوليد مخططات وأكواد نظيفة بسرعة خيالية.'
                : 'Accelerate ERD and API development with tested architectural prompts.'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
