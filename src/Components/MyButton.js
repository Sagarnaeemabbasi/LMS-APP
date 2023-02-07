import { Button } from "@mui/material";
import React from "react";

export default function MyButton(props) {
  const { onClick, text,variant } = props;
  return (
    <div>
      <Button onClick={onClick} variant={variant?variant:"contained"}>{text}</Button>
    </div>
  );
}
