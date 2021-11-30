import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Menu from '../components/Menu';
import ProjectTile from '../components/ProjectTile';
import Categories from '../components/Categories';
import Header from '../components/Header';
import SidebarFooter from '../components/SidebarFooter';
import Lightbox from '../components/Lightbox';
import Footer from '../components/footer';

const RootIndex = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const projects = data.allContentfulProject.nodes;

  const column1 = [];
  const column2 = [];
  const column3 = [];

  for (let i = 0; i < projects.length; i = i + 3) {
    if (i < projects.length) {
      column1.push(projects[i]);
      column2.push(projects[i + 1]);
      column3.push(projects[i + 2]);
    }
  }

  function showLightbox(e) {
    const idsArray = projects.map((project) => project.contentful_id);

    const elementPosition = idsArray.indexOf(e.currentTarget.dataset.key);

    setLightboxIndex(elementPosition);
  }

  return (
    <Layout location={window.location} setIsMenuOpen={setIsMenuOpen}>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="index-container">
        <aside className="sidebar">
          <Header />
          <Categories />
          <SidebarFooter />
        </aside>
        <section className="content">
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
      {isLightBoxOpen && <Lightbox projects={projects} />}
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
