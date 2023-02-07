import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate, useParams } from "react-router-dom";
import { checkUser, getData, sendData } from "../Config/FirebaseMethod";
export default function RegistrationForm() {
  const [course, setCourse] = useState("empty");
  const [studentData, setStudentData] = useState({});
  const [section, setSection] = useState("empty");
  const [userId, setUserId] = useState("");
  let newDate = new Date();
  const months = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();
  const day = newDate.getUTCDate();
  const todaysDate = `${months}/${day}/${year}`;
  const [nameError, setNameError] = useState({
    err: false,
    text: "",
  });
  const [contactError, setContactError] = useState({
    err: false,
    text: "",
  });
  const [fatNameError, setFatNameError] = useState({
    err: false,
    text: "",
  });
  const [CNICError, setCNICError] = useState(false);
  const [CNICHelperText, setCNICHelperTextt] = useState("");
  const [courseError, setCourseError] = useState(false);
  const [courseHelperText, setCourseHelperText] = useState("");
  const [sectionError, setSectionError] = useState(false);
  const [sectionHelperText, setSectionHelperText] = useState("");
  const [DateError, setDateError] = useState(false);
  const [DateHelperText, setDateHelperText] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(todaysDate);
  const getStudentsData = (key, value) => {
    studentData[key] = value;
    setStudentData({ ...studentData });
  };
  const cources = ["php", "java", "js", "html"];
  const nameRagexHandler = (err, text) => {
    setNameError({
      err: err,
      text: text,
    });
  };
  const contactRagexHandler = (err, text) => {
    setContactError({
      err: err,
      text: text,
    });
  };
  const fatherRagexHandler = (err, text) => {
    setFatNameError({
      err: err,
      text: text,
    });
  };
  let nameReg = /^([a-zA-Z]){3,10}$/;
  let fatNameReg = /^([a-zA-Z]){3,20}$/;
  let contactReg = /^([0-9]){11}$/;
  const sendDatatoFireBase = () => {
    // if (!nameReg.test(studentData.firstName)) {
    //   nameRagexHandler(true, "First Name is required");
    // }
    if (studentData.firstName === null) {
      nameRagexHandler(true, "First Name is required");
    }
    if (!contactReg.test(studentData.contact)) {
      contactRagexHandler(true, "Fill the right number");
    }
    // if (!fatNameReg.test(studentData.fatherName)) {
    //   fatherRagexHandler(true, "father Name is required");
    //   return;
    // }
    if (studentData.fatherName === null) {
      fatherRagexHandler(true, "father Name is required");
      return;
    }
    sendData(
      {
        studentsData: studentData,
        userId: userId,
      },
      `Students/${userId}`
    )
      .then((suc) => {
        todoData();
        console.log(suc);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let checkUserHere = () => {
    checkUser()
      .then((user) => {
        if (params.id === user) {
          setUserId(user);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoData = () => {
    getData(`Students/${userId}`)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    checkUserHere();
  }, []);

  return (
    <div>
      <h1>Students Registration Form</h1>
      <Box style={{ marginLeft: "40px", marginBottom: "10px" }}>
        <Grid container spacing={4}>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              variant="standard"
              label="First Name"
              onChange={(e) => {
                nameRagexHandler(false, "");
                getStudentsData("firstName", e.target.value);
              }}
              error={nameError.err}
              helperText={nameError.text}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="Last Name"
              variant="standard"
              onChange={(e) => getStudentsData("lastName", e.target.value)}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="Contact No"
              type="number"
              variant="standard"
              // onFilled={checkRegex}
              onChange={(e) => {
                contactRagexHandler(false, "");
                getStudentsData("contact", e.target.value);
              }}
              error={contactError.err}
              helperText={contactError.text}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="Father Name"
              variant="standard"
              onChange={(e) => {
                fatherRagexHandler(false, "");
                getStudentsData("fatherName", e.target.value);
              }}
              error={fatNameError.err}
              helperText={fatNameError.text}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="Father Contact"
              type="number"
              variant="standard"
              onChange={(e) => getStudentsData("fatherContact", e.target.value)}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="CNIC"
              type="number"
              variant="standard"
              onChange={(e) => getStudentsData("CNIC", e.target.value)}
              error={CNICError}
              helperText={CNICHelperText}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="Father CNIC"
              type="number"
              variant="standard"
              onChange={(e) => getStudentsData("fatherCNIC", e.target.value)}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <Select
              value={course}
              variant="standard"
              onChange={(e) => setCourse(e.target.value)}
              onBlur={(e) => getStudentsData("course", e.target.value)}
              // error={courseError}
              // helperText={courseHelperText}
            >
              <MenuItem value="empty">Select Course</MenuItem>
              <MenuItem value="Node">Node</MenuItem>
              <MenuItem value="Php">Php</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="React">React</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <Select
              value={section}
              variant="standard"
              onChange={(e) => setSection(e.target.value)}
              onBlur={(e) => getStudentsData("section", e.target.value)}
              // error={sectionError}
              // helperText={sectionHelperText}
            >
              {/* */}
              <MenuItem value="empty">Select Section</MenuItem>
              <MenuItem value="a">a</MenuItem>
              <MenuItem value="b">b</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={6} xs={12} md={8} sm={8}>
            <TextField
              label="Emergency Contact"
              type="number"
              variant="standard"
              onChange={(e) =>
                getStudentsData("Emergency Contact", e.target.value)
              }
            />
          </Grid>
          <Grid item lg={8} m={"auto"} xs={12} md={8} sm={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Select Date of Birth"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={(e) => setDate(e)}
                  onClose={() => {
                    getStudentsData(
                      "dateOfBirth",
                      `${date.$D}/${date.$M + 1}/${date.$y}`
                    );
                  }}
                  // error={DateError}
                  // helperText={DateHelperText}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <br />
        <br />
        <Button variant="contained" onClick={sendDatatoFireBase}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
