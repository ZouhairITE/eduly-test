import { Suspense } from "react";

import ExamInfoCard from "@/src/components/dashboard/exam-info-card";
import ExamInfoCardSkeleton from "@/src/components/dashboard/exam-info-skeleton";
import StudentsDataWrapper from "@/src/components/dashboard/students-data-wrapper";
import { dispatchServerTranslation } from "@/src/lib/i18n/i18n-helpers";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function DashboardPage() {
    const t = await dispatchServerTranslation();

    return (
        <Container maxWidth="xl">
            <Box p={2}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 3, fontWeight: "bold" }}
                >
                    {t("Dashboard")}
                </Typography>

                <Suspense fallback={<ExamInfoCardSkeleton />}>
                    <ExamInfoCard />
                </Suspense>

                <StudentsDataWrapper />
            </Box>
        </Container>
    );
}
