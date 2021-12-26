import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import * as styles from '../style/tile.module.css';

const ProjectTile = ({ project }) => {
  return (
    <li className={`tile ${styles.tile}`} data-key={project.contentful_id}>
      <Link to={`/${project.slug}`}>
        <GatsbyImage
          image={project.heroImage.gatsbyImageData}
          alt="project thumbnail"
          loading="lazy"
          className={styles.imageWrapper}
        />
        <p>
          <span>{project.contentful_id.slice(0, 3)} /</span> {project.title}
        </p>
      </Link>
    </li>
  );
};

export default ProjectTile;
