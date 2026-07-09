import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useMemo } from "react";

import "../../../../../assets/css/features/dashboard/charts.css";

import type { MonthlyTrend } from "../../../../types/dashboard.types";

import IncomeExpenseChartSkeleton from "./IncomeExpenseChartSkeleton";

import EmptyState from "../../../../components/common/EmptyState/EmptyState";

import ChartTooltip from "./ChartTooltip";

type IncomeExpenseChartProps = {
  monthlyTrend?: MonthlyTrend[];

  loading: boolean;
};

const IncomeExpenseChart = ({
  monthlyTrend,
  loading,
}: IncomeExpenseChartProps) => {
  const formattedChartData = useMemo(() => {
    return (
      monthlyTrend?.map((item) => ({
        month: new Date(item.year, item.month - 1).toLocaleString("en-US", {
          month: "short",
        }),

        income: item.income,

        expense: item.expenses,
      })) ?? []
    );
  }, [monthlyTrend]);

  if (loading) {
    return <IncomeExpenseChartSkeleton />;
  }

  if (formattedChartData.length === 0) {
    return (
      <section
        className="dashboard-chart-card"
        aria-labelledby="income-expense-title"
      >
        <div className="chart-header">
          <div>
            <h2 id="income-expense-title">Income vs Expenses</h2>

            <p>Monthly financial overview</p>
          </div>
        </div>

        <EmptyState
          title="No chart data yet"
          description="Start adding transactions to visualize your monthly income and expenses."
        />
      </section>
    );
  }

  return (
    <section
      className="dashboard-chart-card"
      aria-labelledby="income-expense-title"
    >
      <div className="chart-header">
        <div>
          <h2 id="income-expense-title">Income vs Expenses</h2>

          <p>Monthly financial overview</p>
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot income-dot" aria-hidden="true" />

            <p>Income</p>
          </div>

          <div className="legend-item">
            <span className="legend-dot expense-dot" aria-hidden="true" />

            <p>Expenses</p>
          </div>
        </div>
      </div>

      <div
        className="chart-container"
        role="img"
        aria-label="Area chart showing monthly income and expenses"
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={formattedChartData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />

                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />

                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border-color)"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              width={38}
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<ChartTooltip />} />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#expenseGradient)"
              isAnimationActive
              animationDuration={1100}
              animationBegin={150}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default IncomeExpenseChart;
