import { ExamDTO, ExamSchema } from "../../types/exam";

export async function fetchExam(): Promise<ExamDTO> {
    const res = await fetch("/api/exam", { cache: "no-store" });
    if (!res.ok) throw new Error(`Exam fetch failed: ${res.status}`);
    const json = await res.json();
    return ExamSchema.parse(json);
}
