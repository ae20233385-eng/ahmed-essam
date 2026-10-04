export interface GitCommand {
  command: string;
  category: 'Setup' | 'Branching' | 'Daily Work' | 'Collaboration' | 'Rescue';
  description: string;
  descriptionEn: string;
  example: string;
  academicTip: string;
}

export const GIT_COMMANDS: GitCommand[] = [
  {
    command: 'git init & git remote add origin <url>',
    category: 'Setup',
    description: 'تهيئة مستودع Git محلي وربطه بمستودع GitHub الخاص بفريق مشروع التخرج.',
    descriptionEn: 'Initialize local Git repo and connect to team GitHub remote.',
    example: 'git init\ngit remote add origin https://github.com/team/graduation-project.git',
    academicTip: 'تأكد دائماً من إضافة ملف .gitignore لمنع رفع node_modules أو ملفات .env التي تحتوي على أسرار المشروع.',
  },
  {
    command: 'git checkout -b feature/<task-name>',
    category: 'Branching',
    description: 'إنشاء فرع جديد خاص بمهمتك (مثل بناء الـ ERD أو شاشة تسجيل الدخول) والتبديل إليه.',
    descriptionEn: 'Create a dedicated feature branch for an isolated task and switch to it.',
    example: 'git checkout -b feature/auth-jwt-api',
    academicTip: 'يُحظر في فرق العمل الأكاديمية والمهنية الدفع المباشر (Direct Push) على فرع main؛ دائماً اعمل في فرع مستقل.',
  },
  {
    command: 'git commit -m "feat: add user authentication controller"',
    category: 'Daily Work',
    description: 'حفظ التعديلات مع رسالة واضحة تتبع معيار الـ Conventional Commits.',
    descriptionEn: 'Commit staged changes with a semantic message following Conventional Commits.',
    example: 'git add .\ngit commit -m "feat(api): implement JWT token verification middleware"',
    academicTip: 'استخدم بادئات دلالية: feat (ميزة جديدة), fix (إصلاح خطأ), docs (توثيق), refactor (تحسين هيكل الكود).',
  },
  {
    command: 'git pull --rebase origin main',
    category: 'Collaboration',
    description: 'تحديث فرعك بآخر تعديلات زملائك في الفريق مع الحفاظ على تاريخ Commit نظيف ومتسلسل.',
    descriptionEn: 'Update your feature branch with latest team commits while keeping history clean.',
    example: 'git fetch origin\ngit pull --rebase origin main',
    academicTip: 'استخدام --rebase يتفادى إنشاء Merge Commits غير ضرورية تجعل تاريخ المشروع معقداً في المناقشة.',
  },
  {
    command: 'git stash & git stash pop',
    category: 'Rescue',
    description: 'تخزين تعديلاتك غير المكتملة مؤقتاً عند الحاجة للتبديل السريع إلى فرع زميل في الفريق.',
    descriptionEn: 'Temporarily shelve uncommitted changes to quickly switch branches.',
    example: 'git stash\ngit checkout main\n# do urgent review\ngit checkout feature/my-work\ngit stash pop',
    academicTip: 'منقذ حقيقي عندما تطلب منك إدارة التيم مراجعة مشكلة طارئة بدون أن تفقد عملك الحالي.',
  },
];

export const GRADUATION_GIT_FLOW_STEPS = [
  {
    stepNumber: 1,
    title: 'فرع الإنتاج الرئيسي (main branch)',
    description: 'مخصص فقط للأكواد المكتملة والمختبرة بنسبة 100%، وهو الفرع الذي يعرضه الفريق أثناء مناقشة مشروع التخرج أمام لجنة التحكيم.',
    color: 'emerald',
  },
  {
    stepNumber: 2,
    title: 'فرع التطوير المشترك (develop branch)',
    description: 'الفرع الذي تندمج فيه جميع الميزات البرمجية (Features) التي تم الانتهاء منها قبل دمجها النهائي في main.',
    color: 'blue',
  },
  {
    stepNumber: 3,
    title: 'فروع الميزات المستقلة (feature/* branches)',
    description: 'كل عضو في الفريق (Backend, Frontend, AI, Database) ينشئ فرعاً منفصلاً لكل مهمة ينهيها ثم يفتح Pull Request للمراجعة.',
    color: 'purple',
  },
  {
    stepNumber: 4,
    title: 'مراجعة الأكواد وطلبات الدمج (Pull Request & Code Review)',
    description: 'يراجع عضو آخر في الفريق الكود قبل الموافقة على الدمج (Approve)، مما يضمن عدم وجود أخطاء تكسر مشروع التخرج.',
    color: 'amber',
  },
];

export const README_TEMPLATE = `# 🎓 [اسم مشروع التخرج بالكامل]

> [وصف مختصر وواضح للمشروع في جملتين: المشكلة التي يحلها والتقنيات المستخدمة]

[![Tech Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20React%20%7C%20PostgreSQL-blue)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

---

## 👥 فريق العمل (Project Team)
- **أحمد محمد** - System Analyst & Database Engineer
- **سارة خالد** - Frontend Lead & UI/UX Designer
- **عمر طارق** - Backend Architect & DevOps
- **مريم إبراهيم** - AI Engineer & Quality Assurance

**تحت إشراف:** أ.د. [اسم المشرف الأكاديمي]

---

## 🏛️ المخططات التقنية ومعمارية النظام (System Architecture)
- **ERD Schema**: راجع مسار \`/docs/erd_diagram.png\` (مطابق لمعيار 3NF)
- **DFD Context & Level 1**: راجع مسار \`/docs/dfd_level0_1.pdf\`
- **Activity & Sequence Diagrams**: راجع مسار \`/docs/uml_diagrams/\`

---

## 🚀 التشغيل السريع في بيئة التطوير (Quick Start)

### المتطلبات (Prerequisites)
- Node.js >= 20.x
- PostgreSQL >= 15.x
- Git

### خطوات التثبيت والتشغيل
\`\`\`bash
# 1. استنساخ المستودع
git clone https://github.com/team/graduation-project.git
cd graduation-project

# 2. تثبيت الحزم البرمجية
npm install

# 3. إعداد المتغيرات البيئية
cp .env.example .env

# 4. تشغيل خادم التطوير
npm run dev
\`\`\`

---

## 🧪 الاختبارات الآلية (Testing)
\`\`\`bash
npm run test
\`\`\`
`;
