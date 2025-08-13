"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const description = "A horizontal bar chart";

const chartConfig = {
  open: {
    label: "Pending",
    color: "var(--chart-1)",
  },
  closed: {
    label: "Resolved",
    color: "var(--chart-2)",
  },
  progress: {
    label: "In Progress",
    color: "var(--chart-3)",
  },
};

export function ChartBarHorizontal({ data }) {
  const chartData = [
    { category: "Flood", open: 0, closed: 0, inProgress: 0, range: 0 },
    {
      category: "Broken Streetlights",
      open: 0,
      closed: 0,
      inProgress: 0,
      range: 0,
    },
    { category: "Damaged Road", open: 0, closed: 0, inProgress: 0, range: 0 },
    {
      category: "Overflowing Community Dump",
      open: 0,
      closed: 0,
      inProgress: 0,
      range: 0,
    },
    { category: "Homeless", open: 0, closed: 0, inProgress: 0, range: 0 },
  ];

  data.forEach((item) => {
    const category = chartData.find(
      (c) => c.category.toLowerCase() === item.category.toLowerCase()
    );
    if (category && item.status === "open") {
      category.open += 1;
      category.range += 1;
    } else if (category && item.status === "closed") {
      category.closed += 1;
      category.range += 1;
    } else if (category && item.status === "in_progress") {
      category.inProgress += 1;
      category.range += 1;
    }
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of Complains</CardTitle>
        <CardDescription>Complains by Issue Type and Category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <XAxis type="number" dataKey="range" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="open"
              stackId="a"
              fill="var(--color-open)"
              radius={[5, 0, 0, 5]}
            />
            <Bar
              dataKey="inProgress"
              stackId="a"
              fill="var(--color-progress)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="closed"
              stackId="a"
              fill="var(--color-closed)"
              radius={[0, 5, 5, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-start gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="bg-chart-1 h-2 w-2 rounded-full"></div>
          <p>Pending</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-chart-2 h-2 w-2 rounded-full"></div>
          <p>Resolved</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-chart-3 h-2 w-2 rounded-full"></div>
          <p>In Progress</p>
        </div>
      </CardFooter>
    </Card>
  );
}
