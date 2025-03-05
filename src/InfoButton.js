/**
 * InfoButton component that displays an information button with a tooltip.
 *
 * This component renders a button with an "i" label that, when hovered over,
 * displays a tooltip providing additional information. The tooltip suggests
 * entering the name of a Star Wars character to search.
 *
 * The component uses React's useState hook to manage the visibility of the tooltip.
 *
 * @component
 * @example
 * return (
 *   <InfoButton />
 * )
 *
 * @returns {JSX.Element} A React component that renders an information button with a tooltip.
 */ // InfoButton.js
import React, { useState } from "react";
import "./InfoButton.css"; // Create a separate CSS file for styling

const InfoButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="info-button-container">
      <button
        className="info-button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Information"
      >
        i
      </button>
      {showTooltip && (
        <div className="tooltip">
          Enter the name of a Star Wars character to search.
        </div>
      )}
    </div>
  );
};

export default InfoButton;
