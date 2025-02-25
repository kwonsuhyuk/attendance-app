import React from "react";
import { IconButton, Popover, Typography } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import darkModeStore from "@/store/darkmode.store";
import { useTour } from "@reactour/tour";

const GuidePopover = ({ text, show = true }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const darkMode = darkModeStore(state => state.darkMode);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <ContactSupportIcon sx={{ color: !darkMode ? "black" : "white" }} />
        {show && (
          <Typography sx={{ fontSize: 14, color: !darkMode ? "black" : "white" }}>GUIDE</Typography>
        )}
      </IconButton>
    </div>
  );
};

export default GuidePopover;
