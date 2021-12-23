import React, { useRef, useEffect } from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import * as styles from './menu.module.css';
import { GatsbyImage } from 'gatsby-plugin-image';

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

  function showImage(e) {
    const image = e.currentTarget.querySelector(`.${styles.image}`);

    const listWidth = e.currentTarget.parentNode.getBoundingClientRect().width;

    const itemRect = e.currentTarget.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    const itemIsTopside = itemRect.top < window.innerHeight / 2;

    image.style.opacity = 1;

    const translateX = `${e.clientX + listWidth}px`;
    const translateY = itemIsTopside
      ? `${e.clientY - itemRect.top - imageRect.height / 10}px`
      : `${e.clientY - itemRect.top - (imageRect.height * 8) / 10}px`;

    image.style.transform = `translate(${translateX}, ${translateY}`;
  }

  function hideImage(e) {
    const image = e.currentTarget.querySelector(`.${styles.image}`);
    image.style.opacity = 0;
  }

  return (
    <StaticQuery
      query={graphql`
        query Projects {
          allContentfulProject(sort: { fields: publishDate, order: DESC }) {
            nodes {
              contentful_id
              title
              slug
              heroImage {
                gatsbyImageData(width: 400)
              }
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
          <section>
            <ul>
              {data.allContentfulProject.nodes.map((node) => (
                <li
                  key={node.contentful_id}
                  className={styles.item}
                  onMouseMove={showImage}
                  onMouseLeave={hideImage}
                >
                  <Link to={`/${node.slug}`} className={styles.link}>
                    {node.title}
                  </Link>
                  <GatsbyImage
                    image={node.heroImage.gatsbyImageData}
                    alt={node.title}
                    title={node.title}
                    className={styles.image}
                  />
                </li>
              ))}
            </ul>
          </section>
          <footer>
            <ul>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </footer>
        </div>
      )}
    />
  );
};

export default Menu;
