// app/dashboard/page.tsx (snippet of how to consume)
"use client";

import { usePolling } from "../shared/hooks/use-pollling";
import { fetchExam } from "../shared/api/exam-client";
import { fetchStudents } from "../shared/api/students-client";

export default function DashboardPage() {
    const examPoll = usePolling({ fetcher: fetchExam, intervalMs: 5000 });
    const studentsPoll = usePolling({
        fetcher: fetchStudents,
        intervalMs: 3000,
    });

    // examPoll.data -> ExamDTO
    // studentsPoll.data?.students -> StudentDTO[]
    // studentsPoll.data?.percentCompleted, .averageScore

    // Render your left/right panes here...
    return (
        JSON.stringify(examPoll.data) +
        JSON.stringify(studentsPoll.data?.averageScore)
    );
}
