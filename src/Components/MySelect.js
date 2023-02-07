import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels(props) {
  const { onChange, value, label, helperText, RenderList, onBlur, emptyText } =
    props;
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
        >
          <MenuItem value="">
            <em>{emptyText}</em>
          </MenuItem>
          {RenderList && RenderList.lenght > 0
            ? RenderList.map((element, index) => (
                <MenuItem value={value} key={index}>
                  {element}
                </MenuItem>
              ))
            : null}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
