"use client";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  FolderKanban,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Team", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export default function DashboardSidebar({ active, setActive, sidebarOpen }) {
  return (
    <aside
      className={`${
        sidebarOpen ? "w-[220px]" : "w-[72px]"
      } shrink-0 border-r border-gray-200 bg-white flex flex-col transition-all duration-200`}
    >
      <div className="h-20 flex items-center gap-2 px-5 border-b border-gray-200">
        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-semibold text-sm shrink-0">
          A
        </div>
        {sidebarOpen && (
          <span className="font-semibold text-sm tracking-tight">Acme Inc.</span>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gray-300 shrink-0" />
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Jane Doe</p>
              <p className="text-xs text-gray-500 truncate">jane@acme.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}