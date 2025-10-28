import { useState, useMemo, useCallback, memo } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockIcon from "@mui/icons-material/Lock";

import secureStorage from "../../helper/secureStorage";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkTheme } from "./headerSlice";
import { useToggleThemeMutation } from "../../services/users";
import apiSlice from "../../app/api/apiSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleTheme] = useToggleThemeMutation();
  const isDarkTheme = useSelector((state) => state.header.isDarkTheme);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);
  const openNotification = useMemo(() => {
    return Boolean(notificationEl);
  }, [notificationEl]);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const firstName = useMemo(
    () => secureStorage.getItem("data")?.firstName || null,
    []
  );
  const lastName = useMemo(
    () => secureStorage.getItem("data")?.lastName || null,
    []
  );
  const email = useMemo(() => secureStorage.getItem("data").email, []);
  const username = useMemo(() => secureStorage.getItem("data").username, []);
  const role = useMemo(() => secureStorage.getItem("data")?.role || null, []);
  const joiningDate = useMemo(
    () => secureStorage.getItem("data").joiningDate,
    []
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = useCallback((e) => {
    setNotificationEl(e.currentTarget);
  }, []);

  const handleCloseNotification = useCallback((e) => {
    setNotificationEl(null);
  }, []);

  const handleToggleTheme = useCallback(() => {
    secureStorage.setItem("data", {
      ...secureStorage.getItem("data"),
      isDarkTheme: !isDarkTheme,
    });
    toggleTheme();
    dispatch(setIsDarkTheme(!isDarkTheme));
  }, [dispatch, isDarkTheme, toggleTheme]);

  const handleLogout = useCallback(() => {
    sessionStorage.clear();
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  }, [navigate, dispatch]);

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xxl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Exam Portal
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              sx={{
                color: "#FFFFFF",
                marginRight: {
                  xs: 1,
                  sm: 5,
                },
                ".MuiBadge-badge": {
                  color: "#222222",
                  background: "#FFD100",
                  fontWeight: 600,
                },
              }}
              onClick={handleClickNotification}
            >
              <Badge badgeContent={10}>
                <NotificationsIcon sx={{ fontSize: 29 }} />
              </Badge>
            </IconButton>
            <MenuComp
              anchorEl={notificationEl}
              id="notification-menu"
              open={openNotification}
              onClose={handleCloseNotification}
            >
              <Box
                sx={{
                  width: 396,
                  maxHeight: 300,
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    px: 2,
                    py: 1,
                    backgroundColor: "#fff",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "rgba(63, 63, 63, 1)",
                    }}
                  >
                    Notification
                  </Typography>
                  <IconButton onClick={handleCloseNotification} color="primary">
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body1" align="center">
                      No Notification
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </MenuComp>
            <Avatar alt="KBO" src={null} sx={{ width: 40, height: 40 }} />
            <Box
              sx={{
                ".MuiTypography-root": {
                  letterSpacing: 1,
                },
              }}
            >
              <Typography variant="body1">{firstName}</Typography>
              <Typography variant="caption">{role}</Typography>
            </Box>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ color: "#FFFFFF" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            <MenuComp
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={() => {}}
            >
              <Box sx={{ width: 300, py: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2,
                  }}
                >
                  <Avatar />
                  <Box>
                    <Typography variant="h6" color="text.primary">
                      {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    ".MuiBox-root": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "text.secondary",
                      px: 2,
                    },
                  }}
                >
                  <Box>
                    <EmailIcon />
                    <Typography>{email}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 23 }}>@</Typography>
                    <Typography>{username}</Typography>
                  </Box>
                  <Box>
                    <CalendarTodayIcon />
                    <Typography>{joiningDate}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2, mb: 1 }} />
                <MenuItem onClick={handleToggleTheme}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <BedtimeIcon />
                    <Typography>Dark Mode</Typography>
                    <Switch
                      sx={{ ml: "auto", pointerEvents: "none" }}
                      checked={isDarkTheme}
                      onChange={() => {}}
                    />
                  </Box>
                </MenuItem>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <MenuItem sx={{ px: 2, py: 1 }} onClick={handleLogout}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <LockIcon />
                    <Typography>Logout</Typography>
                  </Box>
                </MenuItem>
              </Box>
            </MenuComp>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MenuComp = memo(function (props) {
  return (
    <Menu
      disableScrollLock
      {...props}
      slotProps={{
        paper: {
          variant: "outlined",
          elevation: 0,
          sx: {
            borderRadius: 1,
            overflow: "visible",
            // filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            boxShadow: (theme) => theme.shadows[2],
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 45,
              height: 45,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {props.children}
    </Menu>
  );
});

export default Header;
