import React, { Profiler } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "../Screen/Home";
import Login from "../Screen/Login";
import Profile from "../Screen/Profile";
import Sinup from "../Screen/Signup";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/Home/:id/*" element={<Home />} />
        <Route path="/" element={<Sinup />} />
        <Route path="login" element={<Login />} />

        <Route path="profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}
