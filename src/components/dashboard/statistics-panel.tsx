import React from "react";

import { StudentDTO } from "@/src/types/student";

import StatusBarChart from "./charts/BarChart";
import LineChartAverageScore from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";

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
            <PieChartComponent percentCompleted={percentCompleted} />
            <LineChartAverageScore averageScore={averageScore} />
            <StatusBarChart students={students} />
        </>
    );
}
