"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UsePollingOptions<T> = {
    fetcher: () => Promise<T>;
    intervalMs?: number;
    immediate?: boolean;
};

export function usePolling<T>({
    fetcher,
    intervalMs = 4000,
    immediate = true,
}: UsePollingOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(immediate);
    const timerRef = useRef<number | null>(null);

    const run = useCallback(async () => {
        try {
            setLoading(true);
            const result = await fetcher();
            setData(result);
            setError(null);
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    }, [fetcher]);

    useEffect(() => {
        if (immediate) run();

        timerRef.current = window.setInterval(run, intervalMs);
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, [intervalMs, immediate, run]);

    return { data, error, loading, refresh: run };
}
