"use client";

import { fetchStudents } from "@/src/shared-fe/api/students-client";
import { usePolling } from "@/src/shared-fe/hooks/use-pollling";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import GridPanel from "./grid-panel";
import StatisticsPanel from "./statistics-panel";
import StudentsDataSkeleton from "./student-data-skeleton";

export default function StudentsDataWrapper() {
    const studentsPoll = usePolling({
        fetcher: fetchStudents,
        intervalMs: 5000,
    });

    if (!studentsPoll.data) {
        return <StudentsDataSkeleton />;
    }

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Left Side: Statistics */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                    <StatisticsPanel
                        students={studentsPoll.data.students}
                        averageScore={studentsPoll.data.averageScore}
                        percentCompleted={studentsPoll.data.percentCompleted}
                    />
                </Box>
            </Grid>

            {/* Right Side: Student Grid */}
            <Grid size={{ xs: 12, md: 8 }}>
                <GridPanel students={studentsPoll.data.students} />
            </Grid>
        </Grid>
    );
}
