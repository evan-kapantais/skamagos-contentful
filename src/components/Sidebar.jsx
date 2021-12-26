import { graphql, StaticQuery, Link } from 'gatsby';
import React from 'react';

import Social from './Social';

import * as styles from '../style/sidebar.module.css';

const Sidebar = () => {
  return (
    <StaticQuery
      query={graphql`
        query titlesQuery {
          allContentfulProject(sort: { fields: featured, order: DESC }) {
            edges {
              node {
                title
                contentful_id
                slug
              }
            }
          }
        }
      `}
      render={(data) => (
        <aside className={styles.sidebar}>
          <header>
            <h1>
              <Link to="/">Skamagos</Link>
            </h1>
          </header>
          <nav role="navigation" aria-label="Main">
            <ul>
              <li>
                <Link
                  to="/contact"
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <hr />
            <ul>
              {data.allContentfulProject.edges.map(({ node }) => (
                <li key={node.contentful_id} className={styles.navigationItem}>
                  <Link
                    to={`/${node.slug}`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                  >
                    {node.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <footer>
            <Social />
          </footer>
        </aside>
      )}
    />
  );
};

export default Sidebar;
