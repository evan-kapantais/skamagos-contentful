import React, { useRef, useEffect } from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import * as styles from './menu.module.css';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuRef = useRef(null);

  // Animate menu in
  useEffect(() => {
    setTimeout(() => {
      menuRef.current.style.transform = 'translateX(0)';
    });
  }, []);

  // Animate menu out and set state
  function close(e) {
    menuRef.current.style.transform = 'translateX(-100%)';
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);

    if (e.currentTarget.href && typeof window !== 'undefined')
      window.location.href = '/';
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
          <button type="button" className={styles.button} onClick={close}>
            ✕
          </button>
          <header>
            <Link to="/" onClick={close}>
              <h1>Skamagos</h1>
            </Link>
          </header>
          <section>
            <ul className={styles.list}>
              {data.allContentfulProject.nodes.map((node, i) => (
                <li key={i} className={styles.item}>
                  <Link to={`/${node.slug}`}>{node.title}</Link>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a href="">Instagram</a>
              </li>
            </ul>
          </section>
          <footer></footer>
        </div>
      )}
    />
  );
};

export default Menu;
