import {
    StudentsResponseDTO,
    StudentsResponseSchema,
} from "../../types/student";

export async function fetchStudents(): Promise<StudentsResponseDTO> {
    const res = await fetch("/api/students", { cache: "no-store" });
    if (!res.ok) throw new Error(`Students fetch failed: ${res.status}`);
    const json = await res.json();
    return StudentsResponseSchema.parse(json);
}
