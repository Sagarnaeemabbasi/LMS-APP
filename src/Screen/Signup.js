import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Config/FirebaseMethod";
import Navbar from "../Components/Navbar";
export default function Sinup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  let login = () => {
    navigate("/login");
  };
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
            <Box m={5}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="filled"
                label="Enter Your Email"
                type="Email"
                // size="normal"

                className="textFeild"
              />
            </Box>
            <Box m={5}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                label="Enter Your Password"
                type="password"
                className="textFeild"
              />
            </Box>
            <Box>
              <Button variant="contained" onClick={signup} className="button">
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
