import React from "react";
import { IconButton, Popover, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useSelector } from "react-redux";

export default function GuidePopover({ text }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <HelpOutlineIcon sx={{ color: !darkMode ? "black" : "white" }} />
        <Typography sx={{ fontSize: 14, color: !darkMode ? "black" : "white" }}>
          GUIDE
        </Typography>{" "}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <Typography sx={{ padding: 2, fontSize: 15 }}>{text}</Typography>
      </Popover>
    </div>
  );
}
