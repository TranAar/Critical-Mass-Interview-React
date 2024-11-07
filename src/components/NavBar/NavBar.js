import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import NavItem from "../NavItem";
import MenuButton from "../MenuButton";
import "./NavBar.css";

function NavBar({
  cities,
  selectedCity,
  setSelectedCity,
  menuOpen,
  setMenuOpen,
}) {
  // ref and state
  const navSliderRef = useRef(null);
  const activeButtonRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState({
    left: 0,
    width: 0,
  });

  // update selected city and update positioning of slider
  function onSelect(city, buttonElement) {
    setSelectedCity(city);
    setMenuOpen(false);
    activeButtonRef.current = buttonElement;
    const newPosition = {
      left: buttonElement.offsetLeft,
      width: buttonElement.offsetWidth,
    };
    setSliderPosition(newPosition);
    localStorage.setItem("sliderPosition", JSON.stringify(newPosition));
  }

  // use effect to set state for position and width of slider
  useEffect(() => {
    const savedPosition = localStorage.getItem("sliderPosition");
    if (savedPosition) {
      const parsedPosition = JSON.parse(savedPosition);
      setSliderPosition(parsedPosition);
    } else if (selectedCity && activeButtonRef.current) {
      const buttonElement = activeButtonRef.current;
      const newPosition = {
        left: buttonElement.offsetLeft,
        width: buttonElement.offsetWidth,
      };
      setSliderPosition(newPosition);
      localStorage.setItem("sliderPosition", JSON.stringify(newPosition));
    }
  }, [selectedCity, cities]);

  // use effect to update the position
  useEffect(() => {
    if (navSliderRef.current) {
      navSliderRef.current.style.left = `${sliderPosition.left}px`;
      navSliderRef.current.style.width = `${sliderPosition.width}px`;
    }
  }, [sliderPosition]);

  return (
    <nav id="nav-bar" className={menuOpen ? "nav-active" : ""}>
      <ul id="nav-bar-list">
        {cities.map((city) => (
          <NavItem
            key={city?.section}
            city={city}
            isActive={selectedCity?.label === city?.label}
            onSelect={onSelect}
          />
        ))}
      </ul>
      <div id="nav-divider"></div>
      <div
        id="nav-slider"
        ref={navSliderRef}
        style={{
          left: activeButtonRef.current?.offsetLeft || 0,
          width: activeButtonRef.current?.offsetWidth || 0,
        }}
      ></div>
      <MenuButton menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
    </nav>
  );
}

NavBar.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCity: PropTypes.shape({
    section: PropTypes.string,
    label: PropTypes.string,
  }),
  setSelectedCity: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

export default NavBar;
