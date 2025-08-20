"use client";
import dynamic from "next/dynamic";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface PieChartProps {
    percentCompleted: number;
}

export default function PieChartComponent({ percentCompleted }: PieChartProps) {
    const t = useTranslation();
    const theme = useTheme();

    const series = [percentCompleted, 100 - percentCompleted];

    const options: ApexCharts.ApexOptions = {
        labels: [t("Completed"), t("NotCompleted")],
        colors: [theme.palette.success.main, theme.palette.info.main],
        legend: {
            position: "bottom",
            labels: { colors: theme.palette.text.primary },
        },

        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(0)}%`,
        },
        tooltip: {
            enabled: false,
            y: {
                formatter: (val: number) => `${val.toFixed(0)}%`,
            },
        },
    };

    return (
        <Card sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {t("ExamCompletion")}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {t("StatusChartSubtitle")}
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
