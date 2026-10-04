import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZZES } from '../data/quizzes';
import { Quiz, QuizQuestion } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Layers,
  BookOpen,
  TrendingUp,
} from 'lucide-react';

export const QuizAssessmentView: React.FC = () => {
  const { language, quizScores, recordQuizScore, setActiveTab } = useApp();

  const [activeQuiz, setActiveQuiz] = useState<Quiz>(QUIZZES[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const currentQuestion: QuizQuestion | undefined = activeQuiz.questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const passed = finalScore >= activeQuiz.passingScore;
    return { correctCount, finalScore, passed };
  };

  const handleSubmitQuiz = () => {
    const { finalScore, passed } = calculateResult();
    setIsSubmitted(true);
    recordQuizScore(activeQuiz.id, finalScore, passed);
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setReviewMode(false);
  };

  const { correctCount, finalScore, passed } = isSubmitted ? calculateResult() : { correctCount: 0, finalScore: 0, passed: false };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'الاختبارات الدورية وتقييم الاستيعاب' : 'Periodic Assessments & Comprehension'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'اختبارات تقنية شاملة لكل مسار لقياس جاهزيتك الأكاديمية لمناقشة مشروع التخرج.'
              : 'End-to-end technical quizzes calibrated to prepare you for your thesis jury defense.'}
          </p>
        </div>

        {/* Quiz Track Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {QUIZZES.map(q => {
            const isSelected = activeQuiz.id === q.id;
            const pastAttempt = quizScores[q.id];

            return (
              <button
                key={q.id}
                onClick={() => {
                  setActiveQuiz(q);
                  handleRestartQuiz();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{language === 'ar' ? q.title.split(' - ')[0] : q.titleEn.split(' - ')[0]}</span>
                {pastAttempt && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${pastAttempt.passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {pastAttempt.score}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Area */}
      {!isSubmitted ? (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? activeQuiz.title : activeQuiz.titleEn}
            </span>
            <span className="tabular-nums font-semibold">
              {language === 'ar' ? `السؤال ${currentQuestionIndex + 1} من ${activeQuiz.questions.length}` : `Question ${currentQuestionIndex + 1} of ${activeQuiz.questions.length}`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {currentQuestion.topicTag}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {language === 'ar' ? currentQuestion.question : currentQuestion.questionEn}
            </h3>

            {/* Optional Code Snippet */}
            {currentQuestion.codeSnippet && (
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 dir-ltr text-left">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {(language === 'ar' ? currentQuestion.options : currentQuestion.optionsEn).map((optionText, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-start transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm font-medium ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-100 ring-1 ring-indigo-600/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-300 dark:border-slate-600 text-slate-500'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span>{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation & Submit Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              {language === 'ar' ? 'السابق' : 'Previous'}
            </button>

            {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
                {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-md"
              >
                {language === 'ar' ? 'إنهاء وحساب النتيجة' : 'Submit & Calculate Score'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            {passed ? <Award className="w-10 h-10 text-emerald-500" /> : <RotateCcw className="w-10 h-10 text-amber-500" />}
          </div>

          <div>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-1">
              {finalScore}%
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {passed
                ? language === 'ar' ? 'تهانينا! لقد اجتزت التقييم بنجاح' : 'Congratulations! Assessment Passed'
                : language === 'ar' ? 'أداء جيد، ولكنك بحاجة لبعض المراجعة' : 'Good effort! Review Recommended'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'ar'
                ? `أجبت بشكل صحيح على ${correctCount} من ${activeQuiz.questions.length} أسئلة (درجة النجاح: ${activeQuiz.passingScore}%)`
                : `Answered ${correctCount} out of ${activeQuiz.questions.length} correctly (Passing score: ${activeQuiz.passingScore}%)`}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setReviewMode(!reviewMode)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              {reviewMode
                ? language === 'ar' ? 'إخفاء مراجعة الإجابات' : 'Hide Review'
                : language === 'ar' ? 'مراجعة الإجابات والشرح التفصيلي' : 'Review Explanations'}
            </button>

            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              {language === 'ar' ? 'إعادة الاختبار' : 'Retake Quiz'}
            </button>
          </div>

          {/* Detailed Question Review List */}
          {reviewMode && (
            <div className="text-start space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'ar' ? 'الشرح الأكاديمي والتحليل التفصيلي:' : 'Detailed Academic Review:'}
              </h4>
              {activeQuiz.questions.map((q, idx) => {
                const studentAns = selectedAnswers[idx];
                const isCorrect = studentAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {language === 'ar' ? q.question : q.questionEn}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </div>

                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">{language === 'ar' ? 'إجابتك: ' : 'Your answer: '}</span>
                      <span>{language === 'ar' ? q.options[studentAns] : q.optionsEn[studentAns]}</span>
                    </div>

                    {!isCorrect && (
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span>{language === 'ar' ? 'الإجابة الصحيحة: ' : 'Correct answer: '}</span>
                        <span>{language === 'ar' ? q.options[q.correctIndex] : q.optionsEn[q.correctIndex]}</span>
                      </div>
                    )}

                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                        {language === 'ar' ? '💡 التبرير الأكاديمي:' : '💡 Academic Rationale:'}
                      </span>
                      {language === 'ar' ? q.explanation : q.explanationEn}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
