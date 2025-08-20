"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, Typography } from "@mui/material";
import { StudentDTO } from "@/src/types/student";
import { useTranslation } from "@/src/shared-fe/hooks/use-translation";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface StatusBarChartProps {
    students: StudentDTO[];
}

export default function StatusBarChart({ students }: StatusBarChartProps) {
    const t = useTranslation();

    const completed = students.filter((s) => s.status === "Completed").length;
    const inProgress = students.filter((s) => s.status === "InProgress").length;
    const notStarted = students.filter((s) => s.status === "NotStarted").length;

    const series = [
        { name: t("Students"), data: [completed, inProgress, notStarted] },
    ];
    const options = {
        chart: { type: "bar" as const, toolbar: { show: false } },
        xaxis: {
            categories: [t("Completed"), t("InProgress"), t("NotStarted")],
        },
        yaxis: { title: { text: t("Count") } },
        dataLabels: { enabled: true },
    };

    return (
        <Card sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                    {t("StudentsStatus")}
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
