import React from "react";
import { Avatar, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface IAuthHeaderProps {
  icon: SvgIconComponent;
  title: string;
}

const AuthHeader = ({ icon: Icon, title }: IAuthHeaderProps) => {
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
