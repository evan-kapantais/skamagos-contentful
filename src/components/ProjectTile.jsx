import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './tile.module.css';
import { Link } from 'gatsby';

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
        <p className={styles.title}>{project.title}</p>
      </Link>
    </li>
  );
};

export default ProjectTile;
