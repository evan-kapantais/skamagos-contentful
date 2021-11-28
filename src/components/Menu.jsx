import React from 'react';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className={`menu ${isMenuOpen && 'menu--open'}`}>
      <button
        type="button"
        className="menu-close-button"
        onClick={() => setIsMenuOpen(false)}
      >
        ✕
      </button>
      <ul className="menu__list">
        <li className="menu__list-item">Editorials</li>
        <li className="menu__list-item">Film</li>
        <li className="menu__list-item">Commercial</li>
        <li className="menu__list-item">Fashion</li>
        <li className="menu__list-item">Street</li>
        <li className="menu__list-item">Portraits</li>
      </ul>
    </div>
  );
};

export default Menu;
