import { Box } from "@mui/material";
import React from "react";

interface IForm {
  children: React.ReactNode;
}

const Form: React.FC<IForm> = ({ children }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        gap={5}
        component="form"
        noValidate
        autoComplete="off"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Form;
