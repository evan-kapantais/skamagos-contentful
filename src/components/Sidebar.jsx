import { graphql, StaticQuery, Link } from 'gatsby';
import React from 'react';

import * as styles from './navigation.module.css';

const Sidebar = () => {
  return (
    <StaticQuery
      query={graphql`
        query titlesQuery {
          allContentfulProject(sort: { fields: publishDate, order: DESC }) {
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
              <Link to="/index01">Skamagos</Link>
            </h1>
          </header>
          <nav role="navigation" aria-label="Main">
            <ul className={styles.navigationList}>
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
          <footer className={styles.sidebarFooter}>
            <ul>
              <li>
                <Link to="/about">/ About</Link>
              </li>
              <li>
                <Link to="/contact">/ Contact</Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/konstantinoskm_/"
                  target="_blank"
                  rel="noreferrer"
                >
                  / Instagram
                </a>
              </li>
            </ul>
          </footer>
        </aside>
      )}
    />
  );
};

export default Sidebar;
