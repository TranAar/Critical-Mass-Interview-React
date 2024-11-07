import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import NavItem from "../NavItem";
import MenuButton from "../MenuButton";
import "./NavBar.css";

function NavBar({ cities, selectedCity, setSelectedCity, menuOpen, setMenuOpen }) {
  // ref and state
  const navSliderRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState({ left: 0, width: 0 });

  // Update selected city and slider position
  const onSelect = (city) => {
    setSelectedCity(city);
    setMenuOpen(false);
    setSliderPosition({
      left: document.getElementById(city.section).offsetLeft,
      width: document.getElementById(city.section).offsetWidth,
    });
  };

  const updateSliderPosition = useCallback(() => {
    if (selectedCity) {
      const buttonElement = document.getElementById(selectedCity.section);
      if (buttonElement) {
        setSliderPosition({
          left: buttonElement.offsetLeft,
          width: buttonElement.offsetWidth,
        });
      }
    }
  }, [selectedCity])

  // use effect to set state for position and width of slider
  useEffect(() => {
    updateSliderPosition();
  }, [selectedCity, updateSliderPosition]);

  // use effect to update the position
  useEffect(() => {
    if (navSliderRef.current) {
      const { left, width } = sliderPosition;
      navSliderRef.current.style.left = `${left}px`;
      navSliderRef.current.style.width = `${width}px`;
    }
  }, [sliderPosition]);

  // use effect to update position on window resize
  useEffect(() => {
    window.addEventListener("resize", updateSliderPosition);
    return () => window.removeEventListener("resize", updateSliderPosition);
  }, [selectedCity, updateSliderPosition]);

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
          left: sliderPosition.left,
          width: sliderPosition.width
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
