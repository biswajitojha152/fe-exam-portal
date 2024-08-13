import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import ClassIcon from "@mui/icons-material/Class";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const sideBarMenuListAdmin = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Category",
    path: "/category",
    icon: <FolderIcon />,
  },
  {
    label: "Quiz",
    path: "/quiz",
    icon: <ClassIcon />,
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        // width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          // width: drawerWidth,
          width: {
            xs: open ? drawerWidth : 60,
            lg: drawerWidth,
          },
          transition: "width 0.2s ease-in",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflowX: "hidden" }}>
        <Box
          sx={{
            display: {
              xs: "flex",
              lg: "none",
            },
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "black" }}>
            {open ? (
              <MenuOpenIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </IconButton>
        </Box>
        <List>
          {sideBarMenuListAdmin.map((menuItem) => {
            return (
              <ListItem
                key={menuItem.label}
                disablePadding
                sx={{
                  background:
                    location.pathname === menuItem.path
                      ? "hsl(0, 0%, 85%)"
                      : "transparent",
                }}
                onClick={() => handleNavigate(menuItem.path)}
              >
                <ListItemButton>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default SideBar;
