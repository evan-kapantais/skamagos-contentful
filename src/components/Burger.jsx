import React from 'react';

const Burger = ({ setIsMenuOpen }) => {
  return (
    <button
      type="button"
      aria-label="menu button"
      className="burger"
      onClick={() => setIsMenuOpen(true)}
    >
      <div className="burger__dash"></div>
      <div className="burger__dash"></div>
    </button>
  );
};

export default Burger;
