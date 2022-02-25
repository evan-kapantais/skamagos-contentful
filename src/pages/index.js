import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Footer from '../components/footer';
import Burger from '../components/Burger';
import ProjectTile from '../components/ProjectTile';
import Seo from '../components/seo';

import { showScrollItems } from '../utils/animations';

import * as styles from '../style/indexGrid.module.css';

const LargeGrid = ({ projects }) => {
  const column1 = [];
  const column2 = [];
  const column3 = [];

  for (let i = 0; i < projects.length; i = i + 3) {
    if (i < projects.length) {
      typeof projects[i] !== 'undefined' && column1.push(projects[i]);
      typeof projects[i + 1] !== 'undefined' && column2.push(projects[i + 1]);
      typeof projects[i + 2] !== 'undefined' && column3.push(projects[i + 2]);
    }
  }

  return (
    <>
      <div className={styles.column}>
        <ul>
          {column1.map((project) => (
            <ProjectTile key={project.contentful_id} project={project} />
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <ul>
          {column2.map((project) => (
            <ProjectTile key={project.contentful_id} project={project} />
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <ul>
          {column3.map((project) => (
            <ProjectTile key={project.contentful_id} project={project} />
          ))}
        </ul>
      </div>
    </>
  );
};

const MediumGrid = ({ projects }) => {
  const column1 = [];
  const column2 = [];

  for (let i = 0; i < projects.length; i = i + 2) {
    if (i < projects.length) {
      typeof projects[i] !== 'undefined' && column1.push(projects[i]);
      typeof projects[i + 1] !== 'undefined' && column2.push(projects[i + 1]);
    }
  }

  return (
    <>
      <div className={`${styles.columnMedium} ${styles.column}`}>
        <ul>
          {column1.map((project) => (
            <ProjectTile key={project.contentful_id} project={project} />
          ))}
        </ul>
      </div>
      <div className={`${styles.columnMedium} ${styles.column}`}>
        <ul>
          {column2.map((project) => (
            <ProjectTile key={project.contentful_id} project={project} />
          ))}
        </ul>
      </div>
    </>
  );
};

const SmallGrid = ({ projects }) => (
  <div className={styles.columnSmall}>
    <ul>
      {projects.map((project) => (
        <ProjectTile key={project.contentful_id} project={project} />
      ))}
    </ul>
  </div>
);

const RootIndex = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState(null);

  const isWindowDefined = typeof window !== 'undefined';

  // handle this in an effect
  const fetchedProjects = data.allContentfulProject.nodes;

  // Set projects
  useEffect(() => {
    setProjects(fetchedProjects);
  }, [fetchedProjects]);

  // Register event listeners / Show tiles in viewport
  useEffect(() => {
    showScrollItems();

    document.addEventListener('scroll', showScrollItems);
  }, []);

  function getLayout() {
    const windowExists = typeof window !== 'undefined';
    const largeScreen = windowExists && window.innerWidth >= 700;
    const mediumScreen =
      windowExists && window.innerWidth < 700 && window.innerWidth >= 450;
    const smallScreen = windowExists && window.innerWidth < 450;

    if (largeScreen) return <LargeGrid projects={projects} />;
    if (mediumScreen) return <MediumGrid projects={projects} />;
    if (smallScreen) return <SmallGrid projects={projects} />;
  }

  return (
    isWindowDefined && (
      <Layout
        location={window.location}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      >
        <Seo />
        {!projects && <p>Loading content...</p>}
        {projects && (
          <div className="index-container">
            <section className="content">
              <header className="content-header">
                <Link to="/">
                  <h1>Konstantinos Skamagos</h1>
                </Link>
                <Burger setIsMenuOpen={setIsMenuOpen} />
              </header>
              <div className="project-thumbs__wrapper">{getLayout()}</div>
              <Footer />
            </section>
          </div>
        )}
      </Layout>
    )
  );
};

export default RootIndex;

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulProject(sort: { fields: featured, order: DESC }) {
      nodes {
        contentful_id
        title
        featured
        slug
        heroImage {
          gatsbyImageData(width: 500)
        }
      }
    }
  }
`;
