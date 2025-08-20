"use client";

import ExamInfoCard from "@/src/components/dashboard/exam-info-card";
import GridPanel from "@/src/components/dashboard/grid-panel";
import StatisticsPanel from "@/src/components/dashboard/statistics-panel";
import { fetchExam } from "@/src/shared-fe/api/exam-client";
import { fetchStudents } from "@/src/shared-fe/api/students-client";
import { usePolling } from "@/src/shared-fe/hooks/use-pollling";
import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function DashboardPage() {
    const examPoll = usePolling({ fetcher: fetchExam, intervalMs: 5000 });
    const studentsPoll = usePolling({
        fetcher: fetchStudents,
        intervalMs: 5000,
    });
    const t = useTranslation();

    return (
        <Container maxWidth="xl">
            <Box p={2}>
                {/* Page Title */}
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 3, fontWeight: "bold" }}
                >
                    {t("Dashboard")}
                </Typography>

                <Grid container spacing={2}>
                    {/* Left Side: Exam Info */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        {examPoll.data && <ExamInfoCard exam={examPoll.data} />}
                        <Box mt={2}>
                            {studentsPoll.data && (
                                <StatisticsPanel
                                    students={studentsPoll.data.students}
                                    averageScore={
                                        studentsPoll.data.averageScore
                                    }
                                    percentCompleted={
                                        studentsPoll.data.percentCompleted
                                    }
                                />
                            )}
                        </Box>
                    </Grid>

                    {/* Right Side: Student Grid */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {studentsPoll.data && (
                            <GridPanel students={studentsPoll.data.students} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
