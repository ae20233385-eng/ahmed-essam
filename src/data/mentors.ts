import { Mentor } from '../types';

export const MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'م. حسام العبد الله',
    title: 'مهندس معمارية برمجيات رئيسي (Principal Software Architect)',
    titleEn: 'Principal Software Architect',
    company: 'Ex-Amazon / Senior Tech Consultant',
    bio: 'خبير في تصميم معمارية النظم الضخمة، تدقيق ومراجعة الـ ERD والـ Microservices، وتحكيم مشاريع التخرج الأكاديمية لأكثر من 8 سنوات.',
    specialties: ['System Architecture', 'ERD & 3NF Auditing', 'Clean Code', 'API Design'],
    rating: 4.98,
    sessionsCount: 142,
    availableSlots: [
      'اليوم 06:00 م - 07:00 م',
      'غداً 08:00 م - 09:00 م',
      'الخميس 05:00 م - 06:00 م',
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'mentor-2',
    name: 'د. ياسمين فؤاد',
    title: 'أستاذة مساعدة واستشارية هندسة النظم وتحليل البيانات',
    titleEn: 'Assistant Professor & Systems Engineering Consultant',
    company: 'جامعة القاهرة - كلية الحاسبات والذكاء الاصطناعي',
    bio: 'متخصصة في مراجعة وثائق الـ SRS ومخططات الـ DFD وحالات الاستخدام، وتوجيه الطلاب لاجتياز مناقشات التخرج بامتياز.',
    specialties: ['Requirements Engineering (SRS)', 'DFD & UML', 'Academic Thesis Defense', 'Data Modeling'],
    rating: 4.95,
    sessionsCount: 98,
    availableSlots: [
      'الأربعاء 04:00 م - 05:00 م',
      'السبت 07:00 م - 08:00 م',
    ],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'mentor-3',
    name: 'م. كريم زيدان',
    title: 'قائد فريق Full-Stack وباحث في Vibe Coding',
    titleEn: 'Full-Stack Lead & Vibe Coding Evangelist',
    company: 'Tech Scale-up Lead',
    bio: 'مطور خبير في React و Node.js، يساعد الطلاب في بناء الـ Prototypes وتوظيف الذكاء الاصطناعي لتسريع بناء مشاريع التخرج.',
    specialties: ['Full Stack Node & React', 'Vibe Coding with AI', 'Debugging & Performance', 'Git Flow for Teams'],
    rating: 4.92,
    sessionsCount: 116,
    availableSlots: [
      'غداً 09:00 م - 10:00 م',
      'الأحد 06:30 م - 07:30 م',
    ],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  },
];
