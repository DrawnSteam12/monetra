import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { MonthlyTrend } from "../../../types/analytics.type";

import MonthlySpendingChartSkeleton from "./skeleton/MonthlySpendingChartSkeleton/MonthlySpendingChartSkeleton";
import EmptyState from "../../../components/common/EmptyState/EmptyState";

import "../../../../assets/css/features/analytics/monthly-spending-chart.css";

type MonthlySpendingChartProps = {
  monthlyData: MonthlyTrend[];
  loading: boolean;
};

const MonthlySpendingChart = ({
  monthlyData,
  loading,
}: MonthlySpendingChartProps) => {
  const monthLabels = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = monthlyData.map((item) => ({
    ...item,
    monthLabel: monthLabels[item.month],
  }));

  if (loading) {
    return <MonthlySpendingChartSkeleton />;
  }

  if (monthlyData.length === 0) {
    return (
      <section className="monthly-chart-card">
        <EmptyState
          title="No spending date"
          description="Start adding transactions to visualize your monthly spending"
        />
      </section>
    );
  }

  return (
    <section className="monthly-chart-card">
      <div className="monthly-chart-header">
        <div>
          <h2>Monthly Spending</h2>

          <p>Income vs expenses trends</p>
        </div>
      </div>

      <div className="monthly-chart-wrapper">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />

            <XAxis dataKey="monthLabel" />

            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MonthlySpendingChart;
