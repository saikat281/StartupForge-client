"use client";
 
import DashboardNavbar from "@/Components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/Components/dashboard/DashboardSidebar";
import { useState } from "react";




 
export default function RootLayout({ children }) {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
 
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <DashboardSidebar active={active} setActive={setActive} sidebarOpen={sidebarOpen} />
 
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar
          active={active}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
 
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}