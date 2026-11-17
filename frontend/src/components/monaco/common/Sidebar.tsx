
interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    return (
     <aside
    className={`bg-white border-r border-slate-100 flex-shrink-0 flex flex-col min-h-screen fixed lg:static z-30 transition-all duration-300 select-none overflow-hidden ${
  isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0 border-none"
}`}>

    <div className="h-20 flex items-center px-7 space-x-3.5 border-b border-transparent">
      <div
        className="w-10 h-10 rounded-full bg-[#1b59f8] flex items-center justify-center text-white shadow-md shadow-blue-500/30">
        <span className="font-extrabold text-lg tracking-tighter">CA</span>
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-base tracking-tight text-[#1b2559] leading-tight">CTQ</span>
        <span className="text-[11px] font-bold tracking-widest text-[#a3aed0] uppercase">Monitoring</span>
      </div>
    </div>
    <nav aria-label="Sidebar Menu" className="mt-4 px-4 flex-1 space-y-1.5">
      <a className="relative flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl text-[#4318ff] bg-[#f4f7fe]/70 group transition-colors"
        href="#">
        <span className="w-5 text-center mr-3 text-base text-[#4318ff]">
          <i className="fa-solid fa-house"></i>
        </span>
        <span>Dashboard</span>
        <span className="absolute right-0 top-2 bottom-2 w-1.5 bg-[#4318ff] rounded-l-full"></span>
      </a>
      <a className="flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl text-[#a3aed0] hover:text-[#4318ff] hover:bg-[#f4f7fe]/50 transition-colors"
        href="#">
        <span className="w-5 text-center mr-3 text-base text-[#a3aed0] group-hover:text-[#4318ff]">
          <i className="fa-solid fa-chart-simple"></i>
        </span>
        <span>Analysis</span>
      </a>
    </nav>
  </aside>
    );
}