import React, { useEffect, useId, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import Test from "./Test";
import { checkUser, getData, sendData } from "../Config/FirebaseMethod";
import MakeTest from "./MakeTest";
import Result from "./Result";
import ScreenAlert from "./Alert";
import ExtraTable from "../Components/Extra";

const drawerWidth = 240;

function Home(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let internalRoute = [
    {
      Name: "Registrationform",
      route: "registrationform",
    },
    {
      Name: "Test",
      route: "test",
    },
    {
      Name: "Make Test",
      route: "makeTest",
    },
    {
      Name: "Result",
      route: "result",
    },
  ];
  // for Alert

  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const changeHandler = () => {};

  let params = useParams();
  let navigate = useNavigate();
  let [listText, setListText] = useState([]);
  let [Text, setText] = useState("");
  const [list, setList] = useState([]);

  let [screenAlert, setScreenAlert] = useState(null);
  let [userId, setUserId] = useState("");
  const showAlert = (type, message) => {
    setScreenAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setScreenAlert(null);
    }, 3000);
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
  const addTextToFirebase = () => {
    if (!Text) {
      alert("text is required");
      return;
    }

    sendData(
      {
        text: Text,
        userId: userId,
      },
      `todo/${userId}`
    )
      .then((suc) => {
        todoData();
      })
      .catch((err) => {
        console.log(err);
      });
    let txt = "";
    setText(txt);
  };
  const todoData = () => {
    getData(`todo/${userId}`)
      .then((success) => {
        setList(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    checkUserHere();
  }, []);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {internalRoute.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(text.route)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Home Page
            </Typography>
          </Toolbar>
          {/* {Alert && (
            <div
              className={`alert alert-${Alert.type}`}
              // style={{ height: "50px" }}
              role="alert"
            >
              <strong>{Alert.type}</strong>: {Alert.message}
            </div>
          )} */}
        </AppBar>

        {/* <p>Check Your TextList In Lists</p> */}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Box>
            <Grid>
              {list && list.length > 0
                ? list.map((element) => (
                    <Grid key={element.id} item>
                      {element.text}
                    </Grid>
                  ))
                : null}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Routes>
        <Route path="registrationform" element={<RegistrationForm />} />
        <Route path="test" element={<Test userId={userId} />} />
        <Route path="makeTest" element={<MakeTest userId={userId} />} />
        <Route path="result" element={<Result />} />
        <Route path="table" element={<ExtraTable />} />
      </Routes>
    </>
  );
}

Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Home;
