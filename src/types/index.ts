export type Language = 'ar' | 'en';

export interface UserProfile {
  name: string;
  university: string;
  department: string;
  graduationYear: string;
  avatarSeed: string;
  studyStreakDays: number;
  totalStudyHours: number;
  completedLessonsCount: number;
}

export interface LearningLesson {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn?: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyConcepts: string[];
  arabicResources: {
    title: string;
    instructor: string;
    url: string;
    type: 'video' | 'article' | 'docs' | 'repo';
  }[];
  englishResources: {
    title: string;
    source: string;
    url: string;
    type: 'video' | 'article' | 'docs' | 'repo';
  }[];
  practicalExercise: {
    goal: string;
    steps: string[];
    starterCode?: string;
  };
  checkpointQuizId?: string;
}

export interface LearningTrack {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  gradient: string;
  estimatedWeeks: number;
  totalLessons: number;
  prerequisites: string[];
  lessons: LearningLesson[];
  graduationDeliverable: string; // How this track ties into the graduation project
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  codeSnippet?: string;
  options: string[];
  optionsEn: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
  topicTag: string; // e.g., 'System Analysis', 'ERD', 'Node.js', 'Databases', 'React'
}

export interface Quiz {
  id: string;
  trackId: string;
  title: string;
  titleEn: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  email: string;
  github: string;
  avatar: string;
  assignedTasks: number;
  completedTasks: number;
}

export interface GraduationTeam {
  id: string;
  name: string;
  projectTitle: string;
  supervisorName: string;
  accessPassword: string;
  university: string;
  department: string;
  members: TeamMember[];
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  qualityStandards: QualityStandardItem[];
  createdAt: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  deliverableType: 'ERD' | 'DFD' | 'Activity Diagram' | 'System Architecture' | 'API' | 'Frontend' | 'Database' | 'Documentation';
  estimatedHours: number;
  isUrgent?: boolean;
}

export interface ProjectMilestone {
  id: string;
  phaseNumber: number;
  title: string;
  titleEn: string;
  targetDate: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  requirements: string[];
}

export interface QualityStandardItem {
  id: string;
  category: 'ERD' | 'DFD' | 'Activity Diagram' | 'System Architecture' | 'Node & API' | 'Testing & Git';
  title: string;
  ruleExplanation: string;
  isChecked: boolean;
  academicImportance: string;
}

export interface CuratedCourse {
  id: string;
  title: string;
  instructor: string;
  platform: string;
  url: string;
  language: 'ar' | 'en';
  isArabicTranslated: boolean;
  category: 'Frontend' | 'Backend' | 'Database' | 'System Analysis' | 'Python' | 'Git & DevOps' | 'Vibe Coding';
  level: 'Beginner' | 'Intermediate' | 'All Levels';
  rating: number;
  isFree: boolean;
  tags: string[];
}

export interface ForumComment {
  id: string;
  author: string;
  authorRole: string;
  timestamp: string;
  content: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  author: string;
  authorRole: string;
  avatarSeed: string;
  title: string;
  content: string;
  codeSnippet?: string;
  category: 'graduation_project' | 'code_help' | 'erd_analysis' | 'career_guidance';
  upvotes: number;
  commentsCount: number;
  timestamp: string;
  comments: ForumComment[];
  isPinned?: boolean;
}

export interface AIPromptTemplate {
  id: string;
  category: 'System Architecture & ERD' | 'Backend Scaffolding' | 'Vibe Coding & Debug' | 'Testing & Docs';
  title: string;
  titleEn: string;
  description: string;
  promptText: string;
  exampleVariables: Record<string, string>;
  vibeTip: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  titleEn: string;
  company: string;
  bio: string;
  specialties: string[];
  rating: number;
  sessionsCount: number;
  availableSlots: string[];
  avatar: string;
}

export interface MentorBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  slot: string;
  projectNote: string;
  status: 'confirmed' | 'pending';
  meetingLink: string;
}

export interface VoiceNote {
  id: string;
  title: string;
  audioUrl: string;
  durationSeconds: number;
  timestamp: string;
  relatedTopic: string;
  transcript?: string;
}

export interface StudyCalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'study' | 'project_deadline' | 'quiz' | 'mentorship';
  completed: boolean;
  priority: 'high' | 'normal';
}
