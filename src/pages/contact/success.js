import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Seo from '../../components/seo';
import Social from '../../components/Social';

import * as styles from '../../style/success.module.css';

const ContactPage = ({ data }) => {
  const nodes = data.allContentfulProject.nodes;

  const nodes1 = nodes.slice(0, nodes.length / 2);
  const nodes2 = nodes.slice(nodes.length / 2);

  return (
    <div className={styles.page}>
      <Seo title="Success" />
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className={styles.grid}>
          <ul className={styles.column}>
            {nodes1.map((node, i) => (
              <li key={i}>
                <Link to={`/${node.slug}`}>
                  <GatsbyImage
                    key={i}
                    image={node.heroImage.gatsbyImageData}
                    alt={node.title}
                    title={node.title}
                    className={styles.image}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.column}>
            {nodes2.map((node, i) => (
              <li key={i}>
                <Link to={`/${node.slug}`}>
                  <GatsbyImage
                    key={i}
                    image={node.heroImage.gatsbyImageData}
                    alt={node.title}
                    title={node.title}
                    className={styles.image}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles.row}>
          {nodes.map((node, i) => (
            <li key={i}>
              <Link to={`/${node.slug}`}>
                <GatsbyImage
                  key={i}
                  image={node.heroImage.gatsbyImageData}
                  alt={node.title}
                  title={node.title}
                  className={styles.image}
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.container}>
          <h1>Thanks for reaching out!</h1>
          <p>I'll get back to you as soon as possible.</p>
        </div>
      </main>
      <footer>
        <Social />
      </footer>
    </div>
  );
};

export default ContactPage;

export const query = graphql`
  query successQuery {
    allContentfulProject {
      nodes {
        title
        slug
        heroImage {
          gatsbyImageData(width: 400)
        }
      }
    }
  }
`;
