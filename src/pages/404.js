import React from 'react';
import { Link } from 'gatsby';

import '../style/variables.css';
import * as styles from '../style/pageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Four Oh! Four</h1>
        <p className={styles.paragraph}>
          Looks like we dropped your page somewhere around here - bummer.
        </p>
        <p className={styles.homePar}>
          Go back{' '}
          <Link to="/" className={styles.link}>
            home
          </Link>{' '}
          and we can take it from there.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
