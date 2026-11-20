import { useEffect, useState } from "react";
import { getOverviewCards, type OverviewCardsResponse} from "../../../api/monaco/dashboard/dashboardApi";

interface SummaryCardsProps {
  periodType: string;
  periodValue: string;
}

export default function SummaryCards({
    periodType,
    periodValue,
}: SummaryCardsProps) {
    const [cards, setCards] = useState<OverviewCardsResponse["cards"] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const response = await getOverviewCards(
                    periodType,
                    periodValue
                );
                
                console.log("API Response:", response);
                setCards(response.cards);
            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [periodType, periodValue]);

  return (
          <section
            aria-label="Quick Statistics"
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
             {loading && (
                  <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-slate-200 border-t-[#4318ff] rounded-full animate-spin" />
                  </div>
              )}
        <article
          className="bg-white rounded-2xl p-4 flex items-center shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">
          <div
            className="w-12 h-12 rounded-full bg-[#f4f7fe] flex items-center justify-center text-[#4318ff] mr-3.5 flex-shrink-0">
            <i className="fa-solid fa-chart-column text-lg"></i>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#a3aed0] leading-none mb-1">Total lots</p>
            <h3 className="text-xl font-black text-[#1b2559] tracking-tight">50</h3>
          </div>
        </article>
        <article
          className="bg-white rounded-2xl p-4 flex items-center shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">
          <div
            className="w-12 h-12 rounded-full bg-[#f4f7fe] flex items-center justify-center text-[#4318ff] mr-3.5 flex-shrink-0">
            <i className="fa-solid fa-dollar-sign text-lg"></i>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#a3aed0] leading-none mb-1">Total Strip</p>
            <h3 className="text-xl font-black text-[#1b2559] tracking-tight">{cards?.total_strip.toLocaleString()}</h3>
          </div>
        </article>
        <article
          className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">
          <div>
            <p className="text-xs font-semibold text-[#a3aed0] leading-none mb-1">Total fail rate</p>
            <h3 className="text-xl font-black text-[#1b2559] tracking-tight">{(100 - (cards?.total_rate ?? 0)).toLocaleString()}%</h3>
            <p className="text-[11px] font-bold text-[#05cd99] mt-1 flex items-center">
              <span className="mr-1 font-extrabold">+10%</span>
              <span className="text-[#a3aed0] font-normal">since last month</span>
            </p>
          </div>
        </article>
        <article
          className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">
          <div>
            <p className="text-xs font-semibold text-[#a3aed0] leading-none mb-1">Total active machine</p>
            <h3 className="text-xl font-black text-[#1b2559] tracking-tight">{cards?.active_machines.toLocaleString()}</h3>
          </div>

        </article>
      </section>
  );
}