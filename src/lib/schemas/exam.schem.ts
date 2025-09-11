import z from "zod";
import { questionSchema } from "./question.schema";

// export const examSchema = z.object({
//   title: z.string().nonempty("Title is required"),
//   description: z.string().nonempty("Description is required"),
//   questions: z.array(questionSchema),
// });

// الامتحان كله
export const examSchema = z.object({
  subjectId: z.string().nonempty("Subject ID is required"), // 🟢 param
  title: z.string().nonempty("Exam title is required"),
  description: z.string().nonempty("Description is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  numberOfQuestions: z.number().min(1, "Exam must have at least 1 question"),
  questions: z.array(questionSchema).min(1, "At least 1 question is required"),
});

export type ExamValues = z.infer<typeof examSchema>;
