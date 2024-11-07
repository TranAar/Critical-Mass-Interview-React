import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import NavItem from "../NavItem";
import MenuButton from "../MenuButton";
import './NavBar.css';

function NavBar({ cities, selectedCity, onCitySelect, menuOpen, setMenuOpen }) {
  const navSliderRef = useRef(null);
  const activeButtonRef = useRef(null);

  function changeLocation(city, buttonElement) {
    onCitySelect(city);
    setMenuOpen(false);
    activeButtonRef.current = buttonElement;
  }

  useEffect(() => {
    if (navSliderRef.current && activeButtonRef.current) {
      navSliderRef.current.style.left = `${activeButtonRef.current.offsetLeft}px`;
      navSliderRef.current.style.width = `${activeButtonRef.current.offsetWidth}px`;
    }
  }, [selectedCity]);

  return (
    <nav id="nav-bar" className={menuOpen ? "nav-active" : ""}>
      <ul id="nav-bar-list">
        {cities.map((city) => (
          <NavItem
            key={city.section}
            city={city}
            isActive={selectedCity.label === city.label}
            onSelect={changeLocation}
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
  selectedCity: PropTypes.string.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

export default NavBar;
