import React from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.css';

const Categories = ({ categories, filterProjects }) => {
  function createArrow(e) {
    const category = e.currentTarget;
    const arrow = document.createElement('span');
    arrow.textContent = '➞';

    arrow.className = styles.arrow;

    category.append(arrow);
  }

  function moveArrow(e) {
    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`);
    const tileRect = e.currentTarget.getBoundingClientRect();
    const arrowRect = arrow.getBoundingClientRect();

    const x = e.clientX - tileRect.left - arrowRect.width / 2;
    const y = e.clientY - tileRect.top - arrowRect.height / 2;

    arrow.style.transform = `translate(${x}px, ${y}px)`;
  }

  function hideArrow(e) {
    console.log(e.currentTarget);
    const arrows = e.currentTarget.querySelectorAll(`.${styles.arrow}`);
    arrows.forEach((c) => e.currentTarget.removeChild(c));
  }

  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      <ul className={styles.navigationList}>
        {categories.map((c, i) => (
          <li
            className={styles.navigationItem}
            key={i}
            onClick={() => filterProjects(c)}
          >
            {c}
          </li>
        ))}
        {/* <li
          className={styles.navigationItem}
          onMouseEnter={createArrow}
          onMouseMove={moveArrow}
          onMouseLeave={hideArrow}
        >
          <Link to="/work/" activeClassName="active">
            Editorials
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/work/" activeClassName="active">
            Film
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/work/" activeClassName="active">
            Commercials
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/work/" activeClassName="active">
            Fashion
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/work/" activeClassName="active">
            Street
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/work/" activeClassName="active">
            Portraits
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Categories;
