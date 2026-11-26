import { useEffect, useState } from "react";
import {
  getOutSpecRateChart,
  type OutSpecRateResponse,
} from "../../../api/monaco/dashboard/outSpecRate";

interface TrendSectionProps {
  periodType: string;
  periodValue: string;
}

const COLORS = [
  "#6a11cb",
  "#f472b6",
  "#f97316",
  "#22c55e",
  "#06b6d4",
  "#ef4444",
];

export default function TrendSection({
  periodType,
  periodValue,
}: TrendSectionProps) {
  const [reflowData, setReflowData] = useState<OutSpecRateResponse | null>(null);
  const [defluxData, setDefluxData] = useState<OutSpecRateResponse | null>(null);

  const [reflowLoading, setReflowLoading] = useState(true);
  const [defluxLoading, setDefluxLoading] = useState(true);

  const [reflowScope, setReflowScope] = useState("All");
  const [defluxScope, setDefluxScope] = useState("All");

  // 1. Fetch dữ liệu Reflow độc lập
  useEffect(() => {
    let isMounted = true;

    const fetchReflow = async () => {
      try {
        setReflowLoading(true);
        const res = await getOutSpecRateChart(
          "reflow",
          periodType,
          periodValue,
          reflowScope
        );
        if (isMounted) setReflowData(res);
      } catch (error) {
        console.error("Failed to fetch reflow data:", error);
      } finally {
        if (isMounted) setReflowLoading(false);
      }
    };

    fetchReflow();
    return () => {
      isMounted = false;
    };
  }, [periodType, periodValue, reflowScope]);

  // 2. Fetch dữ liệu Deflux độc lập
  useEffect(() => {
    let isMounted = true;

    const fetchDeflux = async () => {
      try {
        setDefluxLoading(true);
        const res = await getOutSpecRateChart(
          "deflux",
          periodType,
          periodValue,
          defluxScope
        );
        if (isMounted) setDefluxData(res);
      } catch (error) {
        console.error("Failed to fetch deflux data:", error);
      } finally {
        if (isMounted) setDefluxLoading(false);
      }
    };

    fetchDeflux();
    return () => {
      isMounted = false;
    };
  }, [periodType, periodValue, defluxScope]);

  const getLegend = (data: OutSpecRateResponse | null): string[] => {
    if (!data?.chart?.length) return [];
    const first = data.chart[0];

    if (data.view_mode === "by_line") {
      return first.lines?.map((x) => x.line) ?? [];
    }
    return first.machines?.map((x) => x.machine) ?? [];
  };

  const getRate = (
    data: OutSpecRateResponse | null,
    periodIndex: number,
    label: string
  ): number => {
    const bucket = data?.chart?.[periodIndex];
    if (!bucket) return 0;

    if (data?.view_mode === "by_line") {
      return bucket.lines?.find((x) => x.line === label)?.rate ?? 0;
    }
    return bucket.machines?.find((x) => x.machine === label)?.rate ?? 0;
  };

  // Tính toán danh sách tọa độ (x, y) có padding để không bị cắt nét ở 0% và 100%
  const getCoordinates = (data: OutSpecRateResponse | null, label: string) => {
    if (!data?.chart?.length) return [];

    const svgWidth = 400;
    const svgHeight = 150;
    const paddingX = 12;
    const paddingY = 12;

    const usableWidth = svgWidth - paddingX * 2;
    const usableHeight = svgHeight - paddingY * 2;
    const count = data.chart.length;

    return data.chart.map((bucket, idx) => {
      const rate = getRate(data, idx, label);
      const x =
        count === 1
          ? svgWidth / 2
          : paddingX + (idx * usableWidth) / (count - 1);
      const y = paddingY + usableHeight - (rate / 100) * usableHeight;

      return { x, y, rate, period: bucket.period };
    });
  };

  const createPath = (points: { x: number; y: number }[]): string => {
    if (points.length < 2) return "";
    return "M " + points.map((p) => `${p.x},${p.y}`).join(" L ");
  };

  const formatPeriod = (period: string) => {
    if (periodType.toLowerCase() === "week" && period.includes("-")) {
      const parts = period.split("-");
      if (parts.length === 3) {
        return `${parts[1]}-${parts[2]}`;
      }
    }
    return period;
  };

  const renderChartCard = (
    title: string,
    data: OutSpecRateResponse | null,
    isLoading: boolean,
    scope: string,
    onScopeChange: (val: string) => void,
    scopeOptions: string[]
  ) => {
    const legends = getLegend(data);

    return (
      <article className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-[#a3aed0]">{title}</p>
            <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">
              {data?.summary?.fail ?? 0}/{data?.summary?.total ?? 0} strips
              {data?.summary?.rate !== undefined && (
                <span className="ml-2 text-xs font-bold text-slate-400">
                  ({data.summary.rate}%)
                </span>
              )}
            </h4>
          </div>

          <select
            value={scope}
            onChange={(e) => onScopeChange(e.target.value)}
            className="px-3 py-1 bg-[#f4f7fe] text-xs font-medium text-[#1b2559] rounded-full border border-slate-200 outline-none cursor-pointer"
          >
            {scopeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Legends */}
        <div className="flex gap-3 flex-wrap mb-4 min-h-[20px]">
          {legends.map((item, index) => (
            <div key={item} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs font-medium text-slate-600">{item}</span>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div
          className={`h-48 relative transition-opacity duration-200 ${
            isLoading ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          {!isLoading && (!data?.chart || data.chart.length === 0) ? (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
              No data available
            </div>
          ) : (
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 400 150"
              preserveAspectRatio="none"
            >
              {/* Đường kẻ ngang tham chiếu 0%, 50%, 100% */}
              {[12, 75, 138].map((yPos) => (
                <line
                  key={yPos}
                  x1="12"
                  y1={yPos}
                  x2="388"
                  y2={yPos}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {legends.map((item, index) => {
                const color = COLORS[index % COLORS.length];
                const points = getCoordinates(data, item);

                return (
                  <g key={item}>
                    <path
                      d={createPath(points)}
                      fill="none"
                      stroke={color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {points.map((pt, idx) => (
                      <circle
                        key={`${item}-${idx}`}
                        cx={pt.x}
                        cy={pt.y}
                        r="3"
                        fill="#ffffff"
                        stroke={color}
                        strokeWidth="2"
                      >
                        <title>{`${item} (${formatPeriod(pt.period)}): ${pt.rate}%`}</title>
                      </circle>
                    ))}
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* X-Axis Labels */}
        <div className="mt-3 flex justify-between text-xs text-slate-400 px-1">
          {data?.chart?.map((item) => (
            <span key={item.period}>{formatPeriod(item.period)}</span>
          ))}
        </div>
      </article>
    );
  };

  return (
    <section
      aria-label="Out Spec Line Trends"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {renderChartCard(
        "Reflow Out Spec Rate",
        reflowData,
        reflowLoading,
        reflowScope,
        setReflowScope,
        ["All", "SMT1", "SMT2", "SMT3"]
      )}

      {renderChartCard(
        "Deflux Out Spec Rate",
        defluxData,
        defluxLoading,
        defluxScope,
        setDefluxScope,
        ["All", "Deflux1", "Deflux2", "Deflux3"]
      )}
    </section>
  );
}
