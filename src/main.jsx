import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './assets/css/index.css';
import { BrowserRouter } from "react-router-dom";

// Enabling future flags for React Router v7
const futureFlags = {
  v7_startTransition: true,  // Opt into startTransition behavior
  v7_relativeSplatPath: true, // Opt into relative Splat path changes
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter future={futureFlags}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
