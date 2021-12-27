import React, { useRef, useEffect } from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Social from './Social';

import * as styles from '../style/menu.module.css';

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
    const image = e.currentTarget.nextElementSibling;

    const listWidth = e.currentTarget.parentNode.getBoundingClientRect().width;

    const itemRect = e.currentTarget.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    const itemIsTopside =
      typeof window !== 'undefined' && itemRect.top < window.innerHeight / 2;

    image.style.display = 'block';
    image.style.opacity = 1;

    const translateX = `${e.clientX + listWidth}px`;
    const translateY = itemIsTopside
      ? `${e.clientY - itemRect.top - imageRect.height / 10}px`
      : `${e.clientY - itemRect.top - (imageRect.height * 8) / 10}px`;

    image.style.transform = `translate(${translateX}, ${translateY}`;
  }

  function hideImage(e) {
    const image = e.currentTarget.nextElementSibling;
    image.style.opacity = 0;
    image.style.display = 'none';
  }

  return (
    <StaticQuery
      query={graphql`
        query Projects {
          allContentfulProject(sort: { fields: featured, order: DESC }) {
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
              <li>
                <a href="/contact" className={styles.link}>
                  Contact
                </a>
              </li>
            </ul>
            <hr />
            <ul>
              {data.allContentfulProject.nodes.map((node) => (
                <li key={node.contentful_id} className={styles.item}>
                  <Link
                    to={`/${node.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={styles.link}
                    onMouseMove={showImage}
                    onMouseLeave={hideImage}
                  >
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
            <Social />
          </footer>
        </div>
      )}
    />
  );
};

export default Menu;
