import React, { useContext } from "react";
import "./DrawerComponent.css";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from '@mui/icons-material/Dashboard';
// import BiotechIcon from "@mui/icons-material/Biotech";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthContext from "../../contexts/authContext";

const DrawerComponent = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const drawerWidth = 240;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <img src="/cph_logo.PNG" alt="" />
      <Divider />
      <List>
        <ListItem key={"home"} disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"requests"} disablePadding>
          <ListItemButton onClick={() => navigate("/requests")}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"Requests"} />
          </ListItemButton>
        </ListItem>
        {/* <ListItem key={"tests"} disablePadding> // not in use atm
          <ListItemButton onClick={() => navigate("/tests")}>
            <ListItemIcon>{<BiotechIcon />}</ListItemIcon>
            <ListItemText primary={"Raw Test Results"} />
          </ListItemButton>
        </ListItem> */}
        <ListItem key={"logout"} disablePadding id="sign-out-button">
          <ListItemButton onClick={() => handleLogout()}>
            <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
            <ListItemText primary={"Sign out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
