"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface AnimatedProgressProps {
    completed: number;
    total: number;
}

export default function ProgressCellRenderer({
    completed,
    total,
}: AnimatedProgressProps) {
    const progress = (completed / total) * 100;

    const motionValue = useMotionValue(progress);
    const smoothProgress = useSpring(motionValue, {
        stiffness: 120,
        damping: 20,
    });

    const [barValue, setBarValue] = useState(progress);

    useEffect(() => {
        const unsubscribe = smoothProgress.onChange((v) => {
            setBarValue(v);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    useEffect(() => {
        motionValue.set(progress);
    }, [progress, motionValue]);

    return (
        <Box>
            <Typography variant="body2" color="text.secondary">
                {completed}/{total}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={barValue}
                sx={{
                    height: 6,
                    borderRadius: 5,
                    mt: 0.5,
                    transition: "none",
                }}
            />
        </Box>
    );
}
