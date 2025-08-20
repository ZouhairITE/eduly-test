"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "@/src/shared-fe/hooks/use-translation";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface PieChartProps {
    percentCompleted: number;
}

export default function PieChartComponent({ percentCompleted }: PieChartProps) {
    const t = useTranslation();

    const series = [percentCompleted, 100 - percentCompleted];
    const options = {
        labels: [t("Completed"), t("NotCompleted")],
        legend: { position: "bottom" },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(0)}%`,
        },
        tooltip: { y: { formatter: (val: number) => `${val.toFixed(0)}%` } },
    };

    return (
        <Card sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {t("ExamCompletion")}
                </Typography>
                <ReactApexChart
                    type="pie"
                    series={series}
                    options={options}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
