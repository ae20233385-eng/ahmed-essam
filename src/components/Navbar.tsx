import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Moon,
  Globe,
  Bell,
  Eye,
  Download,
  Upload,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    isSpeaking,
    stopSpeaking,
    notifications,
    markNotificationRead,
    isOnline,
    exportProjectDataJson,
    importProjectDataJson,
    downloadOfflineStudyPackage,
    developerCreditAr,
    developerCreditEn,
    currentTeam,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'dashboard', labelAr: 'الرئيسية', labelEn: 'Overview' },
    { id: 'tracks', labelAr: 'المسارات', labelEn: 'Tracks' },
    { id: 'project_hub', labelAr: 'مشروع التخرج', labelEn: 'Grad Hub' },
    { id: 'quizzes', labelAr: 'الاختبارات', labelEn: 'Assessments' },
    { id: 'vibe_coding', labelAr: 'الذكاء الاصطناعي', labelEn: 'AI & Vibe' },
    { id: 'courses', labelAr: 'المصادر المترجمة', labelEn: 'Resources' },
    { id: 'forum', labelAr: 'المنتدى', labelEn: 'Forum' },
    { id: 'github_guide', labelAr: 'دليل GitHub', labelEn: 'GitHub' },
    { id: 'mentorship', labelAr: 'التوجيه', labelEn: 'Mentors' },
    { id: 'calendar', labelAr: 'التقويم والملاحظات', labelEn: 'Schedule' },
  ];

  const primaryNavLinks = navLinks.slice(0, 5);
  const secondaryNavLinks = navLinks.slice(5);

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const success = importProjectDataJson(importJsonText);
    if (success) {
      setImportMessage(language === 'ar' ? 'تمت مزامنة واستيراد البيانات بنجاح!' : 'Data synced successfully!');
      setTimeout(() => {
        setShowSyncModal(false);
        setImportMessage(null);
        setImportJsonText('');
      }, 1200);
    } else {
      setImportMessage(language === 'ar' ? 'فشل الاستيراد: يرجى التحقق من صيغة الـ JSON.' : 'Import failed: Invalid JSON structure.');
    }
  };

  return (
    <>
      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark + developer attribution */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-xl font-bold tracking-tight text-slate-950 dark:text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                م
              </div>
              <span className="font-bold tracking-tight">
                {language === 'ar' ? 'مسار السوفت وير' : 'Masar Software'}
              </span>
            </button>
            <span className="hidden xl:inline text-[11px] font-medium text-slate-500 dark:text-slate-400 border-s border-slate-200 dark:border-slate-800 ps-2.5">
              {language === 'ar' ? developerCreditAr : developerCreditEn}
            </span>
          </div>

          {/* Zone 2: Navigation Links (single-line, hover underlines, clean unboxed) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            {primaryNavLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`whitespace-nowrap transition-colors py-1 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {language === 'ar' ? link.labelAr : link.labelEn}
                </button>
              );
            })}

            {/* Dropdown for remaining links to keep clean top bar contract */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-1 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
                <span>{language === 'ar' ? 'المزيد' : 'More'}</span>
                <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full start-0 mt-1 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 hidden group-hover:block transition-all z-50">
                {secondaryNavLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`w-full text-start px-4 py-2 text-xs font-medium transition-colors ${
                      activeTab === link.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {language === 'ar' ? link.labelAr : link.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active Team Badge / Access Team Space */}
            {currentTeam ? (
              <button
                onClick={() => setActiveTab('project_hub')}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 truncate max-w-[150px] cursor-pointer"
                title={language === 'ar' ? `فريقك النشط: ${currentTeam.name}` : `Active Team: ${currentTeam.name}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="truncate">{currentTeam.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('project_hub')}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 cursor-pointer"
              >
                <span>{language === 'ar' ? 'فضاء الفرق' : 'Team Space'}</span>
              </button>
            )}

            {/* Online/Offline Status Indicator */}
            <div
              title={isOnline ? (language === 'ar' ? 'متصل بالإنترنت' : 'Online') : (language === 'ar' ? 'العمل دون اتصال' : 'Offline Mode')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 ${
                isOnline
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </div>

            {/* Download Website & Code Hub */}
            <button
              onClick={() => setShowSyncModal(true)}
              title={language === 'ar' ? 'تحميل الموقع والكود المصدري' : 'Download Site & Source Code'}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'ar' ? 'تحميل الموقع' : 'Download App'}</span>
            </button>

            {/* Accessibility Customization Menu */}
            <button
              onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
              title={language === 'ar' ? 'إمكانية الوصول والخط' : 'Accessibility Settings'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Text to Speech Stop/Status if reading */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title={language === 'ar' ? 'إيقاف القراءة الصوتية' : 'Stop Audio Reader'}
                className="p-2 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 animate-pulse"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={language === 'ar' ? 'التنبيهات' : 'Notifications'}
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 end-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute end-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'تنبيهات المذاكرة والمهام' : 'Study & Project Alerts'}
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">
                        {language === 'ar' ? 'لا توجد تنبيهات حالياً' : 'No notifications'}
                      </p>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 rounded-xl cursor-pointer transition-colors text-xs ${
                            notif.read
                              ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                              : 'bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold mb-1">
                            <span className="text-indigo-600 dark:text-indigo-400">{notif.title}</span>
                            <span className="text-[10px] text-slate-400">{notif.time}</span>
                          </div>
                          <p className="leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
              title="تغيير اللغة / Switch Language"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'الوضع الليلي للمذاكرة' : 'Night Mode')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row (Horizontal scrollable tabs) */}
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800/80 px-4 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                activeTab === link.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {language === 'ar' ? link.labelAr : link.labelEn}
            </button>
          ))}
        </div>
      </header>

      {/* Accessibility Panel Modal */}
      {showAccessibilityMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تخصيص العرض وإمكانية الوصول' : 'Accessibility & Display'}
                </h3>
              </div>
              <button
                onClick={() => setShowAccessibilityMenu(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-sm">
              {/* Font Size Scaling */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {language === 'ar' ? 'حجم الخط في المنصة' : 'Text Font Size'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'large', 'xlarge'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        fontSize === size
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {size === 'normal'
                        ? language === 'ar' ? 'طبيعي (A)' : 'Standard'
                        : size === 'large'
                        ? language === 'ar' ? 'كبير (A+)' : 'Large'
                        : language === 'ar' ? 'كبير جداً (A++)' : 'Extra Large'}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Mode */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                    {language === 'ar' ? 'وضع التباين العالي (High Contrast)' : 'High Contrast Mode'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'ar' ? 'يبرز الحدود والنصوص بوضوح فائق لتقليل إجهاد العين' : 'Enhances contrast and sharpens borders'}
                  </div>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    highContrast ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      highContrast ? (language === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Audio Screen Reader info */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'يمكنك النقر على زر الاستماع الصوتي بجانب أي درس أو ملخص للاستماع للشرح بصوت واضح.'
                    : 'Click the audio reader button next to any lesson to listen aloud.'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowAccessibilityMenu(false)}
              className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-xl font-medium text-xs hover:bg-indigo-700 transition"
            >
              {language === 'ar' ? 'حفظ وإغلاق' : 'Save & Close'}
            </button>
          </div>
        </div>
      )}

      {/* Download Center & Sync Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'مركز تحميل وتثبيت الموقع والمشروع' : 'Download & Installation Center'}
                </h3>
              </div>
              <button
                onClick={() => setShowSyncModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option 1: Download Full Source Code ZIP */}
              <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>📦 {language === 'ar' ? 'تحميل الكود المصدري كاملاً (ZIP Archive)' : 'Download Full Source Code (.ZIP)'}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {language === 'ar'
                        ? 'حمل كود المشروع بالكامل جاهزاً للتشغيل على جهازك بواسطة VS Code، ويحتوي على كافة المسارات ولوحة مهام الفريق والاختبارات.'
                        : 'Download the complete source code ready to run on VS Code with all tracks and team hub.'}
                    </div>
                  </div>
                  <a
                    href="/masar_software_project.zip"
                    download="masar_software_project.zip"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تحميل ZIP (2.7MB)' : 'Download ZIP'}</span>
                  </a>
                </div>

                {/* Instructions to run locally */}
                <div className="p-2.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] space-y-1">
                  <div className="text-slate-400 text-[10px] font-sans">
                    {language === 'ar' ? 'خطوات التشغيل على جهازك:' : 'How to run on your machine:'}
                  </div>
                  <div>1. unzip masar_software_project.zip</div>
                  <div>2. npm install</div>
                  <div>3. npm run dev</div>
                </div>
              </div>

              {/* Option 2: Install as Web App / PWA */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <span>📱 {language === 'ar' ? 'تثبيت الموقع كتطبيق (Install Web App / PWA)' : 'Install as Desktop / Mobile App'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {language === 'ar'
                    ? 'يمكنك تثبيت الموقع ليعمل مثل تطبيق مستقل على الكمبيوتر أو الموبايل بدون متصفح ويعمل دون اتصال بالإنترنت بالكامل:'
                    : 'Install the platform as a standalone app on your desktop or phone with offline support:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold block text-slate-800 dark:text-slate-200 mb-0.5">💻 {language === 'ar' ? 'على الكمبيوتر (Chrome / Edge)' : 'On PC/Mac:'}</span>
                    <span>{language === 'ar' ? 'اضغط على أيقونة التثبيت (Install) بجوار شريط العنوان في المتصفح.' : 'Click the Install icon in the browser URL bar.'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold block text-slate-800 dark:text-slate-200 mb-0.5">📱 {language === 'ar' ? 'على الهاتف (Android / iPhone)' : 'On Phone:'}</span>
                    <span>{language === 'ar' ? 'من قائمة المتصفح اضغط "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).' : 'Tap Share -> Add to Home Screen.'}</span>
                  </div>
                </div>
              </div>

              {/* Option 3: Export & Import Offline Data */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      🔄 {language === 'ar' ? 'تصدير ومزامنة بيانات الفريق والمسارات (JSON)' : 'Export & Sync Progress Data'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'ar' ? 'حفظ نسخة من درجاتك ومهام التيم لنقلها لجهاز آخر' : 'Export team tasks and progress backup'}
                    </div>
                  </div>
                  <button
                    onClick={downloadOfflineStudyPackage}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium text-xs transition cursor-pointer"
                  >
                    {language === 'ar' ? 'تصدير JSON' : 'Export JSON'}
                  </button>
                </div>

                <form onSubmit={handleImportSubmit} className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                    {language === 'ar' ? 'استيراد نسخة احتياطية من جهاز آخر:' : 'Import backup JSON:'}
                  </label>
                  <textarea
                    value={importJsonText}
                    onChange={e => setImportJsonText(e.target.value)}
                    placeholder={language === 'ar' ? 'الصق كود الـ JSON هنا للمزامنة...' : 'Paste backup JSON here...'}
                    rows={2}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono text-[10px] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />

                  {importMessage && (
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-medium text-[11px]">
                      {importMessage}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs cursor-pointer"
                    >
                      {language === 'ar' ? 'تأكيد الاستيراد' : 'Import'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowSyncModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl font-semibold text-xs transition cursor-pointer"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
