import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURATED_COURSES } from '../data/curatedCourses';
import { CuratedCourse } from '../types';
import {
  Search,
  ExternalLink,
  BookOpen,
  Star,
  CheckCircle,
  PlayCircle,
  GraduationCap,
  Globe,
  Filter,
} from 'lucide-react';

export const CoursesDirectoryView: React.FC = () => {
  const { language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyArabicTranslated, setOnlyArabicTranslated] = useState(false);

  const categories = [
    'all',
    'System Analysis',
    'Backend',
    'Database',
    'Frontend',
    'Python',
    'Git & DevOps',
    'Vibe Coding',
  ];

  const filteredCourses = CURATED_COURSES.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesArabicFilter = !onlyArabicTranslated || course.isArabicTranslated;

    return matchesSearch && matchesCategory && matchesArabicFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'دليل الكورسات والمصادر المترجمة بالعربي' : 'Curated Software Courses & Translated Hub'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'مكتبة شاملة من الكورسات المجانية الموثوقة ومصادر التعلم المترجمة لكافة مجالات هندسة البرمجيات.'
              : 'Verified free courses and Arabic-translated resources across all software engineering disciplines.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن كورس، مدرب، أو تقنية...' : 'Search courses, tutors, or tags...'}
            className="w-full ps-9 pe-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filter Tabs & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto scrollbar-none max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'all'
                ? language === 'ar' ? 'جميع المجالات' : 'All Disciplines'
                : cat}
            </button>
          ))}
        </div>

        {/* Toggle Arabic Translated */}
        <button
          onClick={() => setOnlyArabicTranslated(!onlyArabicTranslated)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition cursor-pointer ${
            onlyArabicTranslated
              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'المصادر المترجمة بالعربي فقط' : 'Arabic Translated Only'}</span>
        </button>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            {language === 'ar' ? 'لم يتم العثور على كورسات تطابق معايير البحث.' : 'No courses found matching your query.'}
          </div>
        ) : (
          filteredCourses.map(course => (
            <div
              key={course.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{course.instructor}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.platform}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {course.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {course.isFree ? (language === 'ar' ? 'مجاني 100%' : '100% Free') : ''}
                </div>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>{language === 'ar' ? 'مشاهدة الكورس' : 'Open Course'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
