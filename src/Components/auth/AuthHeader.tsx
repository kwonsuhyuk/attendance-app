import React from "react";
import { Avatar, Typography } from "@mui/material";

const AuthHeader = ({ icon: Icon, title }: any) => {
  return (
    <>
      <Avatar
        sx={{
          m: 1,
          bgcolor: "black",
        }}
      >
        <Icon />
      </Avatar>
      <Typography component="h1" variant="h5" color="black">
        {title}
      </Typography>
    </>
  );
};

export default AuthHeader;
