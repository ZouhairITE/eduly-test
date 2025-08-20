"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import { StudentDTO } from "@/src/types/student";
import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import StatusBarChart from "./charts/BarChart";
import LineChartAverageScore from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";

// ApexCharts dynamic import
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface ExamChartsProps {
    students: StudentDTO[];
    percentCompleted: number; // directly from API
    averageScore: number; // directly from API
}

export default function StatisticsPanel({
    students,
    percentCompleted,
    averageScore,
}: ExamChartsProps) {
    const t = useTranslation();

    // Pie chart using percentCompleted
    const pieSeries = [percentCompleted, 100 - percentCompleted];
    const pieOptions = {
        labels: [t("Completed"), t("NotCompleted")],
        legend: { position: "bottom" },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(0)}%`,
        },
        tooltip: { y: { formatter: (val: number) => `${val.toFixed(0)}%` } },
    };

    // Bar chart: average score per student
    const barSeries = [
        {
            name: t("Score"),
            data: students.map((s) => s.score),
        },
    ];

    const barOptions = {
        chart: { type: "bar" as const, toolbar: { show: false } },
        xaxis: {
            categories: students.map((s) => s.name),
            labels: { rotate: -45 },
        },
        yaxis: { title: { text: t("Score") } },
        dataLabels: { enabled: true },
    };

    return (
        <>
            <PieChartComponent percentCompleted={percentCompleted} />
            <LineChartAverageScore averageScore={averageScore} />
            <StatusBarChart students={students} />
        </>
    );
}
