import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from '../templates/project.module.css';

const ProjectImage = ({ image, showLightbox }) => {
  return (
    <GatsbyImage
      data-key={image.contentful_Id}
      key={image.contentful_Id}
      className={styles.image}
      image={image?.gatsbyImageData}
      alt={image.title}
      title={image.title}
      onClick={showLightbox}
      objectFit="contain"
    />
  );
};

export default ProjectImage;
