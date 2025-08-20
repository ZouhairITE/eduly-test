import React from "react";

import { StudentDTO } from "@/src/types/student";

import StatusBarChart from "./charts/bar-chart";
import LineChartAverageScore from "./charts/line-chart";
import PieChartComponent from "./charts/pie-chart";

interface ExamChartsProps {
    students: StudentDTO[];
    percentCompleted: number;
    averageScore: number;
}

export default function StatisticsPanel({
    students,
    percentCompleted,
    averageScore,
}: ExamChartsProps) {
    return (
        <>
            <LineChartAverageScore averageScore={averageScore} />
            <StatusBarChart students={students} />
            <PieChartComponent percentCompleted={percentCompleted} />
        </>
    );
}
