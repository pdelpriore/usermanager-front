import React, { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import showMessage from "../../shared/showMessage";
import { Box, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const withSnackbar = (Component: React.FC) => (props: any) => {
  const { message } = useReactiveVar(showMessage);

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const snackbarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    if (message) setSnackbarOpen(true);
  }, [message]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        backgroundColor: "#e9ecef",
      }}
    >
      <Component {...props} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        message={message}
        action={snackbarAction}
      />
    </Box>
  );
};

export default withSnackbar;
