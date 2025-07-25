import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A multiple bar chart";

const chartConfig = {
  value: {
    label: "Category",
    color: "var(--chart-2)",
  },
};

const ChartBarMultiple = ({ data }) => {
  console.log(data);
  const chartData = [
    { category: "Flood", value: 0 },
    { category: "Broken Streetlights", value: 0 },
    { category: "Damaged Road", value: 0 },
    { category: "Overflowing Community Dump", value: 0 },
    { category: "Homeless", value: 0 },
  ];
  data.forEach((item) => {
    const category = chartData.find(
      (c) => c.category.toLowerCase() === item.category.toLowerCase()
    );
    if (category) {
      category.value += 1;
    }
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complains by Issue Type and Category</CardTitle>
        <CardDescription>Number of issues</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="value" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Number of issues <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total issues for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartBarMultiple;
