"use client";

import { Bell, Search, ChevronDown, Menu, X } from "lucide-react";
import { AvatarDropdown } from "../AvatarDropdown";

export default function DashboardNavbar({ active, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="h-20 shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <h1 className="text-lg font-semibold">{active}</h1>
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <AvatarDropdown></AvatarDropdown>
    </header>
  );
}