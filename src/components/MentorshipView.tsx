import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENTORS } from '../data/mentors';
import { Mentor } from '../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  Users,
  Video,
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const MentorshipView: React.FC = () => {
  const { language, mentorBookings, bookMentorSession } = useApp();

  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [topicInput, setTopicInput] = useState('');
  const [slotInput, setSlotInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setSlotInput(mentor.availableSlots[0]);
    setTopicInput('');
    setNoteInput('');
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !topicInput.trim()) return;

    bookMentorSession({
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      topic: topicInput,
      slot: slotInput,
      projectNote: noteInput,
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedMentor(null);
      setBookingSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'جلسات التوجيه الفردية مع خبراء البرمجيات' : '1-on-1 Technical Mentorship & Office Hours'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'احجز جلسة استشارية خاصة لمراجعة الـ ERD، فحص كود المشروع، والاستعداد لمناقشة التخرج مع نخبة من المهندسين.'
              : 'Book dedicated office hours to audit your ERD, review code, and prepare for your graduation defense.'}
          </p>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MENTORS.map(mentor => (
          <div
            key={mentor.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-600 transition"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-bold text-lg text-indigo-600 dark:text-indigo-400 shrink-0">
                  {mentor.name.split(' ')[1]?.[0] || mentor.name[0]}
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold tabular-nums">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{mentor.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({mentor.sessionsCount})</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {mentor.name}
                </h3>
                <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {language === 'ar' ? mentor.title : mentor.titleEn}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {mentor.company}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {mentor.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {mentor.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400">
                <span>{language === 'ar' ? 'المواعيد المتاحة:' : 'Next Slot:'} </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {mentor.availableSlots[0]}
                </span>
              </div>

              <button
                onClick={() => handleOpenBooking(mentor)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ar' ? 'حجز موعد استشارة' : 'Book Office Hours'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmed Bookings Section */}
      {mentorBookings.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>{language === 'ar' ? 'جلسات التوجيه المحجوزة الخاصة بك' : 'Your Scheduled Mentorship Sessions'}</span>
          </h3>

          <div className="space-y-3">
            {mentorBookings.map(b => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {b.mentorName} — <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{b.topic}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-3">
                    <span>🕒 {b.slot}</span>
                    {b.projectNote && <span>📝 {b.projectNote}</span>}
                  </div>
                </div>

                <a
                  href={b.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>{language === 'ar' ? 'رابط Google Meet' : 'Join Call'}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? `حجز جلسة مع ${selectedMentor.name}` : `Book Session with ${selectedMentor.name}`}
                </h3>
                <div className="text-xs text-slate-500">{selectedMentor.title}</div>
              </div>
              <button onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تم تأكيد حجز الجلسة بنجاح!' : 'Session Confirmed!'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? 'تم إرسال رابط الاجتماع إلى لوحة المتابعة وتنبيهاتك.' : 'Meeting link generated.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'موضوع الاستشارة الفنية' : 'Consultation Topic'}
                  </label>
                  <input
                    type="text"
                    required
                    value={topicInput}
                    onChange={e => setTopicInput(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: مراجعة الـ 3NF في الـ ERD وتدقيق DFD Level 1' : 'e.g. Audit ERD 3NF and DFD Level 1'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'اختر الموعد المناسب' : 'Select Time Slot'}
                  </label>
                  <select
                    value={slotInput}
                    onChange={e => setSlotInput(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    {selectedMentor.availableSlots.map((slot, sIdx) => (
                      <option key={sIdx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'ملاحظة أو استفسار محدد للمرشد' : 'Specific Question or Note'}
                  </label>
                  <textarea
                    rows={2}
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    placeholder={language === 'ar' ? 'أرفق أي تفاصيل تود من المرشد الاطلاع عليها مسبقاً...' : 'Add any context for the mentor...'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                  >
                    {language === 'ar' ? 'تأكيد الحجز الفوري' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
