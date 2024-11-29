import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { makeServer } from "./server/mirage.js";

if (import.meta.env.DEV === true) {
  makeServer({ environment: "development" });
}

createRoot(document.getElementById("root")).render(<App />);
