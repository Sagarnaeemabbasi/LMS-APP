import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Config/FirebaseMethod";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../Components/Navbar";
import { useTheme } from "@mui/material/styles";
export default function Sinup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  let login = () => {
    navigate("/login");
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const signup = () => {
    signIn({
      email: email,
      password: password,
      userName: "Sagar Abbasi",
      contact: "0312",
    })
      .then((user) => {
        alert("Signup Successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <Navbar login={login} />

      <div className="flex signupBody">
        <div className="innerFlex">
          <Typography
            variant="h3"
            className="h3"
            style={{ marginTop: 100 }}
            m={5}
          >
            SignUp here
          </Typography>
          <Typography variant="h3" className="h3" m={5}>
            Its Your LMS
          </Typography>
        </div>

        <div className="innerFlex signupBox">
          <Box>
            <Box>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="filled"
                label="Enter Your Email"
                type="Email"
                style={
                  matches
                    ? { width: "300px", marginTop: 18 }
                    : { width: "220px", marginTop: 14}
                }
                className="textFeild"
              />
            </Box>
            <Box >
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                label="Enter Your Password"
                type="password"
                className="textFeild"
                style={
                  matches
                    ? { width: "300px", marginTop: 18 }
                    : { width: "220px", marginTop: 14 }
                }
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                style={matches ? { width: "300px" , marginTop: 18} : { width: "220px" , marginTop: 14 }}
                onClick={signup}
                className="button"
              >
                {/* // {isLoading?<} */}
                SignUp
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
