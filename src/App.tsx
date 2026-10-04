/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DashboardView } from './components/DashboardView';
import { LearningTracksView } from './components/LearningTracksView';
import { QuizAssessmentView } from './components/QuizAssessmentView';
import { GraduationProjectHub } from './components/GraduationProjectHub';
import { AIVibeCodingLab } from './components/AIVibeCodingLab';
import { CoursesDirectoryView } from './components/CoursesDirectoryView';
import { ForumView } from './components/ForumView';
import { GitHubMasteryView } from './components/GitHubMasteryView';
import { MentorshipView } from './components/MentorshipView';
import { StudyCalendarView } from './components/StudyCalendarView';
import { Layers, Github, BookOpen, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, fontSize, language, setActiveTab } = useApp();

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[17px]';
      case 'xlarge':
        return 'text-[18.5px]';
      default:
        return 'text-[15px]';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors ${getFontSizeClass()}`}>
      {/* 3-Zone Top Bar */}
      <Navbar />

      {/* Main Viewport Container (1440px max width baseline) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <>
            <HeroBanner />
            <DashboardView />
          </>
        )}

        {activeTab === 'tracks' && <LearningTracksView />}
        {activeTab === 'project_hub' && <GraduationProjectHub />}
        {activeTab === 'quizzes' && <QuizAssessmentView />}
        {activeTab === 'vibe_coding' && <AIVibeCodingLab />}
        {activeTab === 'courses' && <CoursesDirectoryView />}
        {activeTab === 'forum' && <ForumView />}
        {activeTab === 'github_guide' && <GitHubMasteryView />}
        {activeTab === 'mentorship' && <MentorshipView />}
        {activeTab === 'calendar' && <StudyCalendarView />}
      </main>

      {/* Quiet Footer adhering to Anti-Slop Guidelines */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 transition-colors mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {language === 'ar' ? 'مسار السوفت وير' : 'Masar Software'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {language === 'ar' ? 'إنشاء وتطوير الطالب: أحمد عصام' : 'Created & Developed by Ahmed Essam'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {language === 'ar'
                ? 'كلية الحاسبات والمعلومات'
                : 'Faculty of Computers & Information'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('tracks')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'المسارات' : 'Tracks'}
            </button>
            <button
              onClick={() => setActiveTab('project_hub')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'مشروع التخرج' : 'Grad Hub'}
            </button>
            <button
              onClick={() => setActiveTab('vibe_coding')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'الـ Vibe Coding' : 'AI Prompts'}
            </button>
            <button
              onClick={() => setActiveTab('github_guide')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              GitHub
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
