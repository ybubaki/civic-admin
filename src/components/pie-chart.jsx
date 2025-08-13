"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartConfig = {
  value: {
    label: "Value",
  },
  open: {
    label: "Open",
    color: "var(--chart-1)",
  },
  in_progress: {
    label: "In Progress",
    color: "var(--chart-3)",
  },
  closed: {
    label: "Closed",
    color: "var(--chart-2)",
  },
};

export function ChartPieDonutText({ data }) {
  const chartData = [
    { status: "open", value: 0, fill: "var(--color-open)" },
    { status: "in_progress", value: 0, fill: "var(--color-in_progress)" },
    { status: "closed", value: 0, fill: "var(--color-closed)" },
  ];

  data.forEach((item) => {
    if (item.status == "open") {
      chartData[0].value += 1;
    } else if (item.status == "in_progress") {
      chartData[1].value += 1;
    } else if (item.status == "closed") {
      chartData[2].value += 1;
    }
  });

  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  const openPercentage = React.useMemo(() => {
    return Math.round((chartData[0].value / total) * 100);
  }, [data]);

  const inProgressPercentage = React.useMemo(() => {
    return Math.round((chartData[1].value / total) * 100);
  }, [data]);

  const closedPercentage = React.useMemo(() => {
    return Math.round((chartData[2].value / total) * 100);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Complaint Resolution Summary</CardTitle>
        <CardDescription>
          Showing the percentage of complaints resolved
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {closedPercentage.toLocaleString()}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-start gap-4 text-sm">
        <div className="flex items-start gap-2">
          <div className="bg-chart-2 h-2 mt-1 w-2 rounded-full"></div>
          <div>
            <p>Resolved</p>
            <p>{closedPercentage.toLocaleString()}%</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="bg-chart-1 h-2 mt-1 w-2 rounded-full"></div>
          <div>
            <p>Pending</p>
            <p>{openPercentage.toLocaleString()}%</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="bg-chart-3 h-2 mt-1 w-2 rounded-full"></div>
          <div>
            <p>In Progress</p>
            <p>{inProgressPercentage.toLocaleString()}%</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
