import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { StudyCalendarEvent, VoiceNote } from '../types';
import {
  Calendar as CalendarIcon,
  Mic,
  MicOff,
  Play,
  Square,
  Trash2,
  Plus,
  CheckCircle2,
  Clock,
  Volume2,
  FileAudio,
  AlertTriangle,
  Flame,
} from 'lucide-react';

export const StudyCalendarView: React.FC = () => {
  const {
    language,
    studyEvents,
    addStudyEvent,
    toggleStudyEvent,
    voiceNotes,
    addVoiceNote,
    deleteVoiceNote,
    userProfile,
  } = useApp();

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-10-10');
  const [newTime, setNewTime] = useState('04:00 PM');
  const [newType, setNewType] = useState<StudyCalendarEvent['type']>('study');

  // Voice Note Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceTitle, setVoiceTitle] = useState('');
  const [voiceTopic, setVoiceTopic] = useState('ERD & System Analysis');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission not granted or unsupported, simulating voice memo mode:', err);
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
    if (!recordedAudioUrl) {
      setRecordedAudioUrl('simulated-voice-memo');
    }
  };

  const handleSaveVoiceNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceTitle.trim()) return;

    addVoiceNote({
      title: voiceTitle,
      audioUrl: recordedAudioUrl || '',
      durationSeconds: recordingDuration || 35,
      relatedTopic: voiceTopic,
      transcript: voiceTranscript.trim() || undefined,
    });

    setVoiceTitle('');
    setVoiceTranscript('');
    setRecordedAudioUrl(null);
    setRecordingDuration(0);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addStudyEvent({
      title: newTitle,
      date: newDate,
      time: newTime,
      type: newType,
      priority: newType === 'project_deadline' ? 'high' : 'normal',
    });

    setNewTitle('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>{language === 'ar' ? 'التقويم الدراسي والملاحظات الصوتية' : 'Study Schedule & Voice Notes'}</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'تنظيم جدول المذاكرة اليومي، متابعة مواعيد اجتماعات المشرف، وتسجيل الملاحظات الصوتية أثناء العمل.'
              : 'Daily schedule tracking, thesis supervisor meeting reminders, and audio voice memos.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-3.5 py-1.5 rounded-xl border border-amber-200/80 dark:border-amber-900/40 text-xs font-bold self-start sm:self-auto">
          <Flame className="w-4 h-4 fill-current animate-pulse" />
          <span>{userProfile.studyStreakDays} {language === 'ar' ? 'أيام متتالية في جدول المذاكرة' : 'Days Daily Streak'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 6 cols: Study Tasks & Schedule Calendar */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Add Study Event Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'ar' ? 'إضافة موعد مذاكرة أو تسليم جديد' : 'Schedule Study Session or Deadline'}</span>
            </h3>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder={language === 'ar' ? 'مثال: مذاكرة الـ Joins في SQL وحل تمرين الـ ERD' : 'e.g. Study SQL joins & solve ERD exercise'}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  placeholder="04:00 PM"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-center"
                />
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="study">{language === 'ar' ? 'مذاكرة' : 'Study'}</option>
                  <option value="project_deadline">{language === 'ar' ? 'تسليم مهمة' : 'Deadline'}</option>
                  <option value="quiz">{language === 'ar' ? 'اختبار' : 'Quiz'}</option>
                  <option value="mentorship">{language === 'ar' ? 'استشارة' : 'Mentorship'}</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition cursor-pointer"
              >
                {language === 'ar' ? 'إضافة إلى الجدول' : 'Add to Schedule'}
              </button>
            </form>
          </div>

          {/* Schedule Events List */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'ar' ? 'جدول المواعيد والمهام القادمة' : 'Upcoming Tasks & Reminders'}
            </h3>

            <div className="space-y-3">
              {studyEvents.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  {language === 'ar' ? 'لا توجد مواعيد مضافة حالياً.' : 'No scheduled events.'}
                </div>
              ) : (
                studyEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => toggleStudyEvent(event.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                      event.completed
                        ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 text-slate-400'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStudyEvent(event.id);
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                          event.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {event.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <span className={`font-semibold block ${event.completed ? 'line-through text-slate-400' : ''}`}>
                          {event.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {event.date} · {event.time}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {event.type === 'project_deadline'
                        ? language === 'ar' ? 'موعد تسليم' : 'Deadline'
                        : event.type === 'mentorship'
                        ? language === 'ar' ? 'استشارة' : 'Mentorship'
                        : language === 'ar' ? 'مذاكرة' : 'Study'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 6 cols: Voice Notes Recorder & Audio Memos */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Recorder Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileAudio className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{language === 'ar' ? 'تسجيل الملاحظات الصوتية (Voice Memos)' : 'Record Voice Note'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'ar'
                    ? 'سجل صوتك لتوثيق ملاحظات اجتماع المشرف أو تلخيص الأفكار أثناء البرمجة.'
                    : 'Record audio memos to capture supervisor meeting notes and thesis insights.'}
                </p>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-7 h-7" />}
                </button>
              </div>

              <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                {isRecording
                  ? `${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, '0')}`
                  : language === 'ar' ? 'اضغط للبدء بالتسجيل الصوتي' : 'Tap to start recording'}
              </div>

              {recordedAudioUrl && !isRecording && (
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  ✓ {language === 'ar' ? 'تم تسجيل الملاحظة الصوتية! أدخل العنوان لحفظها.' : 'Audio captured! Enter title to save.'}
                </div>
              )}
            </div>

            {/* Save Form */}
            {(recordedAudioUrl || isRecording) && (
              <form onSubmit={handleSaveVoiceNote} className="space-y-3 text-xs pt-2">
                <input
                  type="text"
                  required
                  value={voiceTitle}
                  onChange={e => setVoiceTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'عنوان الملاحظة (مثال: نصائح الدكتور في اجتماع DFD)' : 'Note title (e.g. Supervisor notes on DFD)'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />

                <textarea
                  rows={2}
                  value={voiceTranscript}
                  onChange={e => setVoiceTranscript(e.target.value)}
                  placeholder={language === 'ar' ? 'تفريغ نصي أو ملخص سريع للملاحظة...' : 'Summary or transcript text...'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />

                <button
                  type="submit"
                  disabled={isRecording}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-semibold transition cursor-pointer"
                >
                  {language === 'ar' ? 'حفظ الملاحظة الصوتية' : 'Save Voice Memo'}
                </button>
              </form>
            )}
          </div>

          {/* Saved Voice Notes List */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span>{language === 'ar' ? 'الملاحظات الصوتية المحفوظة' : 'Saved Audio Notes'}</span>
              <span className="text-xs text-slate-400 tabular-nums">{voiceNotes.length}</span>
            </h3>

            <div className="space-y-3">
              {voiceNotes.map(note => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {note.title}
                    </span>
                    <button
                      onClick={() => deleteVoiceNote(note.id)}
                      className="text-slate-400 hover:text-rose-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>🕒 {note.durationSeconds}s</span>
                    <span>🏷️ {note.relatedTopic}</span>
                    <span>📅 {note.timestamp}</span>
                  </div>

                  {note.transcript && (
                    <p className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {note.transcript}
                    </p>
                  )}

                  {note.audioUrl && (
                    <audio controls className="w-full h-8 pt-1" src={note.audioUrl}>
                      Your browser does not support audio playback.
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
