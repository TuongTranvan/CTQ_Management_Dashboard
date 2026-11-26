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

  const [loading, setLoading] = useState(true);

  const [reflowScope, setReflowScope] = useState("All");
  const [defluxScope, setDefluxScope] = useState("All");

  const [reflowHoverPoint, setReflowHoverPoint] = useState<any>(null);
  const [defluxHoverPoint, setDefluxHoverPoint] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);

      try {

        const reflow = await getOutSpecRateChart(
          "reflow",
          periodType,
          periodValue,
          reflowScope
        );

        setReflowData(reflow);

        const deflux = await getOutSpecRateChart(
          "deflux",
          periodType,
          periodValue,
          defluxScope
        );

        setDefluxData(deflux);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };


    fetchData();

  }, [
    periodType,
    periodValue,
    reflowScope,
    defluxScope
  ]);


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
    const paddingX = 40;
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
    scopeOptions: string[],
    hoverPoint: any,
    setHoverPoint: any
  ) => {

    const legends = getLegend(data);

    return (
      <article className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">

        {isLoading && (
          <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#4318ff] rounded-full animate-spin" />
          </div>
        )}
        {/* Header */}
        <div className="flex items-start justify-between mb-4">

          <div className="min-w-0">

            <p className="text-xs font-semibold text-[#a3aed0]">
              {title}
            </p>

            <div className="flex items-center space-x-2 mt-0.5">

              <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">
                {(data?.summary?.fail ?? 0).toLocaleString()}/
                {(data?.summary?.total ?? 0).toLocaleString()} strips
              </h4>

              {data?.summary?.rate !== undefined && (
                <span className="text-xs font-semibold text-[#a3aed0]">
                  ({data.summary.rate}%)
                </span>
              )}

            </div>

          </div>

          <select
            value={scope}
            onChange={(e) => onScopeChange(e.target.value)}
            className="
              px-3 py-1
              pr-8
              min-w-[50px]
              bg-[#f4f7fe]
              hover:bg-slate-200
              text-[#2b3674]
              font-medium
              text-xs
              rounded-full
              border border-slate-200
              shadow-sm
              transition-all
            "
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
              <span className="text-xs font-semibold text-[#1b2559]">{item}</span>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div
          className={`h-48 relative transition-opacity duration-200 ${
            isLoading ? "opacity-40" : "opacity-100"
          }`}
        >
          {hoverPoint && (
            <div
              className="
                absolute
                z-50
                px-3
                py-1.5
                rounded-md
                bg-slate-800
                text-white
                text-xs
                font-bold
                shadow-lg
                pointer-events-none
                whitespace-nowrap
              "
              style={{
                left: `${(hoverPoint.x / 400) * 100}%`,
                top: `${(hoverPoint.y / 150) * 100}%`,
                transform: "translate(-50%, -120%)",
              }}
            >
              {hoverPoint.label}: {hoverPoint.rate.toFixed(2)}%
            </div>
          )}
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
              {/* Y Axis */}
              {[
                { y: 12, label: "100%" },
                { y: 43.5, label: "75%" },
                { y: 75, label: "50%" },
                { y: 106.5, label: "25%" },
                { y: 138, label: "0%" },
              ].map((item) => (
                <g key={item.label}>
                  <line
                    x1="35"
                    y1={item.y}
                    x2="388"
                    y2={item.y}
                    stroke="#9ba4ac"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="27"
                    y={item.y + 3}
                    textAnchor="end"
                    fontSize="8"
                    fill="#000000"
                    fontWeight="500"
                  >
                    {item.label}
                  </text>
                </g>
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
                        onMouseEnter={() =>
                          setHoverPoint({
                            x: pt.x,
                            y: pt.y,
                            rate: pt.rate,
                            period: pt.period,
                            label: item,
                            color,
                          })
                        }
                        onMouseLeave={() => setHoverPoint(null)}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* X-Axis Labels */}
        <div
          className="mt-3 grid text-xs text-slate-400"
          style={{
            gridTemplateColumns: `repeat(${data?.chart?.length || 1}, 1fr)`,
            paddingLeft: "40px",
            paddingRight: "12px",
          }}
        >
          {data?.chart?.map((item) => (
            <div
              key={item.period}
              className="text-center text-xs font-semibold text-[#1b2559]"
            >
              {formatPeriod(item.period)}
            </div>
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
        loading,
        reflowScope,
        setReflowScope,
        ["All", "SMT1", "SMT2", "SMT3"],
        reflowHoverPoint,
        setReflowHoverPoint
      )}

      {renderChartCard(
        "Deflux Out Spec Rate",
        defluxData,
        loading,
        defluxScope,
        setDefluxScope,
        ["All", "Deflux1", "Deflux2", "Deflux3"],
        defluxHoverPoint,
        setDefluxHoverPoint
      )}
    </section>
  );
}
