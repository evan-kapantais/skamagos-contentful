import React, { useRef, useEffect } from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import * as styles from './menu.module.css';

const Menu = ({ setIsMenuOpen }) => {
  const menuRef = useRef(null);

  // Animate menu in
  useEffect(() => {
    setTimeout(() => {
      menuRef.current.classList.add(styles.shown);
    });
  }, []);

  // Animate menu out and set state
  function close(e) {
    menuRef.current.classList.remove(styles.shown);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  }

  return (
    <StaticQuery
      query={graphql`
        query Projects {
          allContentfulProject(sort: { fields: publishDate, order: DESC }) {
            nodes {
              title
              slug
            }
          }
        }
      `}
      render={(data) => (
        <div className={styles.menu} ref={menuRef}>
          <header className={styles.header}>
            <Link to="/">
              <h1>Skamagos</h1>
            </Link>
            <button type="button" className={styles.button} onClick={close}>
              ✕
            </button>
          </header>
          <header></header>
          <section>
            <ul className={styles.list}>
              {data.allContentfulProject.nodes.map((node, i) => (
                <li key={i} className={styles.item}>
                  <Link to={`/${node.slug}`}>{node.title}</Link>
                </li>
              ))}
            </ul>
          </section>
          <footer>
            <ul>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a href="">Instagram</a>
              </li>
            </ul>
          </footer>
        </div>
      )}
    />
  );
};

export default Menu;
