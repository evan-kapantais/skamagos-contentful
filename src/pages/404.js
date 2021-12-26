import { Link } from 'gatsby';
import React from 'react';
import * as styles from '../style/pageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Four Oh! Four</h1>
        <p className={styles.paragraph}>
          Looks like I dropped your page somewhere 'round 'ere - bummer.
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
