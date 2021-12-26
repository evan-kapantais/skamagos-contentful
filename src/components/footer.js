import React from 'react';

import * as styles from '../style/footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    Designed and built by{' '}
    <a href="https://www.instagram.com/evan.json/" className="text-link">
      Evan Kapantais
    </a>
  </footer>
);

export default Footer;
