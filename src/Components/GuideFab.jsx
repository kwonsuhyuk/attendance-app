import React from "react";
import { Fab, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useTour } from "@reactour/tour";

const GuideFab = () => {
  const { setIsOpen } = useTour();
  return (
    <Tooltip
      title="App Guide"
      onClick={() => setIsOpen(true)}
      data-tour="step-29">
      <Fab
        color="white"
        aria-label="help"
        style={{ position: "fixed", bottom: 20, right: 20 }}
        // onClick={() => setIsTourOpen(true)}
      >
        <HelpIcon sx={{ color: "black" }} />
      </Fab>
    </Tooltip>
  );
};

export default GuideFab;
