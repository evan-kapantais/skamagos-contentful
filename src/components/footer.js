import React from 'react';

import * as styles from '../style/footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; Konstantinos Skamagos, {new Date().getFullYear()}</p>
    <p>
      Designed and built by{' '}
      <a href="https://evankapantais.com/" className="text-link">
        Evan Kapantais_
      </a>
    </p>
  </footer>
);

export default Footer;
