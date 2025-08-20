"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { StudentDTO } from "@/src/types/student";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import TableRowRenderer from "./table/row-renderer";
import StudentDetailsModal from "./table/student-details-modal";

type Order = "asc" | "desc";

export default function GridPanel({ students }: { students: StudentDTO[] }) {
    const t = useTranslation();
    const [orderBy, setOrderBy] = useState<keyof StudentDTO>("score");
    const [order, setOrder] = useState<Order>("asc");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [modalStudent, setModalStudent] = useState<StudentDTO | null>(null);

    const handleSort = (property: keyof StudentDTO) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedStudents = [...students].sort((a, b) => {
        const valA = a[orderBy];
        const valB = b[orderBy];

        if (typeof valA === "number" && typeof valB === "number") {
            return order === "asc" ? valA - valB : valB - valA;
        }
        return order === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });

    // Keyboard navigation code
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (sortedStudents.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev === null || prev >= sortedStudents.length - 1
                        ? 0
                        : prev + 1
                );
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev === null || prev <= 0
                        ? sortedStudents.length - 1
                        : prev - 1
                );
            }

            if (e.key === "Enter" && selectedIndex !== null) {
                setModalStudent(sortedStudents[selectedIndex]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [sortedStudents, selectedIndex]);

    return (
        <>
            <TableContainer
                component={Card}
                sx={{
                    maxHeight: 500,
                    borderRadius: 3,
                    boxShadow: 3,
                    overflowX: "auto",
                }}
            >
                <Table stickyHeader aria-label="student table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="justify">
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={
                                        orderBy === "name" ? order : "asc"
                                    }
                                    onClick={() => handleSort("name")}
                                >
                                    {t("Name")}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="justify">
                                {t("Progress")}
                            </TableCell>
                            <TableCell align="justify">
                                {t("AvgTime")}
                            </TableCell>
                            <TableCell align="justify">
                                <TableSortLabel
                                    active={orderBy === "score"}
                                    direction={
                                        orderBy === "score" ? order : "asc"
                                    }
                                    onClick={() => handleSort("score")}
                                >
                                    {t("Score")}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="justify">
                                <TableSortLabel
                                    active={orderBy === "status"}
                                    direction={
                                        orderBy === "status" ? order : "asc"
                                    }
                                    onClick={() => handleSort("status")}
                                >
                                    {t("Status")}
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody data-testid="student-list" role="rowgroup">
                        <AnimatePresence>
                            {sortedStudents.map((s, idx) => (
                                <TableRowRenderer
                                    key={s.id}
                                    student={s}
                                    index={idx}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                    onOpenModal={() => setModalStudent(s)}
                                />
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            {modalStudent && (
                <StudentDetailsModal
                    open={!!modalStudent}
                    student={modalStudent}
                    onClose={() => setModalStudent(null)}
                />
            )}
        </>
    );
}
