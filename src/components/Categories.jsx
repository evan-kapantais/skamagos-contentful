import React from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.css';

const Categories = ({ categories, filterProjects }) => {
  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      <ul className={styles.navigationList}>
        <li
          className={styles.navigationItem}
          key="All"
          onClick={() => filterProjects('All')}
        >
          All
        </li>
        {categories.map((c, i) => (
          <li
            className={styles.navigationItem}
            key={i}
            onClick={() => filterProjects(c)}
          >
            {c}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
