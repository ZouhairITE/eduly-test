import { NextResponse } from "next/server";

import { getExam } from "@/src/services/mock-data";
import { ExamSchema } from "@/src/types/exam";

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function GET() {
    await sleep(100);

    const data = await getExam();
    const parsed = ExamSchema.parse(data);

    return NextResponse.json(parsed, {
        headers: { "Cache-Control": "no-store" },
    });
}
