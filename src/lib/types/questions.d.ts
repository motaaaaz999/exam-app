// types.ts
export type Answer = {
  answer: string;
  key: string;
};

export type Subject = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string; // ISO timestamp
};

export type Exam = {
  _id: string;
  title: string;
  duration: number; // minutes (as in example)
  subject: string; // usually the subject id
  numberOfQuestions: number;
  active: boolean;
  createdAt: string; // ISO timestamp
};

export type QuestionType = "single_choice" | "multiple_choice" | string;

export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: QuestionType;
  correct?: string | string[]; // backend may send correct answer(s)
  subject?: Subject; // sometimes just id, sometimes populated object
  exam?: Exam ; // sometimes id, sometimes populated object
  createdAt: string; // ISO timestamp
}

export interface getQuestionsResponse {
  message: string; // e.g. "success"
  questions: Question[];
}
