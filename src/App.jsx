import React, { useState } from "react";
import "./assets/css/App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Welcome from "./pages/Welcome";
import Help from "./pages/Help";
import Downloads from "./pages/Downloads";
import NoYtDlp from "./pages/NoYtDlp";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [YtDlp, setYtDlp] = useState(false);

  return (
    <div className="">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`h-screen ${!darkMode ? "bg-slate-50" : "bg-slate-500"}`}>
        {YtDlp ? (
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/help" element={<Help />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <NoYtDlp />
        )}
      </div>
    </div>
  );
}

export default App;
