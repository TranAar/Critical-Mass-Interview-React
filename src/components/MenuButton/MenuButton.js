import React from "react";
import PropTypes from "prop-types";
import "./MenuButton.css";

function MenuButton({ menuOpen, onClick }) {
  return (
    <button
      className="menu-burger"
      onClick={onClick}
      aria-label="Toggle Nav Location Menu"
    >
      {menuOpen ? "\u00D7" : "\u2261"}
    </button>
  );
}

MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

export default MenuButton;
