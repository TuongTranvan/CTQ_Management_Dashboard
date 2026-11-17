export default function CpkSection() {
  return (
          <section aria-label="CPK Distribution Pie Charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-[#707eae] tracking-wide">Reflow CPK</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1 tracking-tight">#1.33</h3>
              <div
                className="mt-2 inline-flex items-center space-x-1.5 bg-[#e6fffa] text-[#00bba6] text-xs font-bold px-2.5 py-1 rounded-md">
                <i className="fa-solid fa-arrow-trend-up text-[11px]"></i><span>11.2%</span></div>
            </div><button
              className="px-3 py-1 bg-[#f4f7fe] hover:bg-slate-200 text-[#2b3674] font-medium text-xs rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
              type="button"><span>All</span><i className="fa-solid fa-chevron-down text-[10px] text-[#707eae]"></i></button>
          </div>
          <div className="my-8 flex justify-center items-center">
            <div className="w-64 h-64 sm:w-72 sm:h-72">
              <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 200 200">
                <path d="M 100 100 L 100 10 A 90 90 0 0 1 100 190 Z" fill="#00bfa5" stroke="#ffffff"
                  stroke-linejoin="round" stroke-width="2.5"></path>
                <path d="M 100 100 L 100 190 A 90 90 0 0 1 10 100 Z" fill="#2563eb" stroke="#ffffff"
                  stroke-linejoin="round" stroke-width="2.5"></path>
                <path d="M 100 100 L 10 100 A 90 90 0 0 1 100 10 Z" fill="#f59e0b" stroke="#ffffff"
                  stroke-linejoin="round" stroke-width="2.5"></path>
              </svg>
            </div>
          </div>
          <div className="space-y-3 pt-3 border-t border-slate-100 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3"><span
                  className="w-3 h-3 rounded-full bg-[#00bfa5] flex-shrink-0"></span><span
                  className="text-[#475569] font-medium">SMT 1</span></div><span className="font-bold text-[#111827]">50%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3"><span
                  className="w-3 h-3 rounded-full bg-[#2563eb] flex-shrink-0"></span><span
                  className="text-[#475569] font-medium">SMT 2</span></div><span className="font-bold text-[#111827]">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3"><span
                  className="w-3 h-3 rounded-full bg-[#f59e0b] flex-shrink-0"></span><span
                  className="text-[#475569] font-medium">SMT 3</span></div><span className="font-bold text-[#111827]">25%</span>
            </div>
          </div>
        </article>
        <article
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-[#707eae] tracking-wide">Deflux CPK</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1 tracking-tight">#1.33</h3>
              <div
                className="mt-2 inline-flex items-center space-x-1.5 bg-[#e6fffa] text-[#00bba6] text-xs font-bold px-2.5 py-1 rounded-md">
                <i className="fa-solid fa-arrow-trend-up text-[11px]"></i><span>11.2%</span></div>
            </div><button
              className="px-3 py-1 bg-[#f4f7fe] hover:bg-slate-200 text-[#2b3674] font-medium text-xs rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
              type="button"><span>All</span><i className="fa-solid fa-chevron-down text-[10px] text-[#707eae]"></i></button>
          </div>
          <div className="my-8 flex justify-center items-center">
            <div className="w-64 h-64 sm:w-72 sm:h-72">
              <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 200 200">
                <path d="M 100 100 L 100 10 A 90 90 0 0 1 100 190 Z" fill="#00bfa5" stroke="#ffffff"
                  stroke-linejoin="round" stroke-width="2.5"></path>
                <path d="M 100 100 L 100 190 A 90 90 0 0 1 10 100 Z" fill="#2563eb" stroke="#ffffff"
                  stroke-linejoin="round" stroke-width="2.5"></path>
                <path d="M 100 100 L 10 100 A 90 90 0 0 1 100 10 Z" fill="#f59e0b" stroke="#ffffff"
                  stroke-linejoin="round" stroke-width="2.5"></path>
              </svg>
            </div>
          </div>
          <div className="space-y-3 pt-3 border-t border-slate-100 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3"><span
                  className="w-3 h-3 rounded-full bg-[#00bfa5] flex-shrink-0"></span><span
                  className="text-[#475569] font-medium">Deflux 1</span></div><span
                className="font-bold text-[#111827]">50%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3"><span
                  className="w-3 h-3 rounded-full bg-[#2563eb] flex-shrink-0"></span><span
                  className="text-[#475569] font-medium">Deflux 2</span></div><span
                className="font-bold text-[#111827]">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3"><span
                  className="w-3 h-3 rounded-full bg-[#f59e0b] flex-shrink-0"></span><span
                  className="text-[#475569] font-medium">Deflux 3</span></div><span
                className="font-bold text-[#111827]">25%</span>
            </div>
          </div>
        </article>
      </section>
  );
}