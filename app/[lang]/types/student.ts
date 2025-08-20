// types/student.ts
import { z } from "zod";

export const StudentSchema = z.object({
    id: z.string(),
    name: z.string(),
    completedQuestions: z.number().int().min(0),
    totalQuestions: z.number().int().positive(),
    avgTimeSec: z.number().nonnegative(), // average time per question (seconds)
    score: z.number().min(0).max(100),
    status: z.enum(["NotStarted", "InProgress", "Completed"]),
});

export type StudentDTO = z.infer<typeof StudentSchema>;

export const StudentsResponseSchema = z.object({
    students: z.array(StudentSchema),
    // aggregate stats you may want for charts
    percentCompleted: z.number().min(0).max(100),
    averageScore: z.number().min(0).max(100),
});
export type StudentsResponseDTO = z.infer<typeof StudentsResponseSchema>;
