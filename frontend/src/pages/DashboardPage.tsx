import { useState } from "react";
import Sidebar from "../components/monaco/common/Sidebar";

import SummaryCards from "../components/monaco/dashboard/summaryCards";
import UploadRate from "../components/monaco/dashboard/UploadRate";
import OutSpecRate from "../components/monaco/dashboard/OutSpecRate";
import Cpk from "../components/monaco/dashboard/Cpk";
import OutSpecTable from "../components/monaco/dashboard/OutSpecTable";

export default function DashboardPage() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [periodType, setPeriodType] = useState<"month" | "week">("month");
  const [periodValue, setPeriodValue] = useState("2026-11")
  return (
    <div className="bg-[#f4f7fe] text-[#2b3674] min-h-screen flex">
      {/* <Sidebar /> */}

      {/* Lớp phủ mờ bấm ra ngoài để đóng menu trên màn hình nhỏ */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/20 z-20 lg:hidden"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} />


      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        {/* Header */}
        <header className="pt-6 px-6 lg:px-8 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Nút Ẩn/Hiện Sidebar */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              title={isSidebarOpen ? "Ẩn menu" : "Mở menu"}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-[#1b2559] hover:text-[#4318ff] hover:border-[#4318ff]/30 transition-all cursor-pointer flex-shrink-0"
            >
              <i className={`fa-solid ${isSidebarOpen ? "fa-indent" : "fa-bars"} text-sm`}></i>
            </button>

            <div>
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="text-xs font-semibold text-[#707eae] mb-1"
              >
                <ol className="inline-flex items-center space-x-1">
                  <li className="hover:underline cursor-pointer">
                    CTQ Monitoring
                  </li>

                  <span>/</span>

                  <li className="text-[#2b3674]">
                    Dashboard
                  </li>
                </ol>
              </nav>

              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#1b2559] tracking-tight">
                Main Dashboard
              </h1>
            </div>
          </div>


          {/* Date Button */}
          {/* <div className="flex items-center self-start md:self-auto">
            <button
              type="button"
              className="
                inline-flex
                items-center
                space-x-2
                bg-[#4318ff]
                hover:bg-[#3311db]
                text-white
                px-4
                py-2
                rounded-xl
                text-xs
                font-semibold
                shadow-md
                shadow-indigo-500/20
                transition-all
              "
            >
              <i className="fa-regular fa-calendar text-[11px]"></i>

              <span>November 2026</span>

              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
          </div> */}
          <div className="flex items-center gap-2">
            <select
              value={periodType}
              onChange={(e) => {
                const type = e.target.value as "month" | "week";

                setPeriodType(type);

                if (type === "month") {
                  setPeriodValue("2026-11");
                } else {
                  setPeriodValue("2026-W45");
                }
              }}
              className="px-3 py-2 rounded-xl border"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
            </select>

            {periodType === "month" ? (
              <input
                type="month"
                value={periodValue}
                onChange={(e) => setPeriodValue(e.target.value)}
                className="px-3 py-2 rounded-xl border"
              />
            ) : (
              <input
                type="week"
                value={periodValue}
                onChange={(e) => setPeriodValue(e.target.value)}
                className="px-3 py-2 rounded-xl border"
              />
            )}
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 p-6 lg:p-8 pt-2 space-y-6 max-w-[1600px] w-full mx-auto">
          <SummaryCards periodType={periodType} periodValue={periodValue} />

          <UploadRate periodType={periodType} periodValue={periodValue} />

          <OutSpecRate />

          <Cpk />

          <OutSpecTable />
        </main>
      </div>
    </div>
  );
}