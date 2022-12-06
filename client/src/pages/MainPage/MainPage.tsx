import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DrawerComponent from "../../components/Shared/DrawerComponent";
import AuthContext from "../../contexts/authContext";

const drawerWidth = 240;

const MainPage = () => {
  const { loggedIn, checkAuth, loading, setLoading, setLoggedIn } =
    useContext(AuthContext);

  let location = useLocation();

  useEffect(() => {
    // Not permanent solution for checking token response, will be updated in the future
    checkAuth()
      .then((res) => {
        setLoggedIn(res);
        setLoading(false);
      })
      .catch(() => {        
        setLoggedIn(false);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return loggedIn ? (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <DrawerComponent />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainPage;
