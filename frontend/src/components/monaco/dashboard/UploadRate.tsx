import { useEffect, useState } from "react";
import { getUploadRateChart, type UploadRateResponse } from "../../../api/monaco/dashboard/dashboardApi";

interface UploadRateProps {
    periodType: string;
    periodValue: string;
}

export default function UploadRateSection({
    periodType,
    periodValue,
}: UploadRateProps) {

    const [reflowData, setReflowData] =
        useState<UploadRateResponse | null>(null);

    const [defluxData, setDefluxData] =
        useState<UploadRateResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [reflowScope, setReflowScope] =
        useState("All");

    const [defluxScope, setDefluxScope] =
        useState("All");



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const reflow = await getUploadRateChart(
                    "reflow",
                    periodType,
                    periodValue,
                    reflowScope
                );

                const deflux = await getUploadRateChart(
                    "deflux",
                    periodType,
                    periodValue,
                    defluxScope
                );

                console.log("REFLOW", reflow);
                console.log("DEFLUX", deflux);

                setReflowData(reflow);
                setDefluxData(deflux);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [periodType, periodValue, reflowScope, defluxScope]);

    const getYAxis = (
        data: UploadRateResponse | null
    ) => {

        if (!data || !data.chart.length) {
            return [];
        }

        const firstPeriod = data.chart[0];

        if (data.view_mode === "by_line") {
            return firstPeriod.lines.map(
                (item) => item.line
            );
        }

        return firstPeriod.machines.map(
            (item) => item.machine
        );
    };

    const getRate = (
        data: UploadRateResponse | null,
        periodIndex: number,
        label: string
    ) => {

        if (!data) return 0;

        const bucket =
            data.chart[periodIndex];

        if (!bucket) return 0;

        if (data.view_mode === "by_line") {

            return (
                bucket.lines.find(
                    (x) => x.line === label
                )?.rate ?? 0
            );
        }

        return (
            bucket.machines.find(
                (x) => x.machine === label
            )?.rate ?? 0
        );
    };


    const getRows = (
        data: UploadRateResponse | null
    ) => {

        if (!data) return [];

        const labels = getYAxis(data);

        return labels.map(label => ({
            label,
            periods: data.chart.map((_, idx) => ({
                periodIndex: idx,
                rate: getRate(
                    data,
                    idx,
                    label
                )
            }))
        }));
    };


    const formatPeriod = (period: string) => {

        if (periodType === "week") {

            const date = new Date(period);

            return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;
        }

        return period;
    };
    return (
        <section aria-label="Upload Rates Section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article
                className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between h-full">
                {loading && (
                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#4318ff] rounded-full animate-spin" />
                    </div>
                )}   
                <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#a3aed0]">Reflow upload rate</p>
                        <div className="flex items-center space-x-2 mt-0.5">
                            <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">{reflowData?.summary.uploaded.toLocaleString()}/{reflowData?.summary.total.toLocaleString()} strips</h4>
                        </div>
                    </div>
                    {/* nút all reflow */}
                    <div className="flex items-center space-x-3">
                        <select
                            value={reflowScope}
                            onChange={(e) => setReflowScope(e.target.value)}
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
                            <option value="All">
                                All
                            </option>

                            <option value="SMT1">
                                SMT1
                            </option>

                            <option value="SMT2">
                                SMT2
                            </option>

                            <option value="SMT3">
                                SMT3
                            </option>
                        </select>
                    </div>
                </div>

                <div className="pt-2 pb-2">
                    <div className="w-full">

                        <div className="flex items-stretch">
                            {/* các line và các máy */}
                            <div className="w-16 flex-shrink-0 flex flex-col gap-4 pt-2 pb-6 pr-3 text-right text-xs font-semibold text-[#1b2559]">
                                {getYAxis(reflowData).map(label => (
                                    <div key={label} className="h-7 flex items-center justify-end">
                                        <span className="truncate">{label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* tỷ lệ biểu đồ */}
                            <div className="flex-1 flex flex-col border-l border-b border-slate-400 pl-4 pr-2 pt-2 pb-6">
                                <div className="flex flex-col gap-4">
                                    {getRows(reflowData).map(row => (
                                        <div
                                            key={row.label}
                                            className="grid gap-3 items-center h-7"
                                            style={{
                                                gridTemplateColumns: `repeat(${row.periods.length}, minmax(0, 1fr))`
                                            }}>
                                            {row.periods.map((cell, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 h-full min-w-0">
                                                    <div className="flex-1 min-w-0 bg-slate-200 h-5 rounded-[3px] overflow-hidden">
                                                        <div className="bg-[#5ecad9] h-full" style={{ width: `${cell.rate}%` }} />
                                                    </div>
                                                    <span className="w-8 text-right text-[11px] font-bold text-[#1b2559] flex-shrink-0 tabular-nums">
                                                        {cell.rate.toFixed(0)}%
                                                    </span>
                                                </div>
                                            ))}

                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {/* trục X */}
                        {/* trục X */}
                        <div className="flex pt-2.5">
                            <div className="w-16 flex-shrink-0" />
                            <div
                                className="flex-1 pl-4 pr-2 grid gap-3 text-xs font-medium text-[#1b2559]"
                                style={{
                                    gridTemplateColumns: `repeat(${reflowData?.chart.length || 1}, minmax(0, 1fr))`
                                }}
                            >
                                {reflowData?.chart.map(item => (
                                    <div key={item.period} className="flex items-center gap-1.5 min-w-0">
                                        <span className="flex-1 text-center truncate whitespace-nowrap">
                                            {formatPeriod(item.period)}
                                        </span>
                                        <span className="w-8 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-[#707eae]">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#5ecad9]"></span>
                            <span>Upload Rate</span>
                        </div>
                    </div>
                    <span className="font-medium"></span>
                </div>
            </article>

            <article
                className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between h-full">
                {loading && (
                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#4318ff] rounded-full animate-spin" />
                    </div>
                )}                
                <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#a3aed0]">Deflux upload rate</p>
                        <div className="flex items-center space-x-2 mt-0.5">
                            <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">{defluxData?.summary.uploaded.toLocaleString()}/{defluxData?.summary.total.toLocaleString()} strips</h4>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            value={defluxScope}
                            onChange={(e) => setDefluxScope(e.target.value)}
                            className="
                                px-3 py-1
                                pr-8
                                min-w-[10px]
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
                            <option value="All">All</option>

                            <option value="Deflux1">
                                Deflux1
                            </option>

                            <option value="Deflux2">
                                Deflux2
                            </option>

                            <option value="Deflux3">
                                Deflux3
                            </option>

                        </select>
                    </div>
                </div>

                <div className="pt-2 pb-2">
                    <div className="w-full">

                        <div className="flex items-stretch">
                            <div className="w-16 flex-shrink-0 flex flex-col gap-4 pt-2 pb-6 pr-3 text-right text-xs font-semibold text-[#1b2559]">
                                {getYAxis(defluxData).map(label => (
                                    <div key={label} className="h-7 flex items-center justify-end">
                                        <span className="truncate">{label}</span>
                                    </div>
                                ))}
                            </div>


                            <div className="flex-1 flex flex-col border-l border-b border-slate-400 pl-4 pr-2 pt-2 pb-6">
                                <div className="flex flex-col gap-4">
                                    {getRows(defluxData).map(row => (
                                        <div
                                            key={row.label}
                                            className="grid gap-3 items-center h-7"
                                            style={{
                                                gridTemplateColumns: `repeat(${row.periods.length}, minmax(0, 1fr))`
                                            }}
                                        >


                                            {row.periods.map((cell, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 h-full min-w-0">
                                                    <div className="flex-1 min-w-0 bg-slate-200 h-5 rounded-[3px] overflow-hidden">
                                                        <div className="bg-[#5ecad9] h-full" style={{ width: `${cell.rate}%` }} />
                                                    </div>
                                                    <span className="w-8 text-right text-[11px] font-bold text-[#1b2559] flex-shrink-0 tabular-nums">
                                                        {cell.rate.toFixed(0)}%
                                                    </span>
                                                </div>
                                            ))}


                                        </div>

                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className="flex pt-2.5">
                            <div className="w-16 flex-shrink-0" />
                            <div
                                className="flex-1 pl-4 pr-2 grid gap-3 text-xs font-medium text-[#1b2559]"
                                style={{
                                    gridTemplateColumns: `repeat(${defluxData?.chart.length || 1}, minmax(0, 1fr))`
                                }}
                            >
                                {defluxData?.chart.map(item => (
                                    <div key={item.period} className="flex items-center gap-1.5 min-w-0">
                                        <span className="flex-1 text-center truncate whitespace-nowrap">
                                            {formatPeriod(item.period)}
                                        </span>
                                        <span className="w-8 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-[#707eae]">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#5ecad9]"></span>
                            <span>Upload Rate</span>
                        </div>
                    </div>
                    <span className="font-medium"></span>
                </div>
            </article>
        </section>
    );
}
