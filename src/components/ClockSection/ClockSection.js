import React from "react";
import PropTypes from "prop-types";
import "./ClockSection.css";

function ClockSection({ selectedCity, currentTime, currentDate }) {
  return (
    <section id="clock-section" aria-label="Clock">
      <h1 id="location" key={selectedCity?.label}>
        {selectedCity?.label || "Select a city from the menu"}
      </h1>
      <div id="clock" aria-live="polite">
        {currentTime}
      </div>
      <span id="date" key={currentDate}>
        {currentDate}
      </span>
    </section>
  );
}

ClockSection.propTypes = {
  selectedCity: PropTypes.shape({
    section: PropTypes.string,
    label: PropTypes.string,
  }),
  currentTime: PropTypes.string.isRequired,
  currentDate: PropTypes.string.isRequired,
};

export default ClockSection;
