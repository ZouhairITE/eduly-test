"use client";

import { motion } from "motion/react";

import { StudentDTO } from "@/src/types/student";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import ProgressCellRenderer from "./progress-cell-renderer";
import StatusCellRenderer from "./status-cell-renderer";

const MotionTableRow = motion.create(TableRow);

interface TableRowRendererProps {
    student: StudentDTO;
    index: number;
    selectedIndex: number | null;
    setSelectedIndex: (idx: number) => void;
    onOpenModal: () => void;
}

export default function TableRowRenderer({
    student,
    index,
    selectedIndex,
    setSelectedIndex,
    onOpenModal,
}: TableRowRendererProps) {
    const isSelected = selectedIndex === index;

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
                onClick={() => onOpenModal()}
                onMouseEnter={() => setSelectedIndex(index)}
                style={{
                    cursor: "pointer",
                    backgroundColor: isSelected
                        ? "rgba(25, 118, 210, 0.08)"
                        : undefined,
                }}
                role="row"
                tabIndex={0}
                aria-selected={isSelected}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onOpenModal();
                    }
                }}
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
        </>
    );
}
