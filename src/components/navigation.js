import React from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.css';

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <ul className={styles.navigationList}>
      <li className={styles.navigationItem}>
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
      </li>
      <li className={`${styles.navigationItem} ${styles.baseItem}`}>
        <Link to="/About/" activeClassName="active">
          About
        </Link>
      </li>
      <li className={`${styles.navigationItem} ${styles.baseItem}`}>
        <Link to="/contact/" activeClassName="active">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
