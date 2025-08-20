"use client";
import dynamic from "next/dynamic";
import React from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { StudentDTO } from "@/src/types/student";
import { useTheme } from "@mui/material/styles";

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
        <ReactApexChart
            type="bar"
            series={series}
            options={options}
            height={300}
        />
    );
}
