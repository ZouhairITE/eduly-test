"use client";
import dynamic from "next/dynamic";
import React from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { StudentDTO } from "@/src/types/student";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface StatusBarChartProps {
    students: StudentDTO[];
}

export default function StatusBarChart({ students }: StatusBarChartProps) {
    const theme = useTheme();
    const t = useTranslation();
    const completed = students.filter((s) => s.status === "Completed").length;
    const inProgress = students.filter((s) => s.status === "InProgress").length;
    const notStarted = students.filter((s) => s.status === "NotStarted").length;

    const series = [
        { name: "Students", data: [completed, inProgress, notStarted] },
    ];
    const options: ApexCharts.ApexOptions = {
        chart: { type: "bar", toolbar: { show: false } },
        xaxis: {
            categories: [t("Completed"), t("InProgress"), t("NotStarted")],
            labels: { style: { colors: theme.palette.text.primary } },
        },
        plotOptions: {
            bar: {
                distributed: true,
            },
        },
        tooltip: { enabled: false },
        yaxis: { labels: { style: { colors: theme.palette.text.primary } } },
        dataLabels: {
            enabled: true,
        },
        legend: {
            show: false,
        },
        colors: [
            theme.palette.success.main,
            theme.palette.warning.main,
            theme.palette.error.main,
        ],
    };
    return (
        <Card sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {t("StudentsByStatus")}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {t("StatusesChartSubtitle")}
                </Typography>
                <ReactApexChart
                    type="bar"
                    series={series}
                    options={options}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
