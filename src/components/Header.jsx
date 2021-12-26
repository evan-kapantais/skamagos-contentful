import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../style/header.module.css';

const Header = () => {
  return (
    <header className={styles.bodyHeader}>
      <Link to="/" className={styles.brandLink}>
        <h1>Konstantinos Skamagos</h1>
      </Link>
    </header>
  );
};

export default Header;
