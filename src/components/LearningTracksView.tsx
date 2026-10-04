import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_TRACKS } from '../data/learningTracks';
import { LearningTrack, LearningLesson } from '../types';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ExternalLink,
  Layers,
  Server,
  Database,
  Layout,
  Terminal,
  Sparkles,
  Volume2,
  VolumeX,
  PlayCircle,
  FileText,
  HelpCircle,
  Search,
  Filter,
} from 'lucide-react';

export const LearningTracksView: React.FC = () => {
  const {
    language,
    completedLessonIds,
    toggleLessonCompletion,
    speakText,
    isSpeaking,
    stopSpeaking,
    setActiveTab,
  } = useApp();

  const [selectedTrack, setSelectedTrack] = useState<LearningTrack>(LEARNING_TRACKS[0]);
  const [selectedLesson, setSelectedLesson] = useState<LearningLesson | null>(LEARNING_TRACKS[0].lessons[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredLessons = selectedTrack.lessons.filter(lesson => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.keyConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'all' || lesson.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Concept intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'مسارات تعلم هندسة البرمجيات المنظمة' : 'Structured Software Engineering Tracks'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'مناهج مبسطة تبدأ معك من الصفر، بمصادر عربية مجانية ومترجمة ومعايير أكاديمية لمشروع التخرج.'
              : 'Zero-to-hero curriculum with verified Arabic resources and academic graduation criteria.'}
          </p>
        </div>

        {/* Search & Filter Controls (Functional Button Tabs) */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث في الدروس أو المفاهيم...' : 'Search lessons or concepts...'}
              className="ps-9 pe-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {(['all', 'Beginner', 'Intermediate'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterDifficulty === diff
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {diff === 'all'
                  ? language === 'ar' ? 'الكل' : 'All'
                  : diff === 'Beginner'
                  ? language === 'ar' ? 'مبتدئ' : 'Beginner'
                  : language === 'ar' ? 'متوسط' : 'Interm.'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track Selector */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {LEARNING_TRACKS.map(track => {
          const isSelected = selectedTrack.id === track.id;
          const doneLessonsCount = track.lessons.filter(l => completedLessonIds.includes(l.id)).length;

          return (
            <button
              key={track.id}
              onClick={() => {
                setSelectedTrack(track);
                setSelectedLesson(track.lessons[0] || null);
              }}
              className={`p-3.5 rounded-2xl border text-start shrink-0 transition-all cursor-pointer min-w-[220px] max-w-[280px] ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-slate-900 dark:text-white shadow-sm ring-1 ring-indigo-600/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {getTrackIcon(track.iconName)}
                </div>
                <span className="font-bold text-xs truncate">
                  {language === 'ar' ? track.title : track.titleEn}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{track.lessons.length} {language === 'ar' ? 'دروس' : 'lessons'}</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {doneLessonsCount}/{track.lessons.length}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Track Details & Deliverable Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 text-indigo-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="font-bold text-white block mb-0.5">
            {language === 'ar' ? selectedTrack.title : selectedTrack.titleEn}
          </span>
          <span>{language === 'ar' ? selectedTrack.description : selectedTrack.descriptionEn}</span>
        </div>
        <div className="shrink-0 pt-2 sm:pt-0 sm:border-s sm:border-indigo-800/60 sm:ps-4">
          <div className="text-[11px] text-indigo-300 font-semibold mb-0.5">
            {language === 'ar' ? 'معيار تسليم مشروع التخرج:' : 'Graduation Deliverable:'}
          </div>
          <div className="text-white font-medium text-xs">
            {selectedTrack.graduationDeliverable}
          </div>
        </div>
      </div>

      {/* Two-Zone Layout: Left/Top Lesson List (40%), Right/Bottom Interactive Stage (60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Lessons List Column (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            {language === 'ar' ? 'قائمة الدروس في هذا المسار' : 'Lessons in this track'}
          </div>

          {filteredLessons.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              {language === 'ar' ? 'لم يتم العثور على دروس تطابق البحث.' : 'No lessons matching criteria.'}
            </div>
          ) : (
            filteredLessons.map((lesson, idx) => {
              const isSelected = selectedLesson?.id === lesson.id;
              const isCompleted = completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs ${
                    isSelected
                      ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompletion(lesson.id);
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'border border-slate-300 dark:border-slate-600 text-transparent hover:border-emerald-500'
                        }`}
                        title={language === 'ar' ? 'تحديد كمنجز' : 'Toggle Completed'}
                      >
                        <CheckCircle className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {language === 'ar' ? lesson.title : lesson.titleEn}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 tabular-nums shrink-0">
                      {lesson.durationMinutes} {language === 'ar' ? 'د' : 'min'}
                    </span>
                  </div>

                  <p className="text-slate-500 line-clamp-2 leading-relaxed ps-7">
                    {language === 'ar' ? lesson.description : lesson.descriptionEn}
                  </p>

                  <div className="ps-7 mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {lesson.difficulty}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{lesson.arabicResources.length} {language === 'ar' ? 'مصادر عربية' : 'Arabic sources'}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Lesson Interactive Viewer (7 cols) */}
        <div className="lg:col-span-7">
          {selectedLesson ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              {/* Header with Title and Speech Reader */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    <span>{language === 'ar' ? selectedTrack.title : selectedTrack.titleEn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">{selectedLesson.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? selectedLesson.title : selectedLesson.titleEn}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Speech Reader */}
                  <button
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeaking();
                      } else {
                        const contentToRead = `${selectedLesson.title}. ${selectedLesson.description}. المفاهيم الأساسية: ${selectedLesson.keyConcepts.join(', ')}. التمرين العملي: ${selectedLesson.practicalExercise.goal}`;
                        speakText(contentToRead);
                      }
                    }}
                    title={language === 'ar' ? 'استمع للشرح بالصوت' : 'Read lesson aloud'}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Toggle Completed */}
                  <button
                    onClick={() => toggleLessonCompletion(selectedLesson.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      completedLessonIds.includes(selectedLesson.id)
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {completedLessonIds.includes(selectedLesson.id)
                        ? language === 'ar' ? 'مكتمل' : 'Completed'
                        : language === 'ar' ? 'تحديد كمنجز' : 'Mark Complete'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {language === 'ar' ? selectedLesson.description : selectedLesson.descriptionEn}
              </p>

              {/* Key Concepts (Clean unboxed tags) */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'المفاهيم البرمجية الأساسية' : 'Core Concepts'}
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedLesson.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Free Curated Arabic Resources (Translated & Verified) */}
              <div>
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4" />
                  <span>{language === 'ar' ? 'مصادر مجانية ومترجمة بالعربي' : 'Free Arabic & Translated Resources'}</span>
                </h4>
                <div className="space-y-2">
                  {selectedLesson.arabicResources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 text-xs transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center shrink-0">
                          <PlayCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {res.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {res.instructor}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Practical Exercise Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>{language === 'ar' ? 'تمرين عملي لمشروع التخرج' : 'Practical Graduation Exercise'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedLesson.practicalExercise.goal}
                </p>
                <div className="space-y-1.5 pt-1">
                  {selectedLesson.practicalExercise.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200 shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoint Quiz CTA if available */}
              {selectedLesson.checkpointQuizId && (
                <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs">
                  <div>
                    <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
                      {language === 'ar' ? 'جاهز لاختبار استيعابك؟' : 'Ready to test your comprehension?'}
                    </span>
                    <span className="text-indigo-700 dark:text-indigo-300 text-[11px]">
                      {language === 'ar' ? 'احصل على تقييم فوري وتحليل نقاط قوتك' : 'Get immediate academic assessment'}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('quizzes')}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs transition cursor-pointer"
                  >
                    {language === 'ar' ? 'بدء الاختبار' : 'Launch Quiz'}
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              {language === 'ar' ? 'اختر درساً من القائمة لبدء الشرح والتطبيق.' : 'Select a lesson to begin.'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
