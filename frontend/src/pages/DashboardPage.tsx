// import { useState } from "react";
// import Sidebar from "../components/monaco/common/Sidebar";

// import SummaryCards from "../components/monaco/dashboard/summaryCards";
// import UploadRate from "../components/monaco/dashboard/UploadRate";
// import OutSpecRate from "../components/monaco/dashboard/OutSpecRate";
// import Cpk from "../components/monaco/dashboard/Cpk";
// import OutSpecTable from "../components/monaco/dashboard/OutSpecTable";

// export default function DashboardPage() {

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [periodType, setPeriodType] = useState<"month" | "week">("month");
//   const [periodValue, setPeriodValue] = useState("2026-11")
//   return (
//     <div className="bg-[#f4f7fe] text-[#2b3674] min-h-screen flex">
//       {/* <Sidebar /> */}

//       {/* Lớp phủ mờ bấm ra ngoài để đóng menu trên màn hình nhỏ */}
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="fixed inset-0 bg-slate-900/20 z-20 lg:hidden"
//         />
//       )}

//       <Sidebar isOpen={isSidebarOpen} />


//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
//         {/* Header */}
//         {/* Header */}
//         <header className="pt-6 px-6 lg:px-8 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="flex items-center gap-3.5">
//             {/* Nút Ẩn/Hiện Sidebar */}
//             <button
//               type="button"
//               onClick={() => setIsSidebarOpen((prev) => !prev)}
//               title={isSidebarOpen ? "Ẩn menu" : "Mở menu"}
//               className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-[#1b2559] hover:text-[#4318ff] hover:border-[#4318ff]/30 transition-all cursor-pointer flex-shrink-0"
//             >
//               <i className={`fa-solid ${isSidebarOpen ? "fa-indent" : "fa-bars"} text-sm`}></i>
//             </button>

//             <div>
//               {/* Breadcrumb */}
//               <nav
//                 aria-label="Breadcrumb"
//                 className="text-xs font-semibold text-[#707eae] mb-1"
//               >
//                 <ol className="inline-flex items-center space-x-1">
//                   <li className="hover:underline cursor-pointer">
//                     CTQ Monitoring
//                   </li>

//                   <span>/</span>

//                   <li className="text-[#2b3674]">
//                     Dashboard
//                   </li>
//                 </ol>
//               </nav>

//               <h1 className="text-2xl lg:text-3xl font-extrabold text-[#1b2559] tracking-tight">
//                 Main Dashboard
//               </h1>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <select
//               value={periodType}
//               onChange={(e) => {
//                 const type = e.target.value as "month" | "week";

//                 setPeriodType(type);

//                 if (type === "month") {
//                   setPeriodValue("2026-11");
//                 } else {
//                   setPeriodValue("2026-W45");
//                 }
//               }}
//               className="
//                 min-w-[110px]
//                 px-4
//                 pr-8
//                 py-2
//                 rounded-xl
//                 border
//                 bg-white
//               "
//             >
//               <option value="month">Month</option>
//               <option value="week">Week</option>
//             </select>

//             {periodType === "month" ? (
//               <input
//                 type="month"
//                 value={periodValue}
//                 onChange={(e) => setPeriodValue(e.target.value)}
//                 className="px-3 py-2 rounded-xl border"
//               />
//             ) : (
//               <input
//                 type="week"
//                 value={periodValue}
//                 onChange={(e) => setPeriodValue(e.target.value)}
//                 className="px-3 py-2 rounded-xl border"
//               />
//             )}
//           </div>
//         </header>

//         {/* Body */}
//         <main className="flex-1 p-6 lg:p-8 pt-2 space-y-6 max-w-[1600px] w-full mx-auto">
//           <SummaryCards periodType={periodType} periodValue={periodValue} />

//           <UploadRate periodType={periodType} periodValue={periodValue} />

//           <OutSpecRate />

//           <Cpk />

//           <OutSpecTable />
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import Sidebar from "../components/monaco/common/Sidebar";

import SummaryCards from "../components/monaco/dashboard/summaryCards";
import UploadRate from "../components/monaco/dashboard/UploadRate";
import OutSpecRate from "../components/monaco/dashboard/OutSpecRate";
import Cpk from "../components/monaco/dashboard/Cpk";
import OutSpecTable from "../components/monaco/dashboard/OutSpecTable";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [periodType, setPeriodType] = useState<"month" | "week">("month");
  const [periodValue, setPeriodValue] = useState("2026-11");

  const [loading, setLoading] = useState(true);

  // Chỉ chạy khi mở trang lần đầu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#f4f7fe] text-[#2b3674] min-h-screen flex">
      {loading && (
        <div className="fixed inset-0 z-[99999] bg-[#f4f7fe] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-[5px] border-slate-200 border-t-[#4318ff] rounded-full animate-spin" />

            <div className="text-[#1b2559] font-semibold text-lg">
              Loading Dashboard...
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/20 z-20 lg:hidden"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 flex flex-col min-w-0 overflow-y-auto ${
          loading ? "pointer-events-none" : ""
        }`}
      >
        <header className="pt-6 px-6 lg:px-8 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              title={isSidebarOpen ? "Ẩn menu" : "Mở menu"}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-[#1b2559] hover:text-[#4318ff] hover:border-[#4318ff]/30 transition-all cursor-pointer flex-shrink-0"
            >
              <i
                className={`fa-solid ${
                  isSidebarOpen ? "fa-indent" : "fa-bars"
                } text-sm`}
              />
            </button>

            <div>
              <nav
                aria-label="Breadcrumb"
                className="text-xs font-semibold text-[#707eae] mb-1"
              >
                <ol className="inline-flex items-center space-x-1">
                  <li className="hover:underline cursor-pointer">
                    CTQ Monitoring
                  </li>

                  <span>/</span>

                  <li className="text-[#2b3674]">Dashboard</li>
                </ol>
              </nav>

              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#1b2559] tracking-tight">
                Main Dashboard
              </h1>
            </div>
          </div>

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
              className="min-w-[110px] px-4 pr-8 py-2 rounded-xl border bg-white"
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

        <main className="flex-1 p-6 lg:p-8 pt-2 space-y-6 max-w-[1600px] w-full mx-auto">
          <SummaryCards
            periodType={periodType}
            periodValue={periodValue}
          />

          <UploadRate
            periodType={periodType}
            periodValue={periodValue}
          />

          <OutSpecRate />

          <Cpk />

          <OutSpecTable />
        </main>
      </div>
    </div>
  );
}