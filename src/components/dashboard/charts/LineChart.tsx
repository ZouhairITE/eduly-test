"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { useEffect, useState } from "react";

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
    const [dataSeries, setDataSeries] = useState<number[]>([]);

    // Append new data point whenever averageScore changes
    useEffect(() => {
        setDataSeries((prev) => [...prev, averageScore]);
    }, [averageScore]);

    const series = [{ name: t("AverageScore"), data: dataSeries }];
    const options = {
        chart: { type: "line" as const, toolbar: { show: false } },
        stroke: { curve: "smooth" },
        xaxis: { categories: dataSeries.map((_, idx) => idx + 1) },
        yaxis: { title: { text: t("Score") } },
        markers: { size: 5 },
        dataLabels: { enabled: true },
    };

    return (
        <Card sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {t("AverageScoreOverTime")}
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
