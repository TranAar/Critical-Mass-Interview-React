import React, { useEffect, useState, useCallback } from "react";
import CityData from "./lib/navigation.json";
import TIME_ZONES_MAP from "./lib/timezones";
import NavBar from "./components/NavBar";
import ClockSection from "./components/ClockSection";
import "./App.css";

function App() {
  const { cities } = CityData;
  const [selectedCity, setSelectedCity] = useState("Select a city from the menu");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const changeDateText = useCallback(() => {
    const newDate = new Date().toLocaleDateString("en-US", {
      timeZone: TIME_ZONES_MAP[selectedCity?.section],
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(newDate);
  }, [selectedCity]);

  const displayTime = useCallback(() => {
    const now = new Date().toLocaleTimeString("en-US", {
      timeZone: TIME_ZONES_MAP[selectedCity?.section],
    });
    setCurrentTime(now);
  }, [selectedCity]);

  useEffect(() => {
    const timerId = setInterval(() => {
      displayTime();
      changeDateText();
    }, 100);
    return () => clearInterval(timerId);
  }, [changeDateText, displayTime, selectedCity]);

  return (
    <>
      <div id="blur-screen" className={menuOpen ? "screen-active" : ""}></div>
      <NavBar
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
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