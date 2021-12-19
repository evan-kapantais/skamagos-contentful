import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Seo from '../../components/seo';

import instagram from '../../images/instagram-black.svg';
import facebook from '../../images/facebook-black.svg';

import * as styles from './success.module.css';

const ContactPage = ({ data }) => {
  const nodes = data.allContentfulProject.nodes;

  const nodes1 = nodes.slice(0, nodes.length / 3);
  const nodes2 = nodes.slice(nodes.length / 3, nodes.length - nodes.length / 3);
  const nodes3 = nodes.slice(nodes.length - nodes.length / 3, nodes.length);

  return (
    <div className={styles.page}>
      <Seo title="Success" />
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.socialItem}>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className={styles.container}>
          <h1>Thanks for reaching out!</h1>
          <p>I'll get back to you as soon as possible.</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.column}>
            {nodes1.map((node, i) => (
              <GatsbyImage
                key={i}
                image={node.heroImage.gatsbyImageData}
                alt="project image"
                className={styles.image}
              />
            ))}
          </div>
          <div className={styles.column}>
            {nodes2.map((node, i) => (
              <GatsbyImage
                key={i}
                image={node.heroImage.gatsbyImageData}
                alt="project image"
                className={styles.image}
              />
            ))}
          </div>
          <div className={styles.column}>
            {nodes3.map((node, i) => (
              <GatsbyImage
                key={i}
                image={node.heroImage.gatsbyImageData}
                alt="project image"
                className={styles.image}
              />
            ))}
          </div>
        </div>
      </main>
      <footer>
        <ul>
          <li className={styles.socialItem}>
            <a
              href="https://www.instagram.com/konstantinoskm_/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <img
                src={instagram}
                alt="instagram icon"
                aria-label="social icon"
              />
            </a>
          </li>
          <li className={styles.socialItem}>
            <a
              href="https://www.facebook.com/skamskami"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <img
                src={facebook}
                alt="facebook icon"
                aria-label="social icon"
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default ContactPage;

export const query = graphql`
  query successQuery {
    allContentfulProject {
      nodes {
        heroImage {
          gatsbyImageData(width: 400)
        }
      }
    }
  }
`;
