// app/api/exam/route.ts
import { NextResponse } from "next/server";
import { ExamSchema } from "../../[lang]/types/exam";
import { getExam } from "../../[lang]/services/mock-data";

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function GET() {
    // Artificial delay to simulate network / server time
    await sleep(100);

    const data = getExam();
    // Validate with Zod before sending
    const parsed = ExamSchema.parse(data);

    return NextResponse.json(parsed, {
        // Ensure every poll bypasses cache
        headers: { "Cache-Control": "no-store" },
    });
}
