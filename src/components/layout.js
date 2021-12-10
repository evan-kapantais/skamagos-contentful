import React, { useEffect, useRef } from 'react';

import './variables.css';
import './global.css';
import Seo from './seo';

import * as styles from './layout.module.css';

const Template = ({ children, setIsMenuOpen }) => {
  const cursor = useRef(null);

  // Add mousemove event listener
  useEffect(() => {
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Adjust cursor size on mouse leave
  function handleMouseLeave() {
    cursor.current.style.width = 0;
    cursor.current.style.height = 0;
  }

  // Remove cursor style attr on mouse enter
  function handleMouseEnter() {
    cursor.current.removeAttribute('style');
  }

  // Position cursor on mousemove
  function handleMouseMove(e) {
    handleMouseEnter();

    const cursorRect = cursor.current.getBoundingClientRect();
    const cursorWidth = cursorRect.width;
    const p = cursor.current.querySelector('p');

    cursor.current.style.transform = `translate(${
      e.pageX - cursorWidth / 2
    }px, ${e.pageY - cursorWidth / 2}px)`;

    if (e.target.className === 'tile-overlay') {
      cursor.current.classList.add(styles.cursorTile);
      p.textContent = 'View More';
    } else if (e.target.className.indexOf('navigationItem') !== -1) {
      cursor.current.classList.add(styles.cursorLink);
    } else {
      cursor.current.classList.remove(styles.cursorTile);
      cursor.current.classList.remove(styles.cursorLink);
      p.textContent = '';
    }
  }

  // Position cursor on scroll
  function handleScroll() {
    handleMouseLeave();
  }

  return (
    <div className="layout">
      <Seo />
      <main>{children}</main>
      <div className={styles.cursor} ref={cursor}>
        <p className={styles.cursorText}></p>
      </div>
    </div>
  );
};

export default Template;
