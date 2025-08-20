import { MARKS_PER_QUESTION, TOTAL_QUESTIONS } from "@/src/lib/app-consts";
import { dispatchServerTranslation } from "@/src/lib/i18n/i18n-helpers";
import { getExam } from "@/src/services/mock-data";
import { Assignment } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default async function ExamInfoCard() {
    const exam = await getExam();
    const t = await dispatchServerTranslation();

    const stats = [
        {
            label: t("Date"),
            value: new Date(exam.dateTimeISO).toLocaleString(),
        },
        { label: t("Students"), value: exam.totalStudents },
        { label: t("Questions"), value: TOTAL_QUESTIONS },
        { label: t("MarksPerQuestion"), value: MARKS_PER_QUESTION },
    ];

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
            }}
            role="region"
            aria-labelledby="exam-title"
        >
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 56,
                            height: 56,
                        }}
                        aria-hidden="true"
                    >
                        <Assignment fontSize="large" />
                    </Avatar>
                }
                title={
                    <Typography
                        id="exam-title"
                        variant="h5"
                        fontWeight="bold"
                        tabIndex={0}
                    >
                        {exam.title}
                    </Typography>
                }
                subheader={
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        tabIndex={0}
                    >
                        {exam.subject}
                    </Typography>
                }
                sx={{ pb: 0 }}
            />

            <Divider sx={{ my: 1 }} />

            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    {stats.map((stat, i) => (
                        <Box
                            key={i}
                            flex="1"
                            minWidth={120}
                            role="group"
                            aria-label={stat.label}
                        >
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                                tabIndex={0}
                            >
                                {stat.label}
                            </Typography>
                            <Typography variant="h6" tabIndex={0}>
                                {stat.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
