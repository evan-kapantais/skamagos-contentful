import React, { useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Menu from '../components/Menu';
import ProjectTile from '../components/ProjectTile';
import Categories from '../components/Categories';
import SidebarFooter from '../components/SidebarFooter';
import Lightbox from '../components/Lightbox';
import Footer from '../components/footer';
import Sidebar from '../components/Sidebar';

const RootIndex = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [projects, setProjects] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchedProjects = data.allContentfulProject.nodes;

  // Set projects and categories
  useEffect(() => {
    setProjects(fetchedProjects);
    setCategories(
      fetchedProjects
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index)
    );
  }, []);

  // Control document overflow
  useEffect(() => {
    if (isLightBoxOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLightBoxOpen]);

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

  function filterProjects(category) {
    if (category === 'All') return setProjects(fetchedProjects);

    setProjects([
      ...fetchedProjects.filter((project) => project.category === category),
    ]);
  }

  function showLightbox(e) {
    const idsArray = projects.map((project) => project.contentful_id);
    const elementPosition = idsArray.indexOf(e.currentTarget.dataset.key);

    setLightboxIndex(elementPosition);
    setIsLightBoxOpen(true);
  }

  return (
    <Layout location={window.location} setIsMenuOpen={setIsMenuOpen}>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {(!projects || !categories) && <p>Loading content...</p>}
      {projects && categories && (
        <div className="index-container">
          <Sidebar />
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
