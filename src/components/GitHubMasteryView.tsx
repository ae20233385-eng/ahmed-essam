import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GIT_COMMANDS, GRADUATION_GIT_FLOW_STEPS, README_TEMPLATE } from '../data/gitHubGuide';
import { GitCommand } from '../data/gitHubGuide';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  Copy,
  Check,
  Download,
  BookOpen,
  Terminal,
  FileCode,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

export const GitHubMasteryView: React.FC = () => {
  const { language } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedReadme, setCopiedReadme] = useState(false);

  const categories = ['all', 'Setup', 'Branching', 'Daily Work', 'Collaboration', 'Rescue'];

  const filteredCommands = GIT_COMMANDS.filter(cmd => {
    if (selectedCategory === 'all') return true;
    return cmd.category === selectedCategory;
  });

  const handleCopyCommand = (cmd: GitCommand) => {
    navigator.clipboard.writeText(cmd.example);
    setCopiedCommand(cmd.command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(README_TEMPLATE);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([README_TEMPLATE], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>{language === 'ar' ? 'دليل احتراف Git & GitHub لمشاريع التخرج' : 'Git & GitHub Project Mastery'}</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'كيفية إدارة كود الفريق، تنظيم الفروع، تفادي الـ Conflicts، وتوثيق المشروع باحترافية للجنة التحكيم.'
              : 'Team branch workflows, conflict resolution, PR standards, and jury-ready documentation.'}
          </p>
        </div>

        <button
          onClick={handleDownloadReadme}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'ar' ? 'تحميل قالب README.md' : 'Download README.md'}</span>
        </button>
      </div>

      {/* Graduation Git Flow Architecture Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'دورة عمل الفريق في Git (Team Git Flow)' : 'Graduation Team Git Flow'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {GRADUATION_GIT_FLOW_STEPS.map(step => (
            <div
              key={step.stepNumber}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {step.stepNumber}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {step.title}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Git Commands Cheat Sheet */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{language === 'ar' ? 'أوامر Git الأساسية للعمل اليومي' : 'Essential Git Cheat Sheet'}</span>
          </h3>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? (language === 'ar' ? 'الكل' : 'All') : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredCommands.map((cmd, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                    {cmd.command}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {cmd.category}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'ar' ? cmd.description : cmd.descriptionEn}
                </p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  {language === 'ar' ? `💡 نصيحة أكاديمية: ${cmd.academicTip}` : `💡 Academic Tip: ${cmd.academicTip}`}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <pre className="p-2.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] border border-slate-800 dir-ltr text-left overflow-x-auto max-w-xs">
                  {cmd.example}
                </pre>
                <button
                  onClick={() => handleCopyCommand(cmd)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  title={language === 'ar' ? 'نسخ الأمر' : 'Copy command'}
                >
                  {copiedCommand === cmd.command ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional README Template Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'ar' ? 'قالب توثيق README.md المعتمد لمشاريع التخرج' : 'Academic README.md Documentation Standard'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ar'
                ? 'توثيق شامل يعكس معمارية النظم والمخططات وأعضاء الفريق وطريقة التشغيل.'
                : 'Comprehensive template showcasing architecture, diagrams, team roles, and test commands.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReadme}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedReadme ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'نسخ القالب' : 'Copy Markdown'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <pre className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-80 leading-relaxed border border-slate-800 dir-ltr text-left">
          {README_TEMPLATE}
        </pre>
      </div>

    </div>
  );
};
