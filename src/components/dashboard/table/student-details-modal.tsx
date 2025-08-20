"use client";

import { useMemo } from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { StudentDTO } from "@/src/types/student";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface StudentDetailsModalProps {
    open: boolean;
    onClose: () => void;
    student: StudentDTO | null;
}

export default function StudentDetailsModal({
    open,
    onClose,
    student,
}: StudentDetailsModalProps) {
    const theme = useTheme();
    const t = useTranslation();

    if (!student) return null;

    const studentStats = useMemo(
        () => [
            { label: t("Score"), value: student.score },
            { label: t("Status"), value: t(student.status) },
            {
                label: t("CompletedQuestions"),
                value: `${student.completedQuestions}/${student.totalQuestions}`,
            },
            {
                label: t("AvgTimePerQ"),
                value: `${student.avgTimeSec} ${t("Sec")}`,
            },
        ],
        [student, t]
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            scroll="body"
            disableScrollLock
            aria-labelledby="student-details-title"
        >
            <DialogTitle
                id="student-details-title"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 1,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 56,
                            height: 56,
                            fontSize: 22,
                        }}
                        aria-hidden="true"
                    >
                        {student.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {student.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            aria-label={t("StudentProfile")}
                        >
                            {t("StudentProfile")}
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} aria-label={t("Close")}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider />

            {/* Body */}
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Stats Cards */}
                    {studentStats.map((stat, i) => (
                        <Grid size={{ xs: 6 }} key={i}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    textAlign: "center",
                                    bgcolor:
                                        theme.palette.mode === "dark"
                                            ? theme.palette.grey[900]
                                            : theme.palette.grey[50],
                                }}
                                role="group"
                                aria-label={stat.label}
                            >
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {stat.label}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    {stat.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}

                    {/* Contact */}
                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {t("Contact")}
                        </Typography>
                        <Typography variant="body1">
                            {student.name.toLowerCase().replace(" ", ".")}
                            @example.com
                        </Typography>
                    </Grid>

                    {/* Notes */}
                    <Grid size={{ xs: 12 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ mt: 2 }}
                        >
                            {t("Notes")}
                        </Typography>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.grey[900]
                                        : theme.palette.grey[50],
                            }}
                            aria-label={t("Notes")}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {student.name} {t("NotesContent")}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
