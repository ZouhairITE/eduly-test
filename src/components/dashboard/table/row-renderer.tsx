"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { StudentDTO } from "@/src/types/student";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import ProgressCellRenderer from "./progress-cell-renderer";
import StatusCellRenderer from "./status-cell-renderer";
import StudentDetailsModal from "./student-details-modal";

const MotionTableRow = motion.create(TableRow);

export default function TableRowRenderer({ student }: { student: StudentDTO }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MotionTableRow
                key={student.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                hover
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
            >
                <TableCell align="justify">
                    <Typography fontWeight="500">{student.name}</Typography>
                </TableCell>

                <TableCell align="justify">
                    <ProgressCellRenderer
                        completed={student.completedQuestions}
                        total={student.totalQuestions}
                    />
                </TableCell>

                <TableCell align="justify">{student.avgTimeSec}</TableCell>

                <TableCell align="justify">
                    <Typography fontWeight="bold">{student.score}</Typography>
                </TableCell>

                <TableCell align="justify">
                    <StatusCellRenderer status={student.status} />
                </TableCell>
            </MotionTableRow>

            <StudentDetailsModal
                open={open}
                onClose={() => setOpen(false)}
                student={student}
            />
        </>
    );
}
