/**
 * Initializes and renders the main React application component into the DOM.
 *
 * This script imports necessary modules and styles, creates a root DOM node
 * for the React application, and renders the `App` component within a
 * `React.StrictMode` wrapper. The `React.StrictMode` is a tool for highlighting
 * potential problems in an application, such as deprecated lifecycle methods
 * and other warnings.
 *
 * @module index
 * @requires React
 * @requires ReactDOM
 * @requires ./index.css
 * @requires ./App
 *
 * @constant {ReactDOM.Root} root - The root DOM node where the React application is rendered.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
