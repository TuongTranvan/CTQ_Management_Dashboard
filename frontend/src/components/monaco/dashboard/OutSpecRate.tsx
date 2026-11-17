export default function TrendSection() {
  return (
          <section aria-label="Out Spec Line Trends" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-[#a3aed0]">Out spec rate</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">100 strips</h4><span
                  className="bg-[#fee2e2] text-[#ef4444] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">-12.6%
                  <i className="fa-solid fa-arrow-down text-[8px] ml-0.5"></i></span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col space-y-1 text-[11px] font-semibold text-[#707eae]">
                <div className="flex items-center space-x-1.5"><span
                    className="w-2 h-2 rounded-full bg-[#6a11cb]"></span><span>SMT 1</span></div>
                <div className="flex items-center space-x-1.5"><span
                    className="w-2 h-2 rounded-full bg-[#f472b6]"></span><span>SMT 2</span></div>
                <div className="flex items-center space-x-1.5"><span
                    className="w-2 h-2 rounded-full bg-[#f97316]"></span><span>SMT 3</span></div>
              </div><button
                className="px-3 py-1 bg-[#f4f7fe] hover:bg-slate-200 text-[#2b3674] font-medium text-xs rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                type="button"><span>All</span><i
                  className="fa-solid fa-chevron-down text-[10px] text-[#707eae]"></i></button>
            </div>
          </div>
          <div className="relative pt-4">
            <div
              className="absolute left-0 top-4 bottom-7 w-8 flex flex-col justify-between text-[11px] font-semibold text-[#a3aed0]">
              <span>100%</span>
              <span>50%</span>
              <span>10%</span>
              <span>0</span>
            </div>
            <div className="ml-9 h-40 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full"></div>
                <div className="border-b border-dashed border-slate-200 w-full"></div>
                <div className="border-b border-dashed border-slate-200 w-full"></div>
                <div className="border-b border-dashed border-slate-200 w-full"></div>
              </div>
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 150">
                <path
                  d="M 10,75 L 30,60 L 50,65 L 70,72 L 90,120 L 110,48 L 130,55 L 150,42 L 170,68 L 190,128 L 210,140 L 230,50 L 250,60 L 270,48 L 290,135 L 310,65 L 330,75 L 350,135 L 370,135 L 390,65"
                  fill="none" stroke="#6a11cb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
                <path
                  d="M 10,68 L 30,58 L 50,62 L 70,70 L 90,80 L 110,65 L 130,55 L 150,42 L 170,52 L 190,75 L 210,50 L 230,48 L 250,58 L 270,40 L 290,85 L 310,55 L 330,62 L 350,48 L 370,38 L 390,52"
                  fill="none" stroke="#f472b6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                <path
                  d="M 10,105 L 30,95 L 50,98 L 70,95 L 90,140 L 110,138 L 130,92 L 150,105 L 170,85 L 190,135 L 210,142 L 230,95 L 250,85 L 270,82 L 290,80 L 310,138 L 330,142 L 350,92 L 370,85 L 390,95"
                  fill="none" stroke="#f97316" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <div className="ml-9 flex justify-between text-[11px] font-semibold text-[#a3aed0] pt-2 px-1">
              <span>Week 42</span>
              <span>Week 43</span>
              <span>Week 44</span>
              <span>Week 45</span>
            </div>
          </div>
        </article>
        <article
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-[#a3aed0]">Out spec rate</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">100 strips</h4><span
                  className="bg-[#fee2e2] text-[#ef4444] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">-12.6%
                  <i className="fa-solid fa-arrow-down text-[8px] ml-0.5"></i></span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col space-y-1 text-[11px] font-semibold text-[#707eae]">
                <div className="flex items-center space-x-1.5"><span
                    className="w-2 h-2 rounded-full bg-[#6a11cb]"></span><span>Deflux 1</span></div>
                <div className="flex items-center space-x-1.5"><span
                    className="w-2 h-2 rounded-full bg-[#f472b6]"></span><span>Deflux 2</span></div>
                <div className="flex items-center space-x-1.5"><span
                    className="w-2 h-2 rounded-full bg-[#f97316]"></span><span>Deflux 3</span></div>
              </div><button
                className="px-3 py-1 bg-[#f4f7fe] hover:bg-slate-200 text-[#2b3674] font-medium text-xs rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                type="button"><span>All</span><i
                  className="fa-solid fa-chevron-down text-[10px] text-[#707eae]"></i></button>
            </div>
          </div>
          <div className="relative pt-4">
            <div
              className="absolute left-0 top-4 bottom-7 w-8 flex flex-col justify-between text-[11px] font-semibold text-[#a3aed0]">
              <span>100%</span>
              <span>50%</span>
              <span>10%</span>
              <span>0</span>
            </div>
            <div className="ml-9 h-40 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full"></div>
                <div className="border-b border-dashed border-slate-200 w-full"></div>
                <div className="border-b border-dashed border-slate-200 w-full"></div>
                <div className="border-b border-dashed border-slate-200 w-full"></div>
              </div>
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none"
                viewBox="0 0 400 150">
                <path
                  d="M 10,75 L 30,60 L 50,68 L 70,72 L 90,120 L 110,48 L 130,55 L 150,42 L 170,68 L 190,128 L 210,140 L 230,50 L 250,60 L 270,48 L 290,135 L 310,65 L 330,75 L 350,135 L 370,135 L 390,65"
                  fill="none" stroke="#6a11cb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
                <path
                  d="M 10,68 L 30,58 L 50,62 L 70,70 L 90,80 L 110,65 L 130,55 L 150,42 L 170,52 L 190,75 L 210,50 L 230,48 L 250,58 L 270,40 L 290,85 L 310,55 L 330,62 L 350,48 L 370,38 L 390,52"
                  fill="none" stroke="#f472b6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                <path
                  d="M 10,105 L 30,95 L 50,98 L 70,95 L 90,140 L 110,138 L 130,92 L 150,105 L 170,85 L 190,135 L 210,142 L 230,95 L 250,85 L 270,82 L 290,80 L 310,138 L 330,142 L 350,92 L 370,85 L 390,95"
                  fill="none" stroke="#f97316" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <div className="ml-9 flex justify-between text-[11px] font-semibold text-[#a3aed0] pt-2 px-1">
              <span>Week 42</span>
              <span>Week 43</span>
              <span>Week 44</span>
              <span>Week 45</span>
            </div>
          </div>
        </article>
      </section>
  );
}