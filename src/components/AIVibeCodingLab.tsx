import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AI_PROMPT_TEMPLATES } from '../data/aiPrompts';
import { AIPromptTemplate } from '../types';
import {
  Sparkles,
  Copy,
  Check,
  Send,
  Loader2,
  Terminal,
  Cpu,
  Layers,
  HelpCircle,
  Code2,
  BookOpen,
} from 'lucide-react';

export const AIVibeCodingLab: React.FC = () => {
  const { language } = useApp();

  const [selectedPrompt, setSelectedPrompt] = useState<AIPromptTemplate>(AI_PROMPT_TEMPLATES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live AI Playground state
  const [customInput, setCustomInput] = useState('');
  const [aiMode, setAiMode] = useState<'general' | 'prompt_optimizer' | 'diagram_advisor'>('general');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const vibeBannerImage = '/src/assets/images/vibe_coding_ai_lab_1791116295783.jpg';

  const handleCopyPrompt = (prompt: AIPromptTemplate) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendToAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptToSend = customInput.trim() || selectedPrompt.promptText;
    if (!promptToSend) return;

    setIsLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          type: aiMode,
          context: 'منصة مسار السوفت وير لطلبة كليات الحاسبات والمعلومات ومشاريع التخرج',
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setAiResponse(data.reply);
      } else if (data.fallbackReply) {
        setAiResponse(data.fallbackReply);
      } else {
        setAiResponse('حدث خطأ أثناء معالجة الطلب.');
      }
    } catch (err) {
      console.error(err);
      setAiResponse('عذراً، تعذر الاتصال بالخادم. تأكد من اتصال الإنترنت.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Vibe Coding Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8">
        <div className="absolute inset-0 z-0">
          <img
            src={vibeBannerImage}
            alt="AI Vibe Coding Workspace"
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ar' ? 'ثورة البرمجة السريعة: Vibe Coding' : 'Modern Vibe Coding Paradigm'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'ar'
              ? 'مكتبة برومتات البرمجة والتعامل الاحترافي مع الذكاء الاصطناعي'
              : 'AI Prompt Engineering & Vibe Coding Mastery'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'ar'
              ? 'تعلم كيف تصيغ برومتات معمارية دقيقة لتوجيه نماذج الذكاء الاصطناعي في مشروع التخرج: توليد الـ ERD والـ SQL، تفكيك الـ DFD، بناء الـ APIs، والتشخيص الجذري للأخطاء دون كسر الكود.'
              : 'Master architectural prompts to steer AI models in your graduation project: generate normalized ERDs, balanced DFDs, clean APIs, and robust unit tests.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Prompts Library (Left) + Interactive AI Playground (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Prompts Library Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'ar' ? 'بنك البرومتات الجاهزة' : 'Tested Prompt Templates'}</span>
            </h3>
            <span className="text-xs text-slate-400">{AI_PROMPT_TEMPLATES.length} {language === 'ar' ? 'قوالب' : 'templates'}</span>
          </div>

          <div className="space-y-3">
            {AI_PROMPT_TEMPLATES.map(prompt => {
              const isSelected = selectedPrompt.id === prompt.id;

              return (
                <div
                  key={prompt.id}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                    isSelected
                      ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {language === 'ar' ? prompt.title : prompt.titleEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 shrink-0">
                      {prompt.category}
                    </span>
                  </div>

                  <p className="text-slate-500 line-clamp-2 leading-relaxed">
                    {prompt.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="text-slate-400 font-medium">
                      💡 {language === 'ar' ? 'نصيحة المهندس:' : 'Vibe Tip:'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPrompt(prompt);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    >
                      {copiedId === prompt.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'نسخ البرومت' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Prompt Viewer & Live AI Tester (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Prompt Inspector Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                  {selectedPrompt.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? selectedPrompt.title : selectedPrompt.titleEn}
                </h3>
              </div>

              <button
                onClick={() => handleCopyPrompt(selectedPrompt)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shrink-0"
              >
                {copiedId === selectedPrompt.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{language === 'ar' ? 'تم النسخ بنجاح' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{language === 'ar' ? 'نسخ البرومت كاملاً' : 'Copy Full Prompt'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Code Block */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {language === 'ar' ? 'نص البرومت التقني:' : 'Prompt Structure:'}
              </label>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 dir-ltr text-left">
                {selectedPrompt.promptText}
              </pre>
            </div>

            {/* Vibe Tip callout */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
              <span className="text-base shrink-0">💡</span>
              <div className="leading-relaxed">
                <span className="font-bold block mb-0.5">{language === 'ar' ? 'سر نجاح هذا البرومت في Vibe Coding:' : 'Vibe Coding Tip:'}</span>
                <span>{selectedPrompt.vibeTip}</span>
              </div>
            </div>
          </div>

          {/* Live AI Playground */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {language === 'ar' ? 'تجربة واختبار البرومت مع الذكاء الاصطناعي الحي' : 'Live Interactive AI Playground'}
                </h3>
              </div>

              {/* Mode Selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
                {(['general', 'prompt_optimizer', 'diagram_advisor'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setAiMode(mode)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                      aiMode === mode
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {mode === 'general'
                      ? language === 'ar' ? 'عام' : 'General'
                      : mode === 'prompt_optimizer'
                      ? language === 'ar' ? 'تحسين برومت' : 'Optimizer'
                      : language === 'ar' ? 'مستشار ERD' : 'Diagrams'}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendToAI} className="space-y-3">
              <textarea
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                rows={3}
                placeholder={
                  language === 'ar'
                    ? 'اكتب سؤالك التقني، أو عدل على البرومت، أو الصق فكرة مشروعك هنا للاستشارة...'
                    : 'Ask your software question, customize prompt variables, or paste project idea...'
                }
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {language === 'ar' ? 'مدعوم بمحرك Gemini 3.8 Flash' : 'Powered by Gemini 3.8 Flash'}
                </span>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'ar' ? 'جاري التحليل والتوليد...' : 'Generating...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إرسال وتجربة الآن' : 'Test with AI'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Response Display */}
            {aiResponse && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{language === 'ar' ? 'رد واستشارة الذكاء الاصطناعي:' : 'AI Engineering Analysis:'}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiResponse);
                      alert(language === 'ar' ? 'تم نسخ الرد!' : 'Response copied!');
                    }}
                    className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'نسخ الرد' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
