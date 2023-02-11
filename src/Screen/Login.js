import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../Config/FirebaseMethod";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function Login() {
  const [loader, setLoader] = useState(false);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let params = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const logIn = () => {
    setLoader(true);
    login(email, password)
      .then((succes) => {
        setLoader(false);
        alert("login Successfully");
        navigate(`/home/${succes.id}`);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        alert(error);
      });
  };
  const signup = () => [navigate("/")];
  return (
    <>
      <Navbar signup={signup} />
      <div className="flex loginBody ">
        <div className="innerFlex">
          <Typography
            variant="h3"
            style={{ marginTop: 100 }}
            className="h3"
            m={5}
          >
            Login here
          </Typography>
          <Typography variant="h3" className="h3" m={5}>
            To Enjoy your LMS
          </Typography>
        </div>
        <div className="innerFlex loginBox">
          <Box>
            <Box>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="filled"
                label="Enter Your Email"
                type="Email"
                className="textFeild"
                style={
                  matches
                    ? { width: "300px", marginTop: 18 }
                    : { width: "220px", marginTop: 14 }
                }
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
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    logIn();
                  }
                }}
              />
            </Box>
            <Box>
              {loader ? (
                <Loader />
              ) : (
                <Button
                  variant="contained"
                  onClick={logIn}
                  style={
                    matches
                      ? { width: "300px", marginTop: 18 }
                      : { width: "220px", marginTop: 14 }
                  }
                  className="button"
                >
                  LogIn
                </Button>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
