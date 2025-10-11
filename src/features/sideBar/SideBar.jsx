import { useState, useCallback, useMemo } from "react";
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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FolderIcon from "@mui/icons-material/Folder";
import ClassIcon from "@mui/icons-material/Class";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN, USER } from "../../helper/constants";
import secureStorage from "../../helper/secureStorage";

const drawerWidth = 240;

const sideBarMenuList = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    visibleRoles: [ADMIN, USER],
  },
  {
    label: "Users",
    path: "/users",
    icon: <PeopleAltIcon />,
    visibleRoles: [ADMIN],
  },
  {
    label: "Category",
    path: "/category",
    icon: <FolderIcon />,
    visibleRoles: [ADMIN],
  },
  {
    label: "Quiz",
    path: "/quiz",
    icon: <ClassIcon />,
    visibleRoles: [ADMIN, USER],
  },
];

const SideBar = () => {
  const loggedInUserRole = useMemo(
    () => secureStorage.getItem("data").role,
    []
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

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
          {sideBarMenuList.map((menuItem) => {
            if (!menuItem.visibleRoles.includes(loggedInUserRole)) {
              return null;
            }
            return (
              <ListItem
                key={menuItem.label}
                disablePadding
                sx={{
                  background:
                    `/${location.pathname.split("/")[1]}` === menuItem.path
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
