import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const ProjectTile = ({ project, showLightbox }) => {
  return (
    <li
      className="tile"
      data-key={project.contentful_id}
      onClick={showLightbox}
    >
      <GatsbyImage
        image={project.heroImage.gatsbyImageData}
        alt="project thumbnail"
        loading="lazy"
      />
      <div className="tile-overlay">
        <p>{project.title}</p>
      </div>
    </li>
  );
};

export default ProjectTile;
