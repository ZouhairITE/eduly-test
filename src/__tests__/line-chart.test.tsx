import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import LineChart from "../components/dashboard/charts/line-chart";

jest.mock("next/dynamic", () => (fn: any) => {
    const Component = fn();
    return (props: any) => (
        <div data-testid="chart">{JSON.stringify(props)}</div>
    );
});

jest.mock("../shared-fe/hooks/use-translation", () => ({
    useTranslation: () => (key: string) => key,
}));

describe("LineChart", () => {
    it("renders chart with data", () => {
        render(<LineChart averageScore={75} />);

        // Check if chart container exists
        const chart = screen.getByTestId("chart");
        expect(chart).toBeInTheDocument();

        // Check if the series contains the correct score
        expect(chart).toHaveTextContent("75");

        // Check if title renders
        expect(screen.getByText("AverageScoreOverTime")).toBeInTheDocument();
    });

    it("updates chart when averageScore changes", () => {
        const { rerender } = render(<LineChart averageScore={50} />);

        let chart = screen.getByTestId("chart");
        expect(chart).toHaveTextContent("50");

        // Update prop
        rerender(<LineChart averageScore={80} />);
        chart = screen.getByTestId("chart");
        expect(chart).toHaveTextContent("50");
        expect(chart).toHaveTextContent("80");
    });
});
