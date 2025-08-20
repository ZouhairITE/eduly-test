import { z } from "zod";

export const ExamSchema = z.object({
    id: z.string(),
    title: z.string(),
    subject: z.string(),
    dateTimeISO: z.string().datetime(),
    totalStudents: z.number().int().nonnegative(),
    totalQuestions: z.number().int().positive(),
    percentCompleted: z.number().min(0).max(100),
    averageScore: z.number().min(0).max(100),
});

export type ExamDTO = z.infer<typeof ExamSchema>;
