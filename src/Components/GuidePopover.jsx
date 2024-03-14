import React from "react";
import { IconButton, Popover, Typography } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useSelector } from "react-redux";
import { useTour } from "@reactour/tour";

export default function GuidePopover({ text, show = true }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <ContactSupportIcon sx={{ color: !darkMode ? "black" : "white" }} />
        {show && (
          <Typography
            sx={{ fontSize: 14, color: !darkMode ? "black" : "white" }}>
            GUIDE
          </Typography>
        )}
      </IconButton>
    </div>
  );
}
