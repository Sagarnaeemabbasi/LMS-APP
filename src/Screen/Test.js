import * as React from "react";
import { getData, sendData } from "../Config/FirebaseMethod";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, Radio, TextField } from "@mui/material";
import MyRadio from "../Components/Radio";
import { useState } from "react";
import Loader from "../Components/Loader";

export default function Test() {
  const [testList, setTestList] = React.useState([]);
  const [availableTest, setAvailableTest] = React.useState([]);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  let [currentQuestion, setCurrentQuestion] = React.useState(0);
  let [score, setScore] = React.useState(0);
  let [showresult, setShowResult] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [quiz, setQuiz] = React.useState("");
  const [quizButtonText, setQuizButtonText] = React.useState("Next Question");
  // const [showLoader, setShowLoader] = React.useState(false);
  const getTestData = () => {
    setShowQuiz(true);
    getData("testList")
      .then((success) => {
        setTestList([...success]);
        setShowQuiz(false);
      })
      .catch((error) => {
        setShowQuiz(false);
        console.log(error);
      });
  };
  let NextQuestion = () => {
    setCorrectAnswer("");
    let showQuestion = currentQuestion + 1;
    if (showQuestion < availableTest.length) {
      setCurrentQuestion(showQuestion);
      if (showQuestion === availableTest.length - 1) {
        setQuizButtonText("Submit Quiz");
      } else {
        setQuizButtonText("Next Question");
      }
    } else {
      sendData(
        {
          Name: fullName,
          Result: score,
          Course: quiz,
        },
        "Results"
      )
        .then((suc) => {})
        .catch((err) => {
          console.log(err);
        });
      setShowResult(true);
    }
    if (correctAnswer === availableTest[currentQuestion].correctOption) {
      setScore(score + 1);
    }
  };
  const startQuizHandler = () => {
    if (!fullName) {
      setHelperText("Name is required");
      setNameError(true);
    } else {
      setStartQuiz(true);
    }
  };
  React.useEffect(() => {
    getTestData();
  }, []);

  return startQuiz ? (
    <>
      {!showresult ? (
        <>
          <h4>
            Question: {currentQuestion + 1} / {availableTest.length}
          </h4>
          <Grid container item lg={12} spacing={2}>
            <Grid item xs={12} lg={12}>
              Question: {availableTest[currentQuestion].Question}?
            </Grid>
            <Grid item xs={12} lg={12}>
              Options
            </Grid>
            {availableTest[currentQuestion].Options.map((element, index) => (
              <Grid item xs={6} lg={6} md={6} key={index} className="mx-6">
                <MyRadio
                  onChange={(e) => {
                    setCorrectAnswer(e.target.value);
                  }}
                  value={element}
                  id={index}
                />
                {element}
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} lg={12}>
            <Button className="my-3" variant="contained" onClick={NextQuestion}>
              {quizButtonText}
            </Button>
          </Grid>
        </>
      ) : (
        <>Your Quiz Is Finished Now</>
      )}
    </>
  ) : (
    <>
      {showQuiz ? (
        <Loader />
      ) : testList.length > 0 ? (
        <>
          {testList.map((element, index) => {
            return (
              <div key={index} style={{ width: "800px", margin: "auto" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{element.QuizTitle}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      This is Your Quiz of {element.QuizTitle} ,for Starting
                      Quiz firstly Write your Name and then start Quiz
                    </Typography>
                    <TextField
                      error={nameError}
                      label="Enter your Full Name"
                      onChange={(e) => {
                        setNameError(false);
                        setHelperText("");

                        setFullName(e.target.value);
                      }}
                      helperText={helperText}
                    />
                    <div style={{ margin: "5px" }}></div>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setAvailableTest(element.QuizTest);
                        startQuizHandler();
                        setQuiz(element.QuizTitle);
                      }}
                    >
                      Start Quiz
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </>
      ) : (
        <h2>There is No test Availbale</h2>
      )}
    </>
  );
}
