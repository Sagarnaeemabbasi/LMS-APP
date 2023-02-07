import { TextField } from "@mui/material";
import React from "react";

export default function MyTextField(props) {
  const { onChange, label, variant } = props;
  return (
    <div>
      <TextField
        onChange={onChange}
        label={label}
        variant={variant ? variant : "outlined"}
      />
    </div>
  );
}
