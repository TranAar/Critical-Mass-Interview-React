import React from "react";
import PropTypes from "prop-types";
import "./NavItem.css";

function NavItem({ city, isActive, onSelect }) {
  return (
    <li className="nav-bar-list-item">
      <button
        id={city.section}
        onClick={(e) => onSelect(city, e.currentTarget)}
        aria-label={`Select ${city.label} time`}
        className={isActive ? "active" : ""}
      >
        {city.label}
      </button>
    </li>
  );
}

NavItem.propTypes = {
  city: PropTypes.shape({
    section: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default NavItem;
