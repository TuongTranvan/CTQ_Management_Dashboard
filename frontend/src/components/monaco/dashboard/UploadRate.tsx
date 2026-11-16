export default function UploadRateSection() {
  return (
          <section aria-label="Upload Rates Section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#a3aed0]">Reflow upload rate</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">1000/3000 strips</h4>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-3 py-1 bg-[#f4f7fe] hover:bg-slate-200 text-[#2b3674] font-medium text-xs rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                type="button">
                <span>All</span>
                <i className="fa-solid fa-chevron-down text-[10px] text-[#707eae]"></i>
              </button>
            </div>
          </div>

          <div className="pt-2 pb-2 overflow-x-auto">
            <div className="min-w-[480px]">
              <div className="flex items-stretch">
                <div
                  className="w-16 flex-shrink-0 flex flex-col justify-between py-2 pr-3 text-right text-xs font-medium text-[#1b2559]">
                  <span className="h-6 flex items-center justify-end">SMT 3</span>
                  <span className="h-6 flex items-center justify-end my-5">SMT 2</span>
                  <span className="h-6 flex items-center justify-end">SMT 1</span>
                </div>

                <div className="flex-1 flex flex-col border-l border-b border-slate-400 pl-4 pr-2 pt-2 pb-6">
                  <div className="flex flex-col space-y-5">
                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex pl-16 pt-2.5">
                <div className="flex-1 pl-4 pr-2 grid grid-cols-5 gap-3 text-center text-xs font-normal text-[#1b2559]">
                  <span>w41</span>
                  <span>w42</span>
                  <span>w43</span>
                  <span>w44</span>
                  <span>w45</span>
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
            <span className="font-medium">Last updated 5m ago</span>
          </div>
        </article>

        <article
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#a3aed0]">Deflux upload rate</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <h4 className="text-lg sm:text-xl font-black text-[#1b2559]">1000/3000 strips</h4>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-3 py-1 bg-[#f4f7fe] hover:bg-slate-200 text-[#2b3674] font-medium text-xs rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                type="button">
                <span>All</span>
                <i className="fa-solid fa-chevron-down text-[10px] text-[#707eae]"></i>
              </button>
            </div>
          </div>

          <div className="pt-2 pb-2 overflow-x-auto">
            <div className="min-w-[480px]">
              <div className="flex items-stretch">
                <div
                  className="w-16 flex-shrink-0 flex flex-col justify-between py-2 pr-3 text-right text-xs font-medium text-[#1b2559]">
                  <span className="h-6 flex items-center justify-end">Deflux 3</span>
                  <span className="h-6 flex items-center justify-end my-5">Deflux 2</span>
                  <span className="h-6 flex items-center justify-end">Deflux 1</span>
                </div>

                <div className="flex-1 flex flex-col border-l border-b border-slate-400 pl-4 pr-2 pt-2 pb-6">
                  <div className="flex flex-col space-y-5">
                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">80%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">45%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 justify-center">
                        <div className="flex-1 bg-slate-200 h-6 rounded-[2px] overflow-hidden flex">
                          <div className="bg-[#5ecad9] h-full" style={{ width: "80%" }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1b2559] min-w-[24px]">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex pl-16 pt-2.5">
                <div className="flex-1 pl-4 pr-2 grid grid-cols-5 gap-3 text-center text-xs font-normal text-[#1b2559]">
                  <span>w41</span>
                  <span>w42</span>
                  <span>w43</span>
                  <span>w44</span>
                  <span>w45</span>
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
            <span className="font-medium">Last updated 5m ago</span>
          </div>
        </article>
      </section>
  );
}
