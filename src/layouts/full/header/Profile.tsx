import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUsername } from "../../../../store/mainSlice";
import { useEffect } from "react";
const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const username = useSelector(selectUserName);
  const dispatch = useDispatch();
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  useEffect(() => {
    const u = window.localStorage.getItem("username");
    if (u) {
      dispatch(setUsername(u));
    }
  }, []);
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        {username ? (
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {username && username[0]}
          </Avatar>
        ) : (
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="image"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        )}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
            onClick={() => {
              window.localStorage.setItem("token", "");
              window.localStorage.setItem("username", "");
              dispatch(setUsername(""));
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
