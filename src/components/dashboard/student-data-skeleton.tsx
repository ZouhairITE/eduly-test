import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export default function StudentsDataSkeleton() {
    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card elevation={3} sx={{ borderRadius: 3 }}>
                    <CardContent sx={{ display: "grid", gap: 2, p: 3 }}>
                        <Skeleton width="60%" height={30} />
                        <Skeleton width="80%" height={30} />
                        <Skeleton width="50%" height={30} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
                    <Box sx={{ display: "grid", gap: 1 }}>
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <Skeleton
                                key={idx}
                                variant="rectangular"
                                height={40}
                            />
                        ))}
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
