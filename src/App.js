/**
 * The main application component for rendering the Star Wars application.
 * This component serves as the root component of the application and is responsible
 * for rendering the StarWarsApp component within a div container.
 *
 * @component
 * @returns {JSX.Element} The rendered component for the application.
 */
// src/App.js
import React from "react";
import StarWarsApp from "./StarWarsApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StarWarsApp />
    </div>
  );
}

export default App;
