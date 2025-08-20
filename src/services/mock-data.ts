// services/mockData.ts
import { ExamDTO } from "@/src/types/exam";
import { StudentDTO, StudentStatus } from "@/src/types/student";

const EXAM_ID = "exam-1";
const TOTAL_QUESTIONS = 50;
const MARKS_PER_QUESTION = 2;

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

// --- In-memory state ---
let students: StudentDTO[] = studentNames.map((name, idx) => ({
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

export function tickStudentsProgress() {
    const CORRECT_PROB = 0.5; // 50% chance the student answers correctly

    // randomly pick 1–3 students to update
    const toUpdate = Math.max(1, Math.round(Math.random() * 3));

    for (let i = 0; i < toUpdate; i++) {
        const idx = Math.floor(Math.random() * students.length);
        const s = students[idx];

        // 🔄 Loop students: if completed, reset them to fresh
        if (s.status === "Completed") {
            students[idx] = {
                ...s,
                completedQuestions: 0,
                avgTimeSec: 0,
                score: 0,
                status: "NotStarted",
            };
            continue; // skip rest of logic this tick
        }

        // Ensure student is in progress once they start answering
        let completed = s.completedQuestions;
        let status: StudentStatus = "InProgress";
        let score = s.score;

        // How many questions to answer this tick (respect remaining)
        const remaining = s.totalQuestions - completed;
        if (remaining <= 0) {
            status = "Completed";
        } else {
            const step = Math.max(1, Math.ceil(Math.random() * 3));
            const toAnswer = Math.min(step, remaining);

            // Answer questions one by one; +2 if correct
            for (let q = 0; q < toAnswer; q++) {
                completed += 1;
                if (Math.random() < CORRECT_PROB) {
                    score += MARKS_PER_QUESTION; // +2
                }
            }

            // Cap score to 100 (TOTAL_QUESTIONS * MARKS_PER_QUESTION)
            score = clamp(score, 0, TOTAL_QUESTIONS * MARKS_PER_QUESTION);

            // If finished exactly now, mark completed
            if (completed >= s.totalQuestions) {
                status = "Completed";
            }
        }

        // Average time random walk (only while not completed), rounded int
        const nextAvg =
            status === "Completed"
                ? s.avgTimeSec
                : clamp(
                      (s.avgTimeSec || 60) + (Math.random() - 0.5) * 6,
                      30,
                      120
                  );

        students[idx] = {
            ...s,
            completedQuestions: completed,
            status,
            avgTimeSec: Math.round(nextAvg),
            score,
        };
    }

    // Recompute exam aggregates
    recomputeExamAggregates();
}

export function getExam(): Promise<ExamDTO> {
    return Promise.resolve({ ...exam });
}

export function getStudents(): Promise<StudentDTO[]> {
    return Promise.resolve(students.map((s) => ({ ...s })));
}
