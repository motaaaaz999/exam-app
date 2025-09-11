export interface Metadata {
  currentPage: number;
  numberOfPage: number;
  limit: number;
}

export interface Exams {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: string;
  active: boolean;
  createdAt: string;
}

export interface getExamsResponse {
  message: string;
  metadata: Metadata;
  exams: Exams[];
}
