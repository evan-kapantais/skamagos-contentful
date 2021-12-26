import React from 'react';

import * as styles from '../style/burger.module.css';

const Burger = ({ setIsMenuOpen }) => {
  return (
    <button
      type="button"
      className={styles.burger}
      onClick={() => setIsMenuOpen(true)}
    >
      <div className={styles.dash} />
      <div className={styles.dash} />
      <div className={styles.dash} />
    </button>
  );
};

export default Burger;
