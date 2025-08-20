"use client";

import { Typography } from "@mui/material";
import { StudentDTO } from "@/src/types/student";
import { useTranslation } from "@/src/shared-fe/hooks/use-translation";

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
