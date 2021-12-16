import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import ProjectTile from '../components/ProjectTile';
import Lightbox from '../components/Lightbox';
import Footer from '../components/footer';

const RootIndex = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [projects, setProjects] = useState(null);

  const fetchedProjects = data.allContentfulProject.nodes;

  // Set projects and categories
  useEffect(() => {
    setProjects(fetchedProjects);
  }, []);

  // Control document overflow
  useEffect(() => {
    if (isLightBoxOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLightBoxOpen]);

  useEffect(() => {
    setTimeout(() => {
      const tiles = document.querySelectorAll('.tile');

      console.log(tiles);

      for (const tile of tiles) {
        const offsetTop = tile.getBoundingClientRect().top;

        if (offsetTop < window.innerHeight) {
          tile.style.transform = 'translateY(0)';
          tile.style.opacity = 1;
        }
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', showTiles);
  }, []);

  function showTiles(e) {
    const tiles = document.querySelectorAll('.tile');

    for (const tile of tiles) {
      const offsetTop = tile.getBoundingClientRect().top;

      if (offsetTop < window.innerHeight) {
        tile.style.transform = 'translateY(0)';
        tile.style.opacity = 1;
      } else {
        tile.style.transform = 'translateY(2rem)';
        tile.style.opacity = 0;
      }
    }
  }

  const column1 = [];
  const column2 = [];
  const column3 = [];

  if (projects) {
    for (let i = 0; i < projects.length; i = i + 3) {
      if (i < projects.length) {
        column1.push(projects[i]);
        column2.push(projects[i + 1]);
        column3.push(projects[i + 2]);
      }
    }
  }

  function showLightbox(e) {
    const idsArray = projects.map((project) => project.contentful_id);
    const elementPosition = idsArray.indexOf(e.currentTarget.dataset.key);

    setLightboxIndex(elementPosition);
    setIsLightBoxOpen(true);
  }

  return (
    <Layout location={window.location} setIsMenuOpen={setIsMenuOpen}>
      {!projects && <p>Loading content...</p>}
      {projects && (
        <div className="index-container">
          <section className="content">
            <header className="content-header">
              <h1>Konstantinos Skamagos</h1>
              <p>Photography</p>
            </header>
            <div className="project-thumbs__wrapper">
              <div className="project-thumbs__column">
                <ul className="project-thumbs__list">
                  {column1.map((project) => (
                    <ProjectTile
                      key={project.contentful_id}
                      project={project}
                      showLightbox={showLightbox}
                    />
                  ))}
                </ul>
              </div>
              <div className="project-thumbs__column">
                <ul className="project-thumbs__list">
                  {column2.map(
                    (project) =>
                      typeof project !== 'undefined' && (
                        <ProjectTile
                          key={project.contentful_id}
                          project={project}
                          showLightbox={showLightbox}
                        />
                      )
                  )}
                </ul>
              </div>
              <div className="project-thumbs__column">
                <ul className="project-thumbs__list">
                  {column3.map(
                    (project) =>
                      typeof project !== 'undefined' && (
                        <ProjectTile
                          key={project.contentful_id}
                          project={project}
                          showLightbox={showLightbox}
                        />
                      )
                  )}
                </ul>
              </div>
            </div>
            <Footer />
          </section>
        </div>
      )}
      {isLightBoxOpen && (
        <Lightbox
          projects={projects}
          setIsLightBoxOpen={setIsLightBoxOpen}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      )}
    </Layout>
  );
};

export default RootIndex;

export const pageQuery = graphql`
  query Index01Query {
    allContentfulProject(sort: { fields: publishDate, order: DESC }) {
      nodes {
        contentful_id
        title
        category
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        heroImage {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
        images {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 700
            height: 400
          )
        }
      }
    }
  }
`;
