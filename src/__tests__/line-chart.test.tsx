import "@testing-library/jest-dom";

import { ComponentType } from "react";

import { render, screen } from "@testing-library/react";

import LineChart from "../components/dashboard/charts/line-chart";

jest.mock("next/dynamic", () => () => {
    const Mock: ComponentType<Record<string, unknown>> = (props) => (
        <div data-testid="chart">{JSON.stringify(props)}</div>
    );
    Mock.displayName = "MockDynamicComponent"; // fixes display-name warning
    return Mock;
});

jest.mock("../shared-fe/hooks/use-translation", () => ({
    useTranslation: () => (key: string) => key,
}));

describe("LineChart", () => {
    it("renders chart with data", () => {
        render(<LineChart averageScore={75} />);

        const chart = screen.getByTestId("chart");
        expect(chart).toBeInTheDocument();

        expect(chart).toHaveTextContent("75");

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
