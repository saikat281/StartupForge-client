"use client";

import * as React from "react";
import Link from "next/link";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";

// Founder Icons
import BusinessIcon from "@mui/icons-material/Business";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import FactCheckIcon from "@mui/icons-material/FactCheck";

// Collaborator Icons
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonIcon from "@mui/icons-material/Person";

// Admin Icons
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PaymentsIcon from "@mui/icons-material/Payments";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// Common Icons
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const sidebarConfig = {
  founder: {
    title: "Founder",
    subtitle: "Startup Dashboard",
    avatar: "F",
    color: "#2563EB",

    menu: [
      {
        title: "Create Startup Profile",
        icon: <BusinessIcon />,
        href: "/dashboard/founder/create-startup",
      },
      {
        title: "Post Team Requirements",
        icon: <GroupAddIcon />,
        href: "/dashboard/founder/team-requirements",
      },
      {
        title: "Review Applications",
        icon: <DescriptionIcon />,
        href: "/dashboard/founder/applications",
      },
      {
        title: "Accept / Reject Applicants",
        icon: <FactCheckIcon />,
        href: "/dashboard/founder/manage-applications",
      },
    ],
  },

  collaborator: {
    title: "Collaborator",
    subtitle: "Team Dashboard",
    avatar: "C",
    color: "#059669",

    menu: [
      {
        title: "Browse Startups",
        icon: <TravelExploreIcon />,
        href: "/dashboard/collaborator/startups",
      },
      {
        title: "Apply to Join Teams",
        icon: <GroupAddIcon />,
        href: "/dashboard/collaborator/apply",
      },
      {
        title: "Track Application Status",
        icon: <TimelineIcon />,
        href: "/dashboard/collaborator/status",
      },
      {
        title: "Maintain Personal Profile",
        icon: <PersonIcon />,
        href: "/dashboard/collaborator/profile",
      },
    ],
  },

  admin: {
    title: "Admin",
    subtitle: "Control Panel",
    avatar: "A",
    color: "#DC2626",

    menu: [
      {
        title: "Manage Users",
        icon: <PeopleIcon />,
        href: "/dashboard/admin/users",
      },
      {
        title: "Manage Startup Posts",
        icon: <BusinessCenterIcon />,
        href: "/dashboard/admin/startups",
      },
      {
        title: "View Transactions",
        icon: <PaymentsIcon />,
        href: "/dashboard/admin/transactions",
      },
      {
        title: "Moderate Platform Activities",
        icon: <AdminPanelSettingsIcon />,
        href: "/dashboard/admin/moderation",
      },
    ],
  },
};

export default function Sidebar({ role = "collaborator" }) {
  const [selected, setSelected] = React.useState(0);

  const data = sidebarConfig[role] || sidebarConfig.collaborator;

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#111827",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <Box p={3}>
        <Avatar
          sx={{
            bgcolor: data.color,
            width: 55,
            height: 55,
            mb: 2,
            fontWeight: "bold",
          }}
        >
          {data.avatar}
        </Avatar>

        <Typography fontWeight="bold" fontSize={20}>
          {data.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
          {data.subtitle}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#374151" }} />

      <Typography
        sx={{
          px: 3,
          py: 2,
          color: "#9CA3AF",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        MAIN MENU
      </Typography>

      {/* Menu */}
      <List sx={{ px: 1 }}>
        {data.menu.map((item, index) => (
          <Link
            href={item.href}
            key={item.title}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItemButton
              selected={selected === index}
              onClick={() => setSelected(index)}
              sx={{
                borderRadius: 2,
                mb: 1,

                "&.Mui-selected": {
                  bgcolor: data.color,
                },

                "&.Mui-selected:hover": {
                  bgcolor: data.color,
                },

                "&:hover": {
                  bgcolor: "#1F2937",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "#374151" }} />

      {/* Bottom Menu */}
      <List sx={{ p: 1 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            mb: 1,

            "&:hover": {
              bgcolor: "#1F2937",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <SettingsIcon />
          </ListItemIcon>

          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2,
            color: "#EF4444",

            "&:hover": {
              bgcolor: "#3F1D1D",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#EF4444" }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}