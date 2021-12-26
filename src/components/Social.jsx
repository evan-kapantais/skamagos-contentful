import React from 'react';

import * as styles from '../style/social.module.css';

import instagram from '../images/instagram-black.svg';
import facebook from '../images/facebook-black.svg';

const Social = () => {
  return (
    <ul className={styles.list}>
      <li>
        <a
          href="https://www.instagram.com/konstantinoskm_/"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <img
            src={instagram}
            alt="instagram icon"
            aria-label="social icon"
            className={styles.image}
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/skamskami"
          rel="noreferrer"
          className={styles.link}
        >
          <img
            src={facebook}
            alt="facebook icon"
            aria-label="social icon"
            className={styles.image}
          />
        </a>
      </li>
    </ul>
  );
};

export default Social;
