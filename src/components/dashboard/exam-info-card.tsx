import { useServerTranslation } from "@/src/lib/i18n/i18n-helpers";
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
    const t = await useServerTranslation();

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 56,
                            height: 56,
                        }}
                    >
                        <Assignment fontSize="large" />
                    </Avatar>
                }
                title={
                    <Typography variant="h5" fontWeight="bold">
                        {exam.title}
                    </Typography>
                }
                subheader={
                    <Typography variant="subtitle1" color="text.secondary">
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
                    <Box flex="1" minWidth={120}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("Date")}
                        </Typography>
                        <Typography variant="h6">
                            {new Date(exam.dateTimeISO).toLocaleString()}
                        </Typography>
                    </Box>

                    <Box flex="1" minWidth={120}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("Students")}
                        </Typography>
                        <Typography variant="h6">
                            {exam.totalStudents}
                        </Typography>
                    </Box>

                    <Box flex="1" minWidth={120}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("Questions")}
                        </Typography>
                        <Typography variant="h6">
                            {exam.totalQuestions}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
