import { ForumPost } from '../types';

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'طارق النجار',
    authorRole: 'طالب حاسبات ومعلومات - سنة رابعة',
    avatarSeed: 'TarekElNaggar',
    title: 'سؤال بخصوص الـ ERD لمشروع التخرج: هل الأفضل جعل جدول المستخدمين موحداً مع Roles أم جدول منفصل لكل دور؟',
    content: 'فريقنا يبني منصة رعاية صحية تجمع (مرضى، أطباء، ومديري مستشفيات). هل الأصح أكاديمياً وفي معايير الـ 3NF عمل جدول `users` موحد ونضع فيه حقل `role_id`، أم إنشاء جدول منفصل لكل نوع مستخدم؟ المشرف علق على النقطة دي ومحتاجين نصيحة مجربة.',
    codeSnippet: `// خيار 1: جدول موحد
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash TEXT,
  role VARCHAR(20) -- 'patient', 'doctor', 'admin'
);`,
    category: 'erd_analysis',
    upvotes: 24,
    commentsCount: 3,
    timestamp: 'منذ ساعتين',
    isPinned: true,
    comments: [
      {
        id: 'c-1',
        author: 'م. حسام العبد الله',
        authorRole: 'Principal Software Architect',
        timestamp: 'منذ ساعة',
        content: 'الأفضل والمعتمد في أغلب لجان التحكيم والأنظمة الحقيقية هو نمط Single Table Inheritance أو Class Table Inheritance: جدول `users` يحتوي على الحقول المشتركة للتوثيق والأمان (id, email, password_hash, role)، وجداول منفصلة مثل `doctors_profiles` و `patients_profiles` ترتبط بـ user_id كـ Foreign Key لتخزين البيانات الخاصة بكل دور (مثل رقم الترخيص للطبيب، وتاريخ الميلاد والتأمين للمريض). هذا يضمن 3NF كامل ويمنع الـ NULL values الكثيرة.',
        likes: 18,
      },
      {
        id: 'c-2',
        author: 'سارة عبد الرحمن',
        authorRole: 'Frontend & UI/UX',
        timestamp: 'منذ 45 دقيقة',
        content: 'طبقنا هذا الحل في مشروعنا واعتمدته لجنة القسم بدون أي تعديل! وفر علينا وقت كبير في الـ JWT Token.',
        likes: 6,
      },
    ],
  },
  {
    id: 'post-2',
    author: 'يوسف جمال',
    authorRole: 'طالب هندسة برمجيات - سنة ثالثة',
    avatarSeed: 'YoussefGamal',
    title: 'كيف نظمتم خطة العمل بين أعضاء الفريق لتجنب التعارض في GitHub؟',
    content: 'في أول أسبوعين من المشروع كان بيحصل عندنا Merge Conflicts باستمرار على فرع main وكنا بنضيع ساعات في حلها. هل ممكن حد يشارك الـ Git Flow اللي شغالين بيه لمشروع التخرج؟',
    category: 'graduation_project',
    upvotes: 19,
    commentsCount: 2,
    timestamp: 'منذ 5 ساعات',
    comments: [
      {
        id: 'c-3',
        author: 'أحمد محمود',
        authorRole: 'Team Lead',
        timestamp: 'منذ 3 ساعات',
        content: 'قفلنا الدفع المباشر على main بـ Branch Protection Rule، وكل عضو بيعمل branch باسم feature/اسم-المهمة ويعمل Pull Request مع مراجعة من عضو تاني قبل الدمج. التزمنا أيضاً بتقسيم المهام في الـ Kanban Board هنا بالمنصة، والمشاكل اختفت تماماً.',
        likes: 11,
      },
    ],
  },
  {
    id: 'post-3',
    author: 'ندى عثمان',
    authorRole: 'طالبة حاسبات ومعلومات - ذكاء اصطناعي',
    avatarSeed: 'NadaOsman',
    title: 'تجربتي مع الـ Vibe Coding واستخدام البرومتات في تسريع النماذج الأولية للـ API',
    content: 'حبيت أشارك تجربتي: باستخدام بنك البرومتات الموجود في المنصة مع Gemini، قدرنا نولد هيكل الـ Express Controller والـ Zod Schema كاملة في أقل من نصف ساعة، وبعدها راجعنا الكود وطبقنا الـ Unit Tests. السر كله في إعطاء الذكاء الاصطناعي قيود الـ Architecture بوضوح.',
    category: 'code_help',
    upvotes: 31,
    commentsCount: 1,
    timestamp: 'أمس',
    comments: [
      {
        id: 'c-4',
        author: 'عمر مصطفى',
        authorRole: 'Backend Architect',
        timestamp: 'أمس',
        content: 'فعلاً، الـ Vibe Coding بيختصر كتابة الـ Boilerplate بنسبة 80%، لكن يظل فهم المهندس لمعمارية النظام هو الفيصل.',
        likes: 14,
      },
    ],
  },
];
