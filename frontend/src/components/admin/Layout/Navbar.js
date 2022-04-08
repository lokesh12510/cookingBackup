import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Badge,
  Avatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//import MenuIcon from '@mui/icons-material/Menu';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import NotificationsIcon from '@mui/icons-material/Notifications';
//import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../utils/store/actions";
import CheckAccess from "../Auth/checkAccess";
import url from "../url";

const Navbar = () => {
  const navigate = useNavigate();
  // const ProfileDropdownList = [
  //   {label:"Logout",icon: <ExitToAppIcon/>}
  // ];

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(actions.authLogout());
    navigate(url.Login);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Sidebar />
          <Typography variant="h6"></Typography>
          {authState.isLoggedIn && authState.token !== null ? (
            <>
              <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
                <Button color="primary" onClick={() => navigate(url.Dashboard)}>
                  Dashboard
                </Button>
              </CheckAccess>
              {/* <CheckAccess request={['ROLE_ADMIN', 'ROLE_CHEF']}>
                <Button color="primary" onClick={() => navigate(url.Department) }>Department</Button>
              </CheckAccess> */}
              {/* <CheckAccess request={['ROLE_ADMIN', 'ROLE_CHEF']}>
                <Button color="primary" onClick={() => navigate(url.Employee) }>Employee</Button>
              </CheckAccess> */}
              <CheckAccess request={["ROLE_ADMIN"]}>
                <Button color="primary" onClick={() => navigate(url.Customer)}>
                  Customer
                </Button>
              </CheckAccess>
              <CheckAccess request={["ROLE_ADMIN"]}>
                <Button color="primary" onClick={() => navigate(url.Cook)}>
                  Home Cook
                </Button>
              </CheckAccess>
              <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
                <Button color="primary" onClick={() => navigate(url.Food)}>
                  Food
                </Button>
              </CheckAccess>
              <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
                <Button color="primary" onClick={() => navigate(url.Order)}>
                  Orders
                </Button>
              </CheckAccess>
              <Button color="primary" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="primary" onClick={() => navigate(url.Login)}>
                Login
              </Button>
              {/* <Button color="primary" onClick={() => navigate(url.Signup) }>Register</Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
