import z from "zod";

// export const questionSchema = z.object({
//   title: z.string().nonempty(" question is required"),
//   options: z.array(z.string()),
//   selectedAnswer: z.string().optional(),
// });

const answerSchema = z.object({
  answer: z.string().nonempty("Answer text is required"),
  key: z.string().nonempty("Answer key is required"), // زي A1, A2...
});

// سؤال واحد
export const questionSchema = z.object({
  question: z.string().nonempty("Question is required"),
  type: z.enum(["single_choice", "multiple_choice"]),
  answers: z.array(answerSchema).min(2, "At least 2 answers required"),
  correct: z.string().nonempty("Correct answer key is required"),
});

export type QuestionValues = z.infer<typeof questionSchema>;
