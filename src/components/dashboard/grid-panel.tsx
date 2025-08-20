"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { StudentDTO } from "@/src/types/student";
import {
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";

import TableRowRenderer from "./table/row-renderer";

type Order = "asc" | "desc";

export default function GridPanel({ students }: { students: StudentDTO[] }) {
    const [orderBy, setOrderBy] = useState<keyof StudentDTO>("name");
    const [order, setOrder] = useState<Order>("asc");
    const t = useTranslation();

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

    return (
        <TableContainer
            component={Card}
            sx={{
                maxHeight: 500,
                borderRadius: 3,
                boxShadow: 3,
                overflowX: "auto",
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="justify">
                            <TableSortLabel
                                active={orderBy === "name"}
                                direction={orderBy === "name" ? order : "asc"}
                                onClick={() => handleSort("name")}
                            >
                                {t("Name")}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="justify">{t("Progress")}</TableCell>
                        <TableCell align="justify">{t("AvgTime")}</TableCell>
                        <TableCell align="justify">
                            <TableSortLabel
                                active={orderBy === "score"}
                                direction={orderBy === "score" ? order : "asc"}
                                onClick={() => handleSort("score")}
                            >
                                {t("Score")}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="justify">
                            <TableSortLabel
                                active={orderBy === "status"}
                                direction={orderBy === "status" ? order : "asc"}
                                onClick={() => handleSort("status")}
                            >
                                {t("Status")}
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <AnimatePresence>
                        {sortedStudents.map((s) => (
                            <TableRowRenderer key={s.id} student={s} />
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
