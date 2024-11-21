import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";
import { Badge } from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = React.useState(null);
  const openNotification = React.useMemo(() => {
    return Boolean(notificationEl);
  }, [notificationEl]);
  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = React.useCallback((e) => {
    setNotificationEl(e.currentTarget);
  }, []);

  const handleCloseNotification = React.useCallback((e) => {
    setNotificationEl(null);
  }, []);

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
              <Typography variant="body1">{`${
                JSON.parse(sessionStorage.getItem("data")).firstName
              }`}</Typography>
              <Typography variant="caption">
                {JSON.parse(sessionStorage.getItem("data")).role.replace(
                  "ROLE_",
                  ""
                )}
              </Typography>
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
              onClick={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </MenuComp>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MenuComp = React.memo(function (props) {
  return (
    <Menu
      disableScrollLock
      {...props}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            borderRadius: 3,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
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
