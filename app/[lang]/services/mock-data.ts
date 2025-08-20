// services/mockData.ts
import { ExamDTO } from "../types/exam";
import { StudentDTO } from "../types/student";

const EXAM_ID = "exam-1";
const TOTAL_QUESTIONS = 40;

const studentNames = [
    "Ava Patel",
    "Liam Chen",
    "Noah Smith",
    "Emma Johnson",
    "Olivia Brown",
    "Ethan Müller",
    "Mia Garcia",
];

function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
}

// --- In-memory state (simulates DB) ---
let students: StudentDTO[] = studentNames.slice(0, 7).map((name, idx) => ({
    id: `stu-${idx + 1}`,
    name,
    totalQuestions: TOTAL_QUESTIONS,
    completedQuestions: 0,
    avgTimeSec: 0,
    score: 0,
    status: "NotStarted",
}));

let exam: ExamDTO = {
    id: EXAM_ID,
    title: "Midterm Assessment",
    subject: "Mathematics",
    dateTimeISO: new Date().toISOString(),
    totalStudents: students.length,
    totalQuestions: TOTAL_QUESTIONS,
    percentCompleted: 0,
    averageScore: 0,
};

// --- Helpers to update aggregates ---
function recomputeExamAggregates() {
    const done = students.filter((s) => s.status === "Completed").length;
    const percentCompleted =
        students.length === 0 ? 0 : Math.round((done / students.length) * 100);

    const avgScore =
        students.length === 0
            ? 0
            : Math.round(
                  students.reduce((sum, s) => sum + s.score, 0) /
                      students.length
              );

    exam = { ...exam, percentCompleted, averageScore: avgScore };
}

// --- Simulate progress on each poll ---
export function tickStudentsProgress() {
    // randomly pick 1–3 students to update
    const toUpdate = Math.max(1, Math.round(Math.random() * 3));
    for (let i = 0; i < toUpdate; i++) {
        const idx = Math.floor(Math.random() * students.length);
        const s = students[idx];

        // If already completed, occasionally leave untouched
        if (s.status === "Completed" && Math.random() < 0.7) continue;

        // Start students if not started
        let completed = s.completedQuestions;
        let status = s.status;
        if (status === "NotStarted") status = "InProgress";

        // Advance by 1–3 questions
        const step = Math.max(1, Math.ceil(Math.random() * 3));
        completed = clamp(completed + step, 0, s.totalQuestions);

        // Update avg time (random walk around 40–90 sec)
        const newAvg = clamp(
            (s.avgTimeSec || 60) + (Math.random() - 0.5) * 6,
            30,
            120
        );

        // If finished, compute a plausible score (60–100, with small noise)
        let score = s.score;
        if (completed >= s.totalQuestions) {
            status = "Completed";
            score =
                s.score > 0
                    ? s.score
                    : Math.round(
                          clamp(
                              60 +
                                  Math.random() * 40 +
                                  (Math.random() - 0.5) * 5,
                              60,
                              100
                          )
                      );
        } else {
            // While in progress, let score drift slightly (for "live" feel)
            score = clamp(s.score + (Math.random() - 0.5) * 3, 0, 100);
        }

        students[idx] = {
            ...s,
            completedQuestions: completed,
            status,
            avgTimeSec: Math.round(newAvg),
            score: Math.round(score),
        };
    }

    recomputeExamAggregates();
}

export function getExam(): ExamDTO {
    return exam;
}

export function getStudents(): StudentDTO[] {
    return students;
}
