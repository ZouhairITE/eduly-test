import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";

export default function ExamInfoCardSkeleton() {
    return (
        <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={<Skeleton width="60%" />}
                subheader={<Skeleton width="40%" />}
            />
            <CardContent sx={{ display: "grid", gap: 1.5 }}>
                <Skeleton width="30%" />
                <Skeleton width="50%" />
                <Skeleton width="40%" />
            </CardContent>
        </Card>
    );
}
