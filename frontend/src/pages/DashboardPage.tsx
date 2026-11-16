import Sidebar from "../components/monaco/common/Sidebar";

import SummaryCards from "../components/monaco/dashboard/summaryCards";
import UploadRate from "../components/monaco/dashboard/UploadRate";
import OutSpecRate from "../components/monaco/dashboard/OutSpecRate";
import Cpk from "../components/monaco/dashboard/Cpk";
import OutSpecTable from "../components/monaco/dashboard/OutSpecTable";

export default function DashboardPage() {
  return (
    <div className="bg-[#f4f7fe] text-[#2b3674] min-h-screen flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="pt-6 px-6 lg:px-8 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

          {/* Date Button */}
          <div className="flex items-center self-start md:self-auto">
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
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 p-6 lg:p-8 pt-2 space-y-6 max-w-[1600px] w-full mx-auto">
          <SummaryCards />

          <UploadRate />

          <OutSpecRate />

          <Cpk />

          <OutSpecTable />
        </main>
      </div>
    </div>
  );
}