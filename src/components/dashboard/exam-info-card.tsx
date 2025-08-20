"use client";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { ExamDTO } from "@/src/types/exam";
import { Assignment } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@mui/material";

export default function ExamInfoCard({ exam }: { exam: ExamDTO }) {
    const t = useTranslation();

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Assignment />
                    </Avatar>
                }
                title={
                    <Typography variant="h6" fontWeight="bold">
                        {exam.title}
                    </Typography>
                }
                subheader={exam.subject}
            />

            <Divider />

            <CardContent sx={{ display: "grid", gap: 1.5 }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {t("Date")}
                    </Typography>
                    <Typography variant="body1">
                        {new Date(exam.dateTimeISO).toLocaleString()}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {t("Students")}
                    </Typography>
                    <Typography variant="body1">
                        {exam.totalStudents}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {t("Questions")}
                    </Typography>
                    <Typography variant="body1">
                        {exam.totalQuestions}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
