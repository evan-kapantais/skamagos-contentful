import React from 'react';

import * as styles from '../style/footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <p>&copy; Konstantinos Skamagos, {new Date().getFullYear()}</p>
    </div>
    <div>
      Designed and built by{' '}
      <a href="https://evankapantais.com/" className="text-link">
        Evan Kapantais_
      </a>
    </div>
  </footer>
);

export default Footer;
