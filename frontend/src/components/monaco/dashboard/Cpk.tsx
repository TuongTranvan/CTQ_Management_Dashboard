export default function CpkSection() {
  return (
    <section
      aria-label="CPK Trend Charts"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Reflow CPK */}
      <article className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-[#707eae] tracking-wide">
              Reflow CPK
            </p>

            <div className="flex items-center space-x-2 mt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                #1.33
              </h3>

              <div className="inline-flex items-center space-x-1 bg-[#e6fffa] text-[#00bba6] text-xs font-bold px-2 py-0.5 rounded-md">
                <i className="fa-solid fa-arrow-trend-up text-[10px]" />
                <span>+11.2%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="inline-flex items-center p-0.5 bg-[#f4f7fe] rounded-full border border-slate-200 text-[11px] font-semibold">
              <button
                type="button"
                className="px-2.5 py-1 rounded-full bg-[#4318ff] text-white"
              >
                Daily
              </button>

              <button
                type="button"
                className="px-2.5 py-1 rounded-full text-[#707eae]"
              >
                Weekly
              </button>
            </div>

            <button
              className="px-2.5 py-1 bg-[#f4f7fe] text-[#2b3674] text-xs rounded-full border border-slate-200 flex items-center gap-1.5"
              type="button"
            >
              <i className="fa-regular fa-calendar text-[10px]" />
              <span>05/11 - 08/11</span>
            </button>

            <button
              className="px-2.5 py-1 bg-[#f4f7fe] text-[#2b3674] text-xs rounded-full border border-slate-200 flex items-center gap-1.5"
              type="button"
            >
              <span>All Line</span>
              <i className="fa-solid fa-chevron-down text-[9px]" />
            </button>
          </div>
        </div>

        <div className="relative pt-2 pb-1 overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="relative h-56 w-full">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 520 220"
              >
                <line
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="195"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                <line
                  x1="50"
                  y1="195"
                  x2="510"
                  y2="195"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                <line
                  x1="50"
                  y1="173"
                  x2="510"
                  y2="173"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />

                <text
                  x="500"
                  y="167"
                  fill="#ef4444"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="end"
                >
                  Baseline : 1.33
                </text>

                <path
                  d="M 50,185 C 80,180 110,180 135,178 C 145,178 150,195 160,202 C 175,210 190,190 205,185 C 215,183 220,198 230,200 C 245,202 260,185 275,160 C 290,135 300,70 315,35 C 325,12 335,15 342,70 C 347,150 350,195 365,198 C 380,200 395,185 410,180 C 420,175 430,190 445,192 C 475,195 490,192 505,192"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                />

                <path
                  d="M 50,172 C 70,170 85,160 100,158 C 110,155 115,170 130,173 C 150,178 170,172 190,155 C 205,140 215,105 230,95 C 238,90 244,115 250,140 C 255,165 265,168 280,158 C 295,150 310,152 325,160 C 335,165 345,178 355,178 C 375,170 395,158 415,158 C 430,158 440,175 460,185 C 480,190 495,190 510,189"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                />

                <path
                  d="M 50,158 C 70,145 90,140 110,140 C 120,140 125,165 140,165 C 160,165 180,160 200,150 C 215,140 220,120 235,120 C 245,120 250,135 260,140 C 275,142 290,135 305,125 C 315,122 330,122 340,130 C 350,140 360,155 375,155 C 390,155 405,142 420,135 C 440,128 460,125 480,118"
                  fill="none"
                  stroke="#4318ff"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-1 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-[2px] bg-[#d97706]" />
            <span>B_Zone12_Sensor_Up</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-[2px] bg-[#22c55e]" />
            <span>Zone2_Oxygen_Content</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-[2px] bg-[#4318ff]" />
            <span>Zone10_Oxygen_Content</span>
          </div>
        </div>
      </article>

      {/* Deflux CPK */}
      <article className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_0_rgba(112,144,176,0.08)] border border-slate-100 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-[#707eae] tracking-wide">
              Deflux CPK
            </p>

            <div className="flex items-center space-x-2 mt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                #1.33
              </h3>

              <div className="inline-flex items-center space-x-1 bg-[#e6fffa] text-[#00bba6] text-xs font-bold px-2 py-0.5 rounded-md">
                <i className="fa-solid fa-arrow-trend-up text-[10px]" />
                <span>+8.4%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-2 pb-1 overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="relative h-56 w-full">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 520 220"
              >
                <line
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="195"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                <line
                  x1="50"
                  y1="195"
                  x2="510"
                  y2="195"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                <line
                  x1="50"
                  y1="173"
                  x2="510"
                  y2="173"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />

                <text
                  x="500"
                  y="167"
                  fill="#ef4444"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="end"
                >
                  Baseline : 1.33
                </text>

                <path
                  d="M 50,185 C 80,180 110,180 135,178 C 145,178 150,195 160,202 C 175,210 190,190 205,185 C 215,183 220,198 230,200 C 245,202 260,185 275,160 C 290,135 300,70 315,35 C 325,12 335,15 342,70 C 347,150 350,195 365,198 C 380,200 395,185 410,180 C 420,175 430,190 445,192 C 475,195 490,192 505,192"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                />

                <path
                  d="M 50,172 C 70,170 85,160 100,158 C 110,155 115,170 130,173 C 150,178 170,172 190,155 C 205,140 215,105 230,95 C 238,90 244,115 250,140 C 255,165 265,168 280,158 C 295,150 310,152 325,160 C 335,165 345,178 355,178 C 375,170 395,158 415,158 C 430,158 440,175 460,185 C 480,190 495,190 510,189"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                />

                <path
                  d="M 50,158 C 70,145 90,140 110,140 C 120,140 125,165 140,165 C 160,165 180,160 200,150 C 215,140 220,120 235,120 C 245,120 250,135 260,140 C 275,142 290,135 305,125 C 315,122 330,122 340,130 C 350,140 360,155 375,155 C 390,155 405,142 420,135 C 440,128 460,125 480,118"
                  fill="none"
                  stroke="#4318ff"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-1 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-[2px] bg-[#d97706]" />
            <span>Deflux_Wash_Sensor</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-[2px] bg-[#22c55e]" />
            <span>Deflux_Tank2_Concentration</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-[2px] bg-[#4318ff]" />
            <span>Deflux_Rinse_Conductivity</span>
          </div>
        </div>
      </article>
    </section>
  );
}
