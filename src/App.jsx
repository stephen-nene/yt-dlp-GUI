import React from "react";
import "./assets/css/App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="">
      <Navbar />
      <main className="h-screen  bg-gray-500">
        <h1>Welcome to yt-dlp-GUI</h1>
      </main>
    </div>
  );
}

export default App;
