import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Grid, Radio } from "@mui/material";
import Paper from "@mui/material/Paper";
import MyRadio from "../Components/Radio";

export default function MyGrid(props) {
  const [optionText, setOptionText] = React.useState("");
  const [optionArray, setOptionArray] = React.useState([]);
  const [helperText, setHelperText] = React.useState("");
  const [AddOptions, setAddOptions] = React.useState("Add Options");
  const [optionValidColor, setOptionValidColor] = React.useState({});
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const optionsHandler = () => {
    setOptionArray([...new Set([...optionArray, optionText])]);
    setOptionText("");
  };
  return (
    <>
      <div>
        <div style={{ margin: "8px" }}>
          <span style={{ margin: "4px" }}>
            <TextField
              value={optionText}
              onChange={(e) => {
                setOptionText(e.target.value);
                setAddOptions("");
              }}
            />
          </span>

          <Button variant="contained" size="large" onClick={optionsHandler}>
            Make Options
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          {optionArray && optionArray.length > 0 ? (
            <Box>
              <h3>Options Are</h3>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {optionArray.map((element, index) => {
                  return (
                    <Grid item lg={5} md={5} key={index}>
                      <Item variant="outlined">
                        <MyRadio
                          // onClick={(e) => setCorrectOption(e.target.value)}
                          value={element}
                          id={index}
                        />
                        {element}
                      </Item>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ) : (
            <p style={optionValidColor}>{AddOptions}</p>
          )}
        </div>
      </div>
    </>
  );
}
