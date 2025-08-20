import { NextResponse } from "next/server";

import {
    getExam,
    getStudents,
    tickStudentsProgress,
} from "@/src/services/mock-data";
import { StudentsResponseSchema } from "@/src/types/student";

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function GET() {
    await sleep(100);

    tickStudentsProgress();

    const students = await getStudents();
    const exam = await getExam();

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
