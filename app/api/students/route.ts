// app/api/students/route.ts
import { NextResponse } from "next/server";
import { StudentsResponseSchema } from "../../[lang]/types/student";
import {
    getStudents,
    tickStudentsProgress,
    getExam,
} from "../../[lang]/services/mock-data";

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function GET() {
    console.log("GET");

    // Artificial delay
    await sleep(100);

    // Advance "live" state on every request
    tickStudentsProgress();

    const students = getStudents();
    const exam = getExam();

    const payload = {
        students,
        percentCompleted: exam.percentCompleted,
        averageScore: exam.averageScore,
    };

    const parsed = StudentsResponseSchema.parse(payload);

    return NextResponse.json(parsed, {
        headers: { "Cache-Control": "no-store" },
    });
}
