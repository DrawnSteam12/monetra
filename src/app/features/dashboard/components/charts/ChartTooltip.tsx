import { formatCurrency } from "../../../../utils/formatCurrency";
import "../../../../../assets/css/features/dashboard/chart-tooltip.css";

type ChartTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>

      {payload.map((entry) => (
        <div key={entry.dataKey} className="chart-tooltip-item">
          <span
            className="chart-tooltip-color"
            style={{
              backgroundColor: entry.color,
            }}
          />

          <span className="chart-tooltip-name">{entry.name}</span>

          <strong className="chart-tooltip-value">
            {formatCurrency(entry.value)}
          </strong>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
