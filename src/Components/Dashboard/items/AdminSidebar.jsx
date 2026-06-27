"use client";

import * as React from "react";
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

import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PaymentsIcon from "@mui/icons-material/Payments";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const menu = [
  {
    title: "Manage Users",
    icon: <PeopleIcon />,
  },
  {
    title: "Manage Startup Posts",
    icon: <BusinessCenterIcon />,
  },
  {
    title: "View Transactions",
    icon: <PaymentsIcon />,
  },
  {
    title: "Moderate Platform Activities",
    icon: <AdminPanelSettingsIcon />,
  },
];

export default function AdminSidebar() {
  const [selected, setSelected] = React.useState(0);

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#0F172A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={3}>
        <Avatar
          sx={{
            bgcolor: "#DC2626",
            width: 55,
            height: 55,
            mb: 2,
          }}
        >
          A
        </Avatar>

        <Typography fontWeight="bold" fontSize={20}>
          Admin
        </Typography>

        <Typography variant="body2" color="gray">
          Control Panel
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#334155" }} />

      <Typography sx={{ px: 3, py: 2, color: "#94A3B8", fontSize: 12 }}>
        ADMIN MENU
      </Typography>

      <List sx={{ px: 1 }}>
        {menu.map((item, index) => (
          <ListItemButton
            key={item.title}
            selected={selected === index}
            onClick={() => setSelected(index)}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                bgcolor: "#DC2626",
              },
              "&:hover": {
                bgcolor: "#1E293B",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "#334155" }} />

      <List sx={{ p: 1 }}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "#fff" }}>
            <SettingsIcon />
          </ListItemIcon>

          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton sx={{ color: "#EF4444" }}>
          <ListItemIcon sx={{ color: "#EF4444" }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}