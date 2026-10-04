import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  UserProfile,
  ProjectTask,
  ProjectMilestone,
  QualityStandardItem,
  ForumPost,
  MentorBooking,
  StudyCalendarEvent,
  VoiceNote,
  TeamMember,
  GraduationTeam,
} from '../types';
import { INITIAL_TASKS, INITIAL_MILESTONES, QUALITY_STANDARDS, INITIAL_TEAMS } from '../data/graduationProjectData';
import { INITIAL_FORUM_POSTS } from '../data/forumData';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'info' | 'streak' | 'deadline';
  time: string;
  read: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;

  developerCreditAr: string;
  developerCreditEn: string;

  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  completedLessonIds: string[];
  toggleLessonCompletion: (lessonId: string) => void;

  quizScores: Record<string, { score: number; passed: boolean; completedAt: string }>;
  recordQuizScore: (quizId: string, score: number, passed: boolean) => void;

  // Multi-Team Workspace with Secret Password Access
  teams: GraduationTeam[];
  currentTeam: GraduationTeam | null;
  createTeam: (
    name: string,
    projectTitle: string,
    supervisorName: string,
    accessPassword: string,
    university: string,
    department: string
  ) => GraduationTeam;
  loginTeam: (teamId: string, password: string) => { success: boolean; error?: string };
  logoutTeam: () => void;
  addMemberToTeam: (member: Omit<TeamMember, 'id' | 'assignedTasks' | 'completedTasks'>) => void;
  removeMemberFromTeam: (memberId: string) => void;
  addTaskToTeam: (task: Omit<ProjectTask, 'id'>) => void;
  updateTaskStatusInTeam: (taskId: string, status: ProjectTask['status']) => void;
  deleteTaskFromTeam: (taskId: string) => void;
  toggleMilestoneInTeam: (milestoneId: string) => void;
  toggleQualityInTeam: (standardId: string) => void;

  forumPosts: ForumPost[];
  addForumPost: (post: Omit<ForumPost, 'id' | 'upvotes' | 'commentsCount' | 'timestamp' | 'comments'>) => void;
  upvoteForumPost: (postId: string) => void;
  addForumComment: (postId: string, content: string) => void;

  mentorBookings: MentorBooking[];
  bookMentorSession: (booking: Omit<MentorBooking, 'id' | 'status' | 'meetingLink'>) => void;

  studyEvents: StudyCalendarEvent[];
  addStudyEvent: (event: Omit<StudyCalendarEvent, 'id' | 'completed'>) => void;
  toggleStudyEvent: (eventId: string) => void;

  voiceNotes: VoiceNote[];
  addVoiceNote: (note: Omit<VoiceNote, 'id' | 'timestamp'>) => void;
  deleteVoiceNote: (id: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  isOnline: boolean;
  exportProjectDataJson: () => void;
  importProjectDataJson: (jsonData: string) => boolean;
  downloadOfflineStudyPackage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'masar_software_data_v3';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const developerCreditAr = 'إنشاء وتطوير الطالب: أحمد عصام';
  const developerCreditEn = 'Created & Developed by Ahmed Essam';

  // Localization
  const [language, setLanguageState] = useState<Language>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Online Status
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'أحمد عصام',
    university: 'كلية الحاسبات والمعلومات',
    department: 'Software Engineering (هندسة البرمجيات)',
    graduationYear: '2027',
    avatarSeed: 'AhmedEssam',
    studyStreakDays: 14,
    totalStudyHours: 48,
    completedLessonsCount: 6,
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([
    'sa-1',
    'sa-2',
    'node-1',
    'fe-1',
    'db-1',
  ]);

  const [quizScores, setQuizScores] = useState<Record<string, { score: number; passed: boolean; completedAt: string }>>({
    'quiz-system-analysis': { score: 90, passed: true, completedAt: '2026-10-02' },
    'quiz-backend-node': { score: 85, passed: true, completedAt: '2026-10-03' },
  });

  // Teams State
  const [teams, setTeams] = useState<GraduationTeam[]>(INITIAL_TEAMS);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);

  const currentTeam: GraduationTeam | null = teams.find(t => t.id === currentTeamId) || null;

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [mentorBookings, setMentorBookings] = useState<MentorBooking[]>([
    {
      id: 'mb-1',
      mentorId: 'mentor-1',
      mentorName: 'م. حسام العبد الله',
      topic: 'مراجعة وتدقيق معايير تسوية 3NF في الـ ERD لمشروع التخرج',
      slot: 'اليوم 06:00 م - 07:00 م',
      projectNote: 'نريد التأكد من جاهزية العلاقات قبل الانتقال لمرحلة برمجة الـ APIs.',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/cs-grad-demo',
    },
  ]);

  const [studyEvents, setStudyEvents] = useState<StudyCalendarEvent[]>([
    {
      id: 'se-1',
      title: 'مراجعة معايير الـ DFD Level 0 و Level 1 مع المشرف',
      date: '2026-10-06',
      time: '11:00 AM',
      type: 'project_deadline',
      completed: false,
      priority: 'high',
    },
    {
      id: 'se-2',
      title: 'مذاكرة وتطبيق Express Authentication & JWT',
      date: '2026-10-07',
      time: '04:00 PM',
      type: 'study',
      completed: false,
      priority: 'normal',
    },
    {
      id: 'se-3',
      title: 'جلسة التوجيه الفردية مع استشاري معمارية النظم',
      date: '2026-10-08',
      time: '06:00 PM',
      type: 'mentorship',
      completed: false,
      priority: 'high',
    },
  ]);

  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([
    {
      id: 'vn-1',
      title: 'ملاحظة صوتية: توجيهات الدكتور في اجتماع الـ ERD',
      audioUrl: '',
      durationSeconds: 48,
      timestamp: '2026-10-03 14:30',
      relatedTopic: 'ERD & Normalization',
      transcript: 'الدكتور أكد على ضرورة عدم تكرار بيانات الطبيب داخل جدول الكشوفات، وعمل جدول منفصل للتخصصات الطبية.',
    },
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'نظام إدارة فرق مشاريع التخرج',
      message: 'يمكن لكل فريق الآن تسجيل تيمه الخاص، تعيين كلمة مرور، وتوزيع المهام ومتابعة تقدم كل عضو.',
      type: 'info',
      time: 'الآن',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'حماس المذاكرة اليومي 🔥',
      message: 'وصلت إلى 14 يوماً متواصلاً في جدول المذاكرة اليومي. أحسنت يا أحمد!',
      type: 'streak',
      time: 'منذ ساعتين',
      read: false,
    },
  ]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userProfile) setUserProfile(parsed.userProfile);
        if (parsed.completedLessonIds) setCompletedLessonIds(parsed.completedLessonIds);
        if (parsed.quizScores) setQuizScores(parsed.quizScores);
        if (parsed.teams) setTeams(parsed.teams);
        if (parsed.currentTeamId) setCurrentTeamId(parsed.currentTeamId);
        if (parsed.mentorBookings) setMentorBookings(parsed.mentorBookings);
        if (parsed.studyEvents) setStudyEvents(parsed.studyEvents);
        if (parsed.voiceNotes) setVoiceNotes(parsed.voiceNotes);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.language) setLanguageState(parsed.language);
      }
    } catch (e) {
      console.error('Error loading stored app data:', e);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      const dataToSave = {
        userProfile,
        completedLessonIds,
        quizScores,
        teams,
        currentTeamId,
        mentorBookings,
        studyEvents,
        voiceNotes,
        theme,
        language,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Error saving app data:', e);
    }
  }, [userProfile, completedLessonIds, quizScores, teams, currentTeamId, mentorBookings, studyEvents, voiceNotes, theme, language]);

  // Handle Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle Language Direction
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', language);
  }, [language]);

  // Handle Online/Offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle High Contrast
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('ميزة القراءة الصوتية غير مدعومة في متصفحك الحالي.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds(prev => {
      const exists = prev.includes(lessonId);
      const updated = exists ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      setUserProfile(p => ({ ...p, completedLessonsCount: updated.length }));
      return updated;
    });
  };

  const recordQuizScore = (quizId: string, score: number, passed: boolean) => {
    setQuizScores(prev => ({
      ...prev,
      [quizId]: { score, passed, completedAt: new Date().toISOString().split('T')[0] },
    }));
  };

  // Team Management Functions
  const createTeam = (
    name: string,
    projectTitle: string,
    supervisorName: string,
    accessPassword: string,
    university: string,
    department: string
  ): GraduationTeam => {
    const newTeam: GraduationTeam = {
      id: `team-${Date.now()}`,
      name,
      projectTitle,
      supervisorName: supervisorName || 'أ.د. المشرف الأكاديمي',
      accessPassword,
      university: university || 'كلية الحاسبات والمعلومات',
      department: department || 'Software Engineering',
      members: [],
      tasks: INITIAL_TASKS.map(t => ({ ...t, id: `task-${Date.now()}-${t.id}` })),
      milestones: INITIAL_MILESTONES,
      qualityStandards: QUALITY_STANDARDS,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setTeams(prev => [newTeam, ...prev]);
    setCurrentTeamId(newTeam.id);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'تم إنشاء مساحة عمل الفريق',
        message: `تم إنشاء فريق "${name}" بنجاح وتعيين كلمة المرور الخاصة به.`,
        type: 'info',
        time: 'الآن',
        read: false,
      },
      ...prev,
    ]);

    return newTeam;
  };

  const loginTeam = (teamId: string, password: string): { success: boolean; error?: string } => {
    const targetTeam = teams.find(t => t.id === teamId);
    if (!targetTeam) {
      return { success: false, error: language === 'ar' ? 'الفريق غير موجود.' : 'Team not found.' };
    }
    if (targetTeam.accessPassword && targetTeam.accessPassword !== password) {
      return { success: false, error: language === 'ar' ? 'كلمة المرور غير صحيحة.' : 'Incorrect team access code.' };
    }
    setCurrentTeamId(teamId);
    return { success: true };
  };

  const logoutTeam = () => {
    setCurrentTeamId(null);
  };

  const addMemberToTeam = (memberData: Omit<TeamMember, 'id' | 'assignedTasks' | 'completedTasks'>) => {
    if (!currentTeamId) return;

    const newMember: TeamMember = {
      ...memberData,
      id: `member-${Date.now()}`,
      assignedTasks: 0,
      completedTasks: 0,
    };

    setTeams(prev =>
      prev.map(t => (t.id === currentTeamId ? { ...t, members: [...t.members, newMember] } : t))
    );
  };

  const removeMemberFromTeam = (memberId: string) => {
    if (!currentTeamId) return;
    setTeams(prev =>
      prev.map(t =>
        t.id === currentTeamId
          ? {
              ...t,
              members: t.members.filter(m => m.id !== memberId),
              tasks: t.tasks.map(tsk =>
                tsk.assigneeId === memberId
                  ? { ...tsk, assigneeId: '', assigneeName: 'غير معين (Unassigned)' }
                  : tsk
              ),
            }
          : t
      )
    );
  };

  const addTaskToTeam = (taskData: Omit<ProjectTask, 'id'>) => {
    if (!currentTeamId) return;

    const newTask: ProjectTask = {
      ...taskData,
      id: `task-${Date.now()}`,
    };

    setTeams(prev =>
      prev.map(t => {
        if (t.id !== currentTeamId) return t;
        const updatedMembers = t.members.map(m =>
          m.id === newTask.assigneeId ? { ...m, assignedTasks: m.assignedTasks + 1 } : m
        );
        return {
          ...t,
          tasks: [newTask, ...t.tasks],
          members: updatedMembers,
        };
      })
    );
  };

  const updateTaskStatusInTeam = (taskId: string, status: ProjectTask['status']) => {
    if (!currentTeamId) return;

    setTeams(prev =>
      prev.map(t => {
        if (t.id !== currentTeamId) return t;

        const updatedTasks = t.tasks.map(tsk => {
          if (tsk.id !== taskId) return tsk;
          return { ...tsk, status };
        });

        // recalculate members completed tasks
        const updatedMembers = t.members.map(m => {
          const mTasks = updatedTasks.filter(tsk => tsk.assigneeId === m.id);
          const done = mTasks.filter(tsk => tsk.status === 'done').length;
          return { ...m, assignedTasks: mTasks.length, completedTasks: done };
        });

        return {
          ...t,
          tasks: updatedTasks,
          members: updatedMembers,
        };
      })
    );
  };

  const deleteTaskFromTeam = (taskId: string) => {
    if (!currentTeamId) return;

    setTeams(prev =>
      prev.map(t => (t.id === currentTeamId ? { ...t, tasks: t.tasks.filter(tsk => tsk.id !== taskId) } : t))
    );
  };

  const toggleMilestoneInTeam = (milestoneId: string) => {
    if (!currentTeamId) return;

    setTeams(prev =>
      prev.map(t => {
        if (t.id !== currentTeamId) return t;
        const updatedMilestones = t.milestones.map(m => {
          if (m.id !== milestoneId) return m;
          const nextStatus: ProjectMilestone['status'] =
            m.status === 'completed'
              ? 'in_progress'
              : m.status === 'in_progress'
              ? 'upcoming'
              : 'completed';
          return { ...m, status: nextStatus };
        });
        return { ...t, milestones: updatedMilestones };
      })
    );
  };

  const toggleQualityInTeam = (standardId: string) => {
    if (!currentTeamId) return;

    setTeams(prev =>
      prev.map(t => {
        if (t.id !== currentTeamId) return t;
        const updatedQuality = t.qualityStandards.map(q =>
          q.id === standardId ? { ...q, isChecked: !q.isChecked } : q
        );
        return { ...t, qualityStandards: updatedQuality };
      })
    );
  };

  const addForumPost = (postData: Omit<ForumPost, 'id' | 'upvotes' | 'commentsCount' | 'timestamp' | 'comments'>) => {
    const newPost: ForumPost = {
      ...postData,
      id: `post-${Date.now()}`,
      upvotes: 1,
      commentsCount: 0,
      timestamp: 'الآن',
      comments: [],
    };
    setForumPosts(prev => [newPost, ...prev]);
  };

  const upvoteForumPost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const addForumComment = (postId: string, content: string) => {
    setForumPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const newComment = {
          id: `c-${Date.now()}`,
          author: userProfile.name,
          authorRole: userProfile.department,
          timestamp: 'الآن',
          content,
          likes: 0,
        };
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment],
        };
      })
    );
  };

  const bookMentorSession = (bookingData: Omit<MentorBooking, 'id' | 'status' | 'meetingLink'>) => {
    const newBooking: MentorBooking = {
      ...bookingData,
      id: `mb-${Date.now()}`,
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/cs-grad-demo',
    };
    setMentorBookings(prev => [newBooking, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'تأكيد حجز جلسة التوجيه الأكاديمي',
        message: `تم حجز جلستك مع ${bookingData.mentorName} بنجاح لمناقشة "${bookingData.topic}".`,
        type: 'info',
        time: 'الآن',
        read: false,
      },
      ...prev,
    ]);
  };

  const addStudyEvent = (eventData: Omit<StudyCalendarEvent, 'id' | 'completed'>) => {
    const newEvent: StudyCalendarEvent = {
      ...eventData,
      id: `se-${Date.now()}`,
      completed: false,
    };
    setStudyEvents(prev => [...prev, newEvent]);
  };

  const toggleStudyEvent = (eventId: string) => {
    setStudyEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, completed: !e.completed } : e))
    );
  };

  const addVoiceNote = (noteData: Omit<VoiceNote, 'id' | 'timestamp'>) => {
    const newNote: VoiceNote = {
      ...noteData,
      id: `vn-${Date.now()}`,
      timestamp: new Date().toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US'),
    };
    setVoiceNotes(prev => [newNote, ...prev]);
  };

  const deleteVoiceNote = (id: string) => {
    setVoiceNotes(prev => prev.filter(n => n.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Export JSON data
  const exportProjectDataJson = () => {
    const backupData = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      developer: developerCreditAr,
      userProfile,
      completedLessonIds,
      quizScores,
      teams,
      currentTeamId,
      mentorBookings,
      studyEvents,
      voiceNotes,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `masar_software_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON data
  const importProjectDataJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.userProfile) setUserProfile(parsed.userProfile);
      if (parsed.completedLessonIds) setCompletedLessonIds(parsed.completedLessonIds);
      if (parsed.quizScores) setQuizScores(parsed.quizScores);
      if (parsed.teams) setTeams(parsed.teams);
      if (parsed.currentTeamId) setCurrentTeamId(parsed.currentTeamId);
      if (parsed.mentorBookings) setMentorBookings(parsed.mentorBookings);
      if (parsed.studyEvents) setStudyEvents(parsed.studyEvents);
      if (parsed.voiceNotes) setVoiceNotes(parsed.voiceNotes);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  const downloadOfflineStudyPackage = () => {
    exportProjectDataJson();
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: language === 'ar' ? 'تم تنزيل حزمة البيانات بنجاح' : 'Bundle Downloaded Successfully',
        message: language === 'ar' ? 'تم تصدير نسخة احتياطية من كافة المسارات والمهام للعمل دون اتصال بالإنترنت.' : 'All offline progress data has been saved.',
        type: 'info',
        time: 'الآن',
        read: false,
      },
      ...prev,
    ]);
  };

  return (
    <AppContext.Provider
      value={{
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
        speakText,
        stopSpeaking,
        isSpeaking,
        developerCreditAr,
        developerCreditEn,
        userProfile,
        updateUserProfile,
        completedLessonIds,
        toggleLessonCompletion,
        quizScores,
        recordQuizScore,
        teams,
        currentTeam,
        createTeam,
        loginTeam,
        logoutTeam,
        addMemberToTeam,
        removeMemberFromTeam,
        addTaskToTeam,
        updateTaskStatusInTeam,
        deleteTaskFromTeam,
        toggleMilestoneInTeam,
        toggleQualityInTeam,
        forumPosts,
        addForumPost,
        upvoteForumPost,
        addForumComment,
        mentorBookings,
        bookMentorSession,
        studyEvents,
        addStudyEvent,
        toggleStudyEvent,
        voiceNotes,
        addVoiceNote,
        deleteVoiceNote,
        notifications,
        markNotificationRead,
        clearNotifications,
        isOnline,
        exportProjectDataJson,
        importProjectDataJson,
        downloadOfflineStudyPackage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
