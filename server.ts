import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Endpoint: Assist software students, explain code/diagrams, refine vibe-coding prompts
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, context, type } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      // Fallback response if key is missing
      return res.json({
        reply: `مساعد الذكاء الاصطناعي الذكي: تم استقبال طلبك: "${prompt}".\nنصيحة سريعة لمشروع التخرج: تأكد من دقة العلاقات في الـ ERD والتحقق من 3NF (Third Normal Form) وفصل الطبقات في الـ System Architecture بين Controller و Service و Repository.`,
        mode: 'simulated',
      });
    }

    let systemInstruction = `أنت مرشد ومهندس برمجيات ذكي وخبير متخصص في مساعدة طلبة كليات الحاسبات والمعلومات (Software Engineering & Computer Science).
دورك مساعدة الطلاب في:
1. مشاريع التخرج وتوثيقها البرمجي
2. شرح وتصميم الـ ERD, Data Flow Diagrams (DFD Level 0 & 1), Activity Diagrams, System Architecture & Analysis
3. مهارات الـ Vibe Coding وكتابة البرومتات الاحترافية للحصول على أكواد نظيفة ونماذج أولية سريعة
4. كود الواجهات (HTML/CSS/JS/React) والباك إند (Node.js/Express/APIs) وقواعد البيانات (SQL/PostgreSQL/MongoDB) و Python
5. إجابات منظمة، مشجعة، مدعومة بأمثلة كود عملية عند الحاجة، باللغة العربية الواضحة والمصطلحات البرمجية الإنجليزية الشائعة.`;

    if (type === 'prompt_optimizer') {
      systemInstruction += `\nالمستخدم يريد تحسين وتجهيز Prompt قوي للـ Vibe Coding أو نماذج الذكاء الاصطناعي. قم بتحويل فكرته إلى Prompt احترافي منظم يشمل: Role, Context, Functional Requirements, Technical Constraints, and Output Format.`;
    } else if (type === 'diagram_advisor') {
      systemInstruction += `\nالمستخدم يسأل عن هندسة النظم والمخططات (ERD, DFD, Activity Diagram, System Architecture). اشرح له الكيانات والعلاقات (1:1, 1:N, M:N) ومواصفات التسليم الأكاديمية لمشاريع التخرج.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: context ? `السياق: ${context}\n\nالسؤال/الطلب: ${prompt}` : prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'لم يتم استلام رد، يرجى المحاولة مرة أخرى.';
    return res.json({ reply, mode: 'live' });
  } catch (err: any) {
    console.error('Error generating AI response:', err);
    return res.status(500).json({
      error: 'Failed to process AI request',
      details: err?.message || String(err),
      fallbackReply: 'عذراً، حدث خطأ مؤقت أثناء الاتصال بمحرك الذكاء الاصطناعي. يمكنك مراجعة قوالب البرومت ومسارات التعلم المتاحة في المنصة.',
    });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
