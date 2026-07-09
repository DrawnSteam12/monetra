import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "../../../../../assets/css/features/dashboard/charts.css";
import type { CategoryBreakdown } from "../../../../types/dashboard.types";
import CategorySpendingChartSkeleton from "./CategorySpendingChartSkeleton";
import EmptyState from "../../../../components/common/EmptyState/EmptyState";
import { useMemo } from "react";
import ChartTooltip from "./ChartTooltip";

type CategorySpendingChartProps = {
  categoryBreakdown?: CategoryBreakdown[];
  loading: boolean;
};

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

const CategorySpendingChart = ({
  categoryBreakdown,
  loading,
}: CategorySpendingChartProps) => {
  const formattedCategoryData = useMemo(() => {
    return (
      categoryBreakdown?.map((item) => ({
        name: item.category,
        value: item.total,
      })) ?? []
    );
  }, [categoryBreakdown]);

  if (loading) {
    return <CategorySpendingChartSkeleton />;
  }

  if (formattedCategoryData.length === 0) {
    return (
      <section
        className="dashboard-chart-card"
        aria-labelledby="category-spending-title"
      >
        <div className="chart-header">
          <div>
            <h2 id="category-spending-title">Spending by Category</h2>
            <p>Expense category overview</p>
          </div>
        </div>

        <EmptyState
          title="No spending categories yet"
          description="Your expense categories will appear here after adding transactions."
        />
      </section>
    );
  }
  return (
    <section
      className="dashboard-chart-card"
      aria-labelledby="category-spending-title"
    >
      <div className="chart-header">
        <div>
          <h2 id="category-spending-title">Spending by Category</h2>

          <p>Expense category overview</p>
        </div>
      </div>

      <div
        className="pie-chart-container"
        role="img"
        aria-label="Pie chart showing spending by category"
      >
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={formattedCategoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={3}
              isAnimationActive
              animationDuration={1000}
              animationBegin={200}
              animationEasing="ease-out"
            >
              {formattedCategoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="category-legend">
        {formattedCategoryData.map((item, index) => (
          <div key={item.name} className="category-legend-item">
            <span
              className="category-dot"
              aria-hidden="true"
              style={{
                background: COLORS[index % COLORS.length],
              }}
            />

            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySpendingChart;
