import React, { useState } from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import Menu from '../components/Menu';
import ProjectTile from '../components/ProjectTile';
import Navigation from '../components/navigation';

const RootIndex = ({ data }) => {
  const projects = data.allContentfulProject.nodes;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState('');

  return (
    <Layout location={window.location} setIsMenuOpen={setIsMenuOpen}>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="index-container">
        <Navigation />
        <div className="tiles-wrapper">
          <aside>
            <p>{text}</p>
          </aside>
          <div className="project-thumbs__wrapper">
            <div className="project-thumbs__column">
              <ul className="project-thumbs__list">
                {projects.slice(0, projects.length / 3).map((project) => (
                  <ProjectTile project={project} setText={setText} />
                ))}
              </ul>
            </div>
            <div className="project-thumbs__column">
              <ul className="project-thumbs__list">
                {projects
                  .slice(projects.length / 3, (projects.length / 3) * 2)
                  .map((project) => (
                    <ProjectTile project={project} setText={setText} />
                  ))}
              </ul>
            </div>
            <div className="project-thumbs__column">
              <ul className="project-thumbs__list">
                {projects.slice((projects.length / 3) * 2).map((project) => (
                  <ProjectTile project={project} setText={setText} />
                ))}
              </ul>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default RootIndex;

export const pageQuery = graphql`
  query Index01Query {
    allContentfulProject(sort: { fields: [publishDate], order: DESC }) {
      nodes {
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
