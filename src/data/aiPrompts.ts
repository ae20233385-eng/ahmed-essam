import { AIPromptTemplate } from '../types';

export const AI_PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 'prompt-erd-gen',
    category: 'System Architecture & ERD',
    title: 'توليد مخطط ERD وجداول SQL العلاقية من فكرة المشروع',
    titleEn: 'Generate ERD & SQL Schema from Graduation Project Idea',
    description: 'يقوم بتحليل فكرة مشروعك واستخراج الكيانات (Entities)، المفاتيح الأساسية (PK)، المفاتيح الأجنبية (FK)، العلاقات (1:N, M:N) وجداول الربط مع تطبيق 3NF.',
    promptText: `Act as a Principal Database Architect & System Analyst for a university Computer Science graduation project.

Project Context:
[PROJECT_NAME]: {projectName}
[PROJECT_DESCRIPTION]: {projectDescription}

Please perform a rigorous database design analysis:
1. Identify all core Entities and their attributes (specify PK, FK, and data types).
2. Detail the exact Cardinality and Relationship between each entity (e.g. 1:1, 1:N, M:N). If M:N, provide the junction table.
3. Validate Third Normal Form (3NF) and eliminate any transitive or partial dependencies.
4. Provide the complete, error-free PostgreSQL DDL (CREATE TABLE statements with foreign key constraints and ON DELETE behaviors).
5. Output an ASCII or Mermaid.js ERD diagram block that can be directly pasted into the academic graduation documentation.`,
    exampleVariables: {
      projectName: 'نظام إدارة الرعاية الصحية وحجز العيادات الذكية',
      projectDescription: 'منصة ويب تتيح للمرضى حجز المواعيد مع الأطباء، وإدارة السجلات الطبية الإلكترونية، والدفع الإلكتروني، وتقييم الاستشارات مع إشعارات تذكيرية.',
    },
    vibeTip: 'أعطِ الذكاء الاصطناعي تفاصيل حقيقية عن العمليات التي يقوم بها المستخدم بدلاً من جمل عامة ليحدد العلاقات بدقة.',
  },
  {
    id: 'prompt-dfd-gen',
    category: 'System Architecture & ERD',
    title: 'صياغة مخططات تدفق البيانات DFD Level 0 و Level 1 للأكاديميين',
    titleEn: 'Formal DFD Level 0 & Level 1 Specification for Academic Defense',
    description: 'يولد تفكيكاً دقيقاً لتدفق البيانات بين الكيانات الخارجية والعمليات ومخازن البيانات وفقاً لمعايير Yourdon & Coad أو Gane & Sarson.',
    promptText: `Act as a Senior System Analysis Professor for a graduation project jury panel.

Project: {projectName}
Scope: {projectDescription}

Deliverables required for the Graduation Project Documentation Chapter 3:
1. Context Diagram (DFD Level 0):
   - Identify the single main system process (0.0).
   - List all External Entities (Actors) interacting with the system.
   - List all inbound data flows and outbound data flows for each entity.
   - Strictly verify: NO data stores exist in Level 0.

2. DFD Level 1 Decomposition:
   - Decompose Process 0.0 into 4 to 6 numbered major processes (e.g. 1.0 Authentication, 2.0 Appointment Scheduling, etc.).
   - Define all Data Stores (D1: Patients, D2: Appointments, D3: Transactions).
   - Ensure DFD Balancing: Every data flow in Level 0 must match the inputs/outputs in Level 1.
   - Provide a structured table explaining each process, inputs, data stores read/written, and outputs.`,
    exampleVariables: {
      projectName: 'منصة التجارة الإلكترونية لمنتجات الحرف اليدوية',
      projectDescription: 'تطبيق يربط الحرفيين المحليين بالمشترين، ويدير المخزون، والشحن، وبوابات الدفع الإلكتروني.',
    },
    vibeTip: 'تأكد من مراجعة الـ Balancing: أي سهم دخل أو خرج في Level 0 يجب أن يظهر بنفس الاسم في Level 1.',
  },
  {
    id: 'prompt-express-scaffold',
    category: 'Backend Scaffolding',
    title: 'بناء خادم Node.js Express CRUD متكامل ونظيف (Clean Layered)',
    titleEn: 'Scaffold Clean Layered Node.js Express REST API',
    description: 'ينشئ كود خادم Express مقسم إلى طبقات (Routes, Controllers, Services, DB) مع التحقق من صحة المدخلات والتأمين بالـ JWT.',
    promptText: `Act as a Staff Backend Engineer specializing in Node.js, Express, and TypeScript.

Task: Build a production-grade RESTful API module for: {entityName}
Fields: {fieldsList}

Requirements:
1. Follow Clean Architecture: Separate Routes -> Controller -> Service -> Repository.
2. Input validation: Use Zod or express-validator for request payload sanitization.
3. Proper HTTP status codes: 200, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error.
4. Comprehensive Error Handling Middleware with try/catch wrapping.
5. Provide both the TypeScript code and 3 curl test examples.`,
    exampleVariables: {
      entityName: 'Tasks & Milestones for Graduation Project',
      fieldsList: 'id, title, description, assigneeId, priority, status, dueDate, createdAt',
    },
    vibeTip: 'في الـ Vibe Coding، اطلب من الموديل أولاً هيكل المجلدات فقط، ثم اطلب توليد كل ملف على حدة لتفادي اقتطاع الكود.',
  },
  {
    id: 'prompt-vibe-debug',
    category: 'Vibe Coding & Debug',
    title: 'برومت تشخيص وحل أخطاء الكود والـ Stack Trace بعمق',
    titleEn: 'Deep Stack Trace Diagnosis & Zero-Regression Fix',
    description: 'يحلل رسائل الخطأ المعقدة، ويحدد السبب الجذري (Root Cause)، ويقترح الحل المناسب بدون كسر أي جزء آخر في المشروع.',
    promptText: `Act as a Principal Debugging Engineer. I encountered the following error in my application:

[TECH_STACK]: {techStack}
[ERROR_MESSAGE / STACK_TRACE]:
{errorMessage}

[RELEVANT_CODE_SNIPPET]:
{codeSnippet}

Please provide:
1. Root Cause Analysis: Exactly why this error happened in 2-3 concise sentences.
2. The exact minimal code fix (show the exact diff: what to remove and what to replace).
3. Defensive programming tip: How to prevent this runtime bug in the future (e.g. type guard, optional chaining, error boundary).`,
    exampleVariables: {
      techStack: 'Node.js Express + TypeScript + PostgreSQL',
      errorMessage: 'UnhandledPromiseRejection: error: duplicate key value violates unique constraint "users_email_key"',
      codeSnippet: 'const user = await db.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email]);',
    },
    vibeTip: 'دائماً الصق كود الاستدعاء ومحتوى الخطأ كاملاً مع أسماء الحزم وأرقام إصداراتها إن وجدت.',
  },
  {
    id: 'prompt-test-gen',
    category: 'Testing & Docs',
    title: 'توليد اختبارات آلية (Unit & Integration Tests) لضمان جودة التسليم',
    titleEn: 'Automated Test Suite Generator for Technical Deliverables',
    description: 'ينشئ اختبارات فحص شاملة تغطي الحالات الإيجابية (Happy Path) وحالات الفشل والحدود (Edge Cases).',
    promptText: `Act as a QA Lead and Senior Test Automation Engineer.

Target Function/Endpoint to test:
{targetCode}

Please generate a comprehensive test suite using Vitest/Jest:
1. Test Suite Setup and teardown (mocking external DB/network calls).
2. Happy Path Tests: Valid inputs returning expected 200/201 responses.
3. Edge Case Tests: Empty inputs, invalid data types, boundary limits, SQL injection strings.
4. Error State Tests: Server throwing exceptions, unauthorized access.
5. Provide instructions on running the tests via npm test.`,
    exampleVariables: {
      targetCode: 'function calculateFinalScore(quizScore: number, projectScore: number, attendancePercent: number): { score: number, grade: string }',
    },
    vibeTip: 'لجان مناقشة مشاريع التخرج تعطي درجات عالية جداً للفرق التي تملك Unit Tests موثقة في الـ GitHub Repository.',
  },
];
