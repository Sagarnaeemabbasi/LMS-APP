import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Grid, Radio } from "@mui/material";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TabPanel from "@mui/lab/TabPanel";
import { sendData } from "../Config/FirebaseMethod";
import MyRadio from "../Components/Radio";
import Loader from "../Components/Loader";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MakeTest(props) {
  // All the states
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [makeQuestion, setMakeQuestion] = React.useState(false);
  const [submitQuestion, setSubmitQuestion] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Make Question");
  const [quizTitle, setQuizTitle] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [optionText, setOptionText] = React.useState("");
  const [optionArray, setOptionArray] = React.useState([]);
  const [value, setValue] = React.useState("0");
  const [questionWithOptions, setQuestionWithOptions] = React.useState([]);
  const [correctOption, setCorrectOption] = React.useState("");
  const [lockFinalQuiz, setLockFinalQuiz] = React.useState(false);
  const [mainQuizScreen, setMainQuizScreen] = React.useState(true);
  const [questionError, setQuestionError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [AddOptions, setAddOptions] = React.useState("Add Options");
  const [optionValidColor, setOptionValidColor] = React.useState({});
  const [quizSubmitValidColor, setQuizSubmitValidColor] = React.useState("");
  const [lockQuizText, setLockQuizText] = React.useState("No Questions Yet");
  const [submitLoader, setSubmitLoader] = React.useState(false);
  // for Alert
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // FireBase Methods (send test to firebase)
  const addTestToFirebase = () => {
    if (!questionWithOptions.length > 0) {
      setLockQuizText("There is no question in this Quiz");
      setQuizSubmitValidColor({
        color: "#d32f2f",
      });
      return;
    }
    setSubmitLoader(true);
    sendData(
      {
        QuizTitle: quizTitle,
        QuizTest: questionWithOptions,
        userId: props.userId,
      },
      "testList"
    )
      .then((suc) => {
        setSubmitLoader(false);
        setLockFinalQuiz(false);
        setMainQuizScreen(true);
        setQuestionWithOptions([]);
        setStartQuiz(false);
      })
      .catch((err) => {
        setSubmitLoader(false);
        console.log(err);
      });
  };

  // All the funtions for handling state
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const makeQuiz = () => {
    setStartQuiz(true);
  };
  const ButtonQuizText = () => {
    if (buttonText === "Make Question") {
      setButtonText("Submit Question");
      setMakeQuestion(true);
    } else {
      if (optionArray.length > 0) {
        setSubmitQuestion(true);

        setValue((parseInt(value) + 1).toString());
        setQuestionWithOptions([
          ...questionWithOptions,
          {
            Question: questionText,
            Options: optionArray,
            correctOption: correctOption,
          },
        ]);
        setMakeQuestion(false);
        setOptionArray([]);
        setQuestionText("");
        setButtonText("Make Question");
      } else {
        setAddOptions("Options are requird");
        setOptionValidColor({
          color: "#d32f2f",
        });
      }
    }
  };
  const optionsHandler = () => {
    setOptionArray([...new Set([...optionArray, optionText])]);
    setOptionText("");
  };
  const lockQuiz = () => {
    setLockFinalQuiz(true);
    setMainQuizScreen(false);
  };
  const finalSubmittionOfQuiz = () => {
    addTestToFirebase();
    setSeverity("success");
    setMessage("Your Quiz Successfully sent to database");
    setOpen(true);
  };
  const EditQuiz = () => {
    setLockFinalQuiz(false);
    setMainQuizScreen(true);
  };
  //Functions for Handler
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const questionRegex = /\w+/;
  return (
    <>
      {lockFinalQuiz && (
        <>
          <div className="modal-dialog modal-lg">
            {questionWithOptions.length > 0 ? (
              "This is your Quiz Review It"
            ) : (
              <p style={quizSubmitValidColor}>{lockQuizText}</p>
            )}
            <div style={{ width: "750px", margin: "auto" }}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  {questionWithOptions.map((element, index) => {
                    return (
                      <div key={index}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab
                              label={`Question # ${index + 1}`}
                              value={value}
                            />
                          </TabList>
                        </Box>
                        <TabPanel value={value}>
                          {element.Question}
                          <ul>
                            {element.Options.map((e, i) => {
                              return (
                                <ListItem key={i}>
                                  <span>
                                    {e === correctOption ? (
                                      <strong>Correct Answer:</strong>
                                    ) : null}
                                  </span>{" "}
                                  <ListItemText primary={e} />
                                </ListItem>
                              );
                            })}
                          </ul>
                        </TabPanel>
                      </div>
                    );
                  })}
                </TabContext>
              </Box>
            </div>
          </div>
          {submitLoader ? (
            <Loader/>
          ) : (
            <Button variant="contained" onClick={finalSubmittionOfQuiz}>
              Final Submit
            </Button>
          )}
          <span style={{ marginLeft: "4px" }}></span>
          <Button variant="contained" onClick={EditQuiz}>
            Edit Quiz
          </Button>
          <br />
          <br />
        </>
      )}
      {mainQuizScreen && (
        <div>
          <Divider>You can make your quiz here</Divider>
          <Box m={4}>
            <Button variant="contained" onClick={makeQuiz}>
              Start Making quiz
            </Button>
          </Box>
          {startQuiz && (
            <TextField
              value={quizTitle}
              label="Quiz Title"
              onChange={(e) => {
                setQuizTitle(e.target.value);
              }}
            />
          )}
          {makeQuestion && (
            <div>
              <div
                style={{ width: "550px", margin: "auto", marginTop: "15px" }}
              >
                <TextField
                  error={questionError}
                  fullWidth
                  value={questionText}
                  onChange={(e) => {
                    setQuestionError(false);
                    setHelperText("");

                    setQuestionText(e.target.value);
                  }}
                  onBlur={() => {
                    if (!questionRegex.test(questionText)) {
                      setQuestionError(true);
                      setHelperText("Question is required");
                    }
                  }}
                  label="Question"
                  id="fullWidth"
                  helperText={helperText}
                />
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
                                  onClick={(e) =>
                                    setCorrectOption(e.target.value)
                                  }
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

                <Button
                  variant="contained"
                  size="large"
                  onClick={optionsHandler}
                >
                  Make Options
                </Button>
              </div>
            </div>
          )}
          {startQuiz && (
            <>
              <Box m={4}>
                <Button variant="contained" onClick={ButtonQuizText}>
                  {buttonText}
                </Button>
                <span style={{ marginLeft: "4px" }}>
                  <Button variant="contained" onClick={lockQuiz}>
                    Lock Quiz
                  </Button>
                </span>
              </Box>
            </>
          )}
          {submitQuestion && (
            <div style={{ width: "750px", margin: "auto" }}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  {questionWithOptions.map((element, index) => {
                    return (
                      <div key={index}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab
                              label={`Question # ${index + 1}`}
                              value={value}
                            />
                          </TabList>
                        </Box>
                        <TabPanel value={value}>
                          {element.Question}
                          <ul>
                            {element.Options.map((e, i) => {
                              return (
                                <ListItem key={i}>
                                  <span key={i}>
                                    {e === correctOption ? (
                                      <strong>Correct Answer:</strong>
                                    ) : null}
                                  </span>{" "}
                                  <ListItemText primary={e} />
                                </ListItem>
                              );
                            })}
                          </ul>
                        </TabPanel>
                      </div>
                    );
                  })}
                </TabContext>
              </Box>
            </div>
          )}
        </div>
      )}
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
