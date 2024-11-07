import React, { useEffect, useState, useCallback } from "react";
import CityData from "./lib/navigation.json";
import TIME_ZONES_MAP from "./lib/timezones";
import NavBar from "./components/NavBar";
import ClockSection from "./components/ClockSection";
import "./App.css";

function App() {
  const { cities } = CityData;

  // get cache
  const getInitialCity = () => {
    const cachedCity = localStorage.getItem("selectedCity");
    return cachedCity
      ? JSON.parse(cachedCity)
      : { name: "Select a city from the menu", section: "" };
  };
  const getInitialTime = () => localStorage.getItem("currentTime") || "";
  const getInitialDate = () => localStorage.getItem("currentDate") || "";

  // state and set cache
  const [selectedCity, setSelectedCity] = useState(getInitialCity);
  const [currentTime, setCurrentTime] = useState(getInitialTime);
  const [currentDate, setCurrentDate] = useState(getInitialDate);
  const [menuOpen, setMenuOpen] = useState(false);

  // update cache
  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    localStorage.setItem("currentTime", currentTime);
    localStorage.setItem("currentDate", currentDate);
  }, [selectedCity, currentTime, currentDate]);

  // update date text
  const updateDateText = useCallback(() => {
    const newDate = new Date().toLocaleDateString("en-US", {
      timeZone: TIME_ZONES_MAP[selectedCity?.section],
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(newDate);
  }, [selectedCity]);

  // update display time
  const updateTimeText = useCallback(() => {
    const now = new Date().toLocaleTimeString("en-US", {
      timeZone: TIME_ZONES_MAP[selectedCity?.section],
    });
    setCurrentTime(now);
  }, [selectedCity]);

  useEffect(() => {
    // Update the time and text when selectedCity changes
    updateTimeText();
    updateDateText();

    // interval to update the time and text every second
    const timerId = setInterval(() => {
      updateTimeText();
      updateDateText();
    }, 1000);

    // Cleanup
    return () => clearInterval(timerId);
  }, [updateTimeText, updateDateText, selectedCity]);

  return (
    <>
      <div id="blur-screen" className={menuOpen ? "screen-active" : ""}></div>
      <NavBar
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <ClockSection
        selectedCity={selectedCity}
        currentTime={currentTime}
        currentDate={currentDate}
      />
    </>
  );
}

export default App;
