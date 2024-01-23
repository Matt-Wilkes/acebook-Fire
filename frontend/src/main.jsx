import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App.jsx";
import "./index.css";

// Get the "root" div from index.html.
// The React application will be inserted into this div.
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
