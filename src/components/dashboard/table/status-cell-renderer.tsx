"use client";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import { StudentDTO } from "@/src/types/student";
import Typography from "@mui/material/Typography";

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
