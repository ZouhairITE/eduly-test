"use client";

import { Typography } from "@mui/material";
import { StudentDTO } from "../../types/student";
import { useTranslation } from "../../shared-fe/hooks/use-translation";

export default function StatusRenderer({
    status,
}: {
    status: StudentDTO["status"];
}) {
    const t = useTranslation();

    const color =
        status === "Completed"
            ? "success"
            : status === "InProgress"
            ? "warning"
            : "error";

    return (
        <Typography color={color} fontWeight="500">
            {t(status)}
        </Typography>
    );
}
