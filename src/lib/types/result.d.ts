// نوع الـ Answer Options (ممكن يتوسع لو عندك structure معين)
interface AnswerOptions {
  [key: string]: string; // مثلا: { "A1": "text", "A2": "text" }
}

// السؤال اللي جاوبت عليه غلط
interface WrongQuestion {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: AnswerOptions;
}

// السؤال اللي جاوبت عليه صح
interface CorrectQuestion {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: AnswerOptions;
}

// الـ response الأساسي
export interface QuizResultResponse {
  message: string; // "success"
  correct: number; // عدد الإجابات الصح
  wrong: number; // عدد الإجابات الغلط
  total: string; // "10%" أو نسبة مئوية كنص
  WrongQuestions: WrongQuestion[];
  correctQuestions: CorrectQuestion[];
}
