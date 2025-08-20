"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface LineChartProps {
    averageScore: number;
}

export default function LineChartAverageScore({
    averageScore,
}: LineChartProps) {
    const t = useTranslation();
    const theme = useTheme();
    const [dataSeries, setDataSeries] = useState<number[]>([]);

    // Append new data point whenever averageScore changes
    useEffect(() => {
        setDataSeries((prev) => {
            const newSeries = [...prev, averageScore];
            return newSeries.slice(-7);
        });
    }, [averageScore]);

    const series = [{ name: t("AverageScore"), data: dataSeries }];
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
            animations: { enabled: true, speed: 500 },
        },
        tooltip: {
            enabled: false,
        },
        stroke: { curve: "smooth" },
        xaxis: {
            categories: dataSeries.map((_, idx) => idx + 1),
            labels: { style: { colors: theme.palette.text.primary } },
        },
        yaxis: {
            title: {
                text: t("Score"),
                style: { color: theme.palette.text.primary },
            },
            labels: { style: { colors: theme.palette.text.primary } },
        },
        markers: {
            size: 5,
            colors: [theme.palette.primary.main],
            strokeColors: theme.palette.text.primary,
        },
        dataLabels: {
            enabled: true,
        },
    };

    return (
        <Card sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {t("AverageScoreOverTime")}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    {t("AvgScoreSubtitle")}
                </Typography>
                <ReactApexChart
                    type="line"
                    series={series}
                    options={options}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
