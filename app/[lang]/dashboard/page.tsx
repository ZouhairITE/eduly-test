// app/dashboard/page.tsx (snippet of how to consume)
"use client";

import { usePolling } from "../shared-fe/hooks/use-pollling";
import { fetchExam } from "../shared-fe/api/exam-client";
import { fetchStudents } from "../shared-fe/api/students-client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ExamInfoCard from "../components/dashboard/exam-info-card";
import GridPanel from "../components/dashboard/grid-panel";
import Container from "@mui/material/Container";

export default function DashboardPage() {
    const examPoll = usePolling({ fetcher: fetchExam, intervalMs: 5000 });
    const studentsPoll = usePolling({
        fetcher: fetchStudents,
        intervalMs: 5000,
    });

    return (
        <Container maxWidth="lg">
            <Box p={2}>
                <Grid container spacing={2}>
                    {/* Left Side */}
                    <Grid size={4}>
                        {examPoll.data && <ExamInfoCard exam={examPoll.data} />}
                        <Box mt={2}>
                            {/* <ExamCharts students={studentsPoll} /> */}
                        </Box>
                    </Grid>

                    {/* Right Side */}
                    <Grid size={8}>
                        {studentsPoll.data && (
                            <GridPanel students={studentsPoll.data.students} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
