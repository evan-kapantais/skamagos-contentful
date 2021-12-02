import React, { useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';

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
  const [projects, setProjects] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchedProjects = data.allContentfulProject.nodes;

  const column1 = [];
  const column2 = [];
  const column3 = [];

  useEffect(() => {
    setProjects(fetchedProjects);
    setCategories(
      fetchedProjects
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index)
    );
  }, []);

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
  }

  // Hide the brand on scroll
  useEffect(() => {
    const brandWrapper = document.querySelector('.brand-wrapper');
    const brand = document.querySelector('.wild-brand');

    window.addEventListener('scroll', () => {
      if (typeof window !== 'undefined' && window.scrollY > 100) {
        brand.style.transform = 'translateY(100%)';
        brandWrapper.style.pointerEvents = 'none';
      } else {
        brand.style.transform = 'translateY(0)';
        brandWrapper.style.pointerEvents = 'all';
      }
    });
  }, []);

  return (
    <Layout location={window.location} setIsMenuOpen={setIsMenuOpen}>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="brand-wrapper">
        <Link to="/" className="wild-brand">
          <h1>Skamagos</h1>
        </Link>
      </div>
      {(!projects || !categories) && <p>Loading content...</p>}
      {projects && categories && (
        <div className="index-container">
          <aside className="sidebar">
            <div></div>
            <Categories
              categories={categories}
              filterProjects={filterProjects}
            />
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
      )}
      {<Lightbox projects={projects} />}
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
