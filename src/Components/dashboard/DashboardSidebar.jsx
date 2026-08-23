"use client";

import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";



export default function DashboardSidebar({ active, setActive, sidebarOpen }) {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  const role = user?.role.toLowerCase() || "collaborator";
  // console.log(role);

  const NAV_ITEMS = {
    collaborator: [

      {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/dashboard/collaborator"
      },
      {
        label: "My Applications",
        icon: FolderKanban,
        href: "/dashboard/collaborator/application"
      },
      {
        label: "Profile",
        icon: Users,
        href: "/dashboard/collaborator/profile"
      }

    ],
    founder: [

      {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/dashboard/founder/"
      },
      {
        label: "My startup",
        icon: FolderKanban,
        href: "/dashboard/founder/mystartup"
      },
      {
        label: "Add Opportunity",
        icon: Users,
        href: "/dashboard/founder/addOpportunity"
      },
      {
        label: "Manage Opportunities",
        icon: Users,
        href: "/dashboard/founder/manageOpportunities"
      },
      {
        label: "Applications",
        icon: Users,
        href: "/dashboard/founder/applications"
      }

    ],
    admin: [
      {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/dashboard/admin"
      },
      {
        label: "Manage users",
        icon: Users,
        href: "/dashboard/admin/manageUsers"
      },
      {
        label: "Manage startups",
        icon: Users,
        href: "/dashboard/admin/manageStartups"
      },
      {
        label: "Transactions",
        icon: Users,
        href: "/dashboard/admin/transactions"
      },

    ]



  };

  const menu = NAV_ITEMS[role] || NAV_ITEMS.founder;

  return (
    <aside
      className={`${sidebarOpen ? "w-[260px]" : "w-[72px]"
        } shrink-0 border-r border-gray-200 bg-white flex flex-col transition-all duration-200`}
    >
      <div className="h-20 flex items-center gap-2 px-5 border-b border-gray-200">
        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {user?.role[0]}
        </div>
        {sidebarOpen && (
          <div>
            <span className="font-semibold text-md tracking-tight">{user?.name}</span>
            <p className="text-[12px]">{user?.role}</p>
          </div>



        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map(({ label, icon: Icon, href }) => {
          const isActive = active === label;
          return (
            <Link
              key={label}
              href={href}
            >
              <button

                onClick={() => setActive(label)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </button>
            </Link>

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