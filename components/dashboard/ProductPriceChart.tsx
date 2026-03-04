"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ProductPriceChartProps {
  data: { name: string; price: number }[];
}

const chartConfig = {
  price: {
    label: "Precio",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ProductPriceChart({ data }: ProductPriceChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">
        Sin datos para mostrar
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[220px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            value.length > 8 ? value.slice(0, 8) + "…" : value
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Precio"]}
            />
          }
        />
        <Bar dataKey="price" fill="var(--color-price)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
