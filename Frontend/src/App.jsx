import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import BottomFooter from "./components/BottomFooter";
import HelpSection from "./components/Helpsection";
import Landingpage from "./components/Landingpage";
import ResumeUpload from "./pages/ResumeUpload";
import { PrivateRoute } from "./components/PrivateRoute";

const App = () => {
  const location = useLocation(); 

  return (
    <>
      <Landingpage />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={
      <PrivateRoute>
        <ResumeUpload />
      </PrivateRoute>}/>
      </Routes>

      {location.pathname === "/" && <HelpSection /> }
      <Footer />
    </>
  );
};

export default App;
