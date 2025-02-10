import React from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, Alert } from "@mui/material";
import { Link } from "react-router-dom";

interface TAuthFooterProps {
  buttonText: string;
  linkText: string;
  linkTo: string;
  loading: boolean;
}

const AuthFooter = ({ buttonText, linkText, linkTo, loading }: TAuthFooterProps) => {
  return (
    <>
      <LoadingButton
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        loading={loading}
        sx={{ mt: 1, mb: 2 }}
      >
        {buttonText}
      </LoadingButton>
      <Grid container justifyContent="flex-end" mb={5}>
        <Grid item>
          <Link
            to={linkTo}
            style={{
              textDecoration: "none",
              color: "gray",
            }}
          >
            {linkText}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthFooter;
