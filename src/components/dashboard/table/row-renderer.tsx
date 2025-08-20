"use client";

import { TableCell, Typography } from "@mui/material";
import { motion } from "motion/react";
import ProgressCellRenderer from "./progress-cell-renderer";
import { StudentDTO } from "@/src/types/student";
import StatusCellRenderer from "./status-cell-renderer";

const MotionTableRow = motion.create("tr");

export default function TableRowRenderer({ student }: { student: StudentDTO }) {
    const s = student;

    return (
        <MotionTableRow
            key={s.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{ display: "table-row" }}
        >
            <TableCell align="justify">
                <Typography fontWeight="500">{s.name}</Typography>
            </TableCell>

            <TableCell align="justify">
                <ProgressCellRenderer
                    completed={s.completedQuestions}
                    total={s.totalQuestions}
                />
            </TableCell>

            <TableCell align="justify">{s.avgTimeSec}</TableCell>

            <TableCell align="justify">
                <Typography fontWeight="bold">{s.score}</Typography>
            </TableCell>

            <TableCell align="justify">
                <StatusCellRenderer status={s.status} />
            </TableCell>
        </MotionTableRow>
    );
}
