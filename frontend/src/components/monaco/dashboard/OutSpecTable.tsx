export default function OutSpecTable() {
  return (
    <section aria-label="Out of spec list"
      className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100">
      {/* <!-- Table Top Control Bar --> */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-black text-[#1b2559]">Out of spec list</h3>
        <div className="flex flex-wrap items-center gap-3">
          {/* <!-- Search Bar --> */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <i
              className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3aed0] text-xs"></i>
            <input className="w-full pl-9 pr-4 py-1.5 bg-[#f4f7fe] rounded-full text-xs text-[#2b3674] border-none focus:ring-1 focus:ring-[#4318ff] placeholder-[#a3aed0]"
              placeholder="Search" type="text"/>
          </div>
          {/* <!-- Sort By Control --> */}
          <div
            className="flex items-center text-xs text-[#a3aed0] bg-[#f4f7fe] px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-slate-200/50 transition">
            <span>Short by : <span className="font-bold text-[#1b2559]">Newest</span></span>
            <i className="fa-solid fa-chevron-down ml-2 text-[10px] text-[#a3aed0]"></i>
          </div>
        </div>
      </div>
      {/* <!-- Table Container --> */}
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="w-full text-left text-xs whitespace-nowrap min-w-[760px]">
          <thead>
            <tr className="text-[#a3aed0] border-b border-slate-100 font-semibold uppercase text-[10px] tracking-wider">
              <th className="pb-3 px-4 font-bold" scope="col">SMT Line</th>
              <th className="pb-3 px-4 font-bold" scope="col">Parameter</th>
              <th className="pb-3 px-4 font-bold" scope="col">Top 3 machine</th>
              <th className="pb-3 px-4 font-bold" scope="col">Value</th>
              <th className="pb-3 px-4 font-bold" scope="col">USL</th>
              <th className="pb-3 px-4 font-bold" scope="col">LSL</th>
              <th className="pb-3 px-4 font-bold" scope="col">Number of strips</th>
              <th className="pb-3 px-4 font-bold text-center" scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium text-[#2b3674]">
            {/* <!-- Row 1 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">165.5</td>
              <td className="py-3 px-4 text-[#707eae]">155</td>
              <td className="py-3 px-4 text-[#707eae]">165</td>
              <td className="py-3 px-4 font-bold">5.000</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#ff6961] bg-[#fff5f5] text-[#ff6961] text-[10px] font-bold">Out
                  Spec</span>
              </td>
            </tr>
            {/* <!-- Row 2 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">=0</td>
              <td className="py-3 px-4 text-[#707eae]">1</td>
              <td className="py-3 px-4 text-[#707eae]">5</td>
              <td className="py-3 px-4 font-bold">32</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#4318ff] bg-[#f0f3ff] text-[#4318ff] text-[10px] font-bold">Out
                  COV</span>
              </td>
            </tr>
            {/* <!-- Row 3 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">=0</td>
              <td className="py-3 px-4 text-[#707eae]">1</td>
              <td className="py-3 px-4 text-[#707eae]">5</td>
              <td className="py-3 px-4 font-bold">32</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#4318ff] bg-[#f0f3ff] text-[#4318ff] text-[10px] font-bold">Out
                  COV</span>
              </td>
            </tr>
            {/* <!-- Row 4 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">165.5</td>
              <td className="py-3 px-4 text-[#707eae]">155</td>
              <td className="py-3 px-4 text-[#707eae]">165</td>
              <td className="py-3 px-4 font-bold">5.000</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#ff6961] bg-[#fff5f5] text-[#ff6961] text-[10px] font-bold">Out
                  Spec</span>
              </td>
            </tr>
            {/* <!-- Row 5 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">165.5</td>
              <td className="py-3 px-4 text-[#707eae]">155</td>
              <td className="py-3 px-4 text-[#707eae]">165</td>
              <td className="py-3 px-4 font-bold">5.000</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#ff6961] bg-[#fff5f5] text-[#ff6961] text-[10px] font-bold">Out
                  Spec</span>
              </td>
            </tr>
            {/* <!-- Row 6 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">=0</td>
              <td className="py-3 px-4 text-[#707eae]">1</td>
              <td className="py-3 px-4 text-[#707eae]">5</td>
              <td className="py-3 px-4 font-bold">32</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#4318ff] bg-[#f0f3ff] text-[#4318ff] text-[10px] font-bold">Out
                  COV</span>
              </td>
            </tr>
            {/* <!-- Row 7 --> */}
            <tr className="hover:bg-[#f4f7fe]/40 transition">
              <td className="py-3 px-4">SMT 1</td>
              <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">B_Zone1_Sensor_Up</td>
              <td className="py-3 px-4 text-[#707eae]">S1RF-A01, S1RF-A02</td>
              <td className="py-3 px-4 font-bold">165.5</td>
              <td className="py-3 px-4 text-[#707eae]">155</td>
              <td className="py-3 px-4 text-[#707eae]">165</td>
              <td className="py-3 px-4 font-bold">5.000</td>
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-block px-3 py-1 rounded border border-[#ff6961] bg-[#fff5f5] text-[#ff6961] text-[10px] font-bold">Out
                  Spec</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <!-- Table Footer / Pagination --> */}
      <div
        className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a3aed0] gap-4">
        <p>Showing data 1 to 8 of 256k entries</p>
        <div className="flex items-center space-x-1 font-semibold select-none">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f4f7fe] hover:bg-slate-200 transition text-[#a3aed0]">
            <i className="fa-solid fa-chevron-left text-[9px]"></i>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#4318ff] text-white">1</button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f4f7fe] hover:bg-slate-200 transition text-[#2b3674]">2</button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f4f7fe] hover:bg-slate-200 transition text-[#2b3674]">3</button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f4f7fe] hover:bg-slate-200 transition text-[#2b3674]">4</button>
          <span className="px-1 text-[#a3aed0]">...</span>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f4f7fe] hover:bg-slate-200 transition text-[#2b3674]">40</button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f4f7fe] hover:bg-slate-200 transition text-[#a3aed0]">
            <i className="fa-solid fa-chevron-right text-[9px]"></i>
          </button>
        </div>
      </div>
    </section>
  );
}