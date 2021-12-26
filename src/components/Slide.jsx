import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import * as styles from '../style/lightbox.module.css';

const Slide = ({ project, setIsLightBoxOpen }) => {
  const width = project.heroImage.gatsbyImageData.width;
  const height = project.heroImage.gatsbyImageData.height;

  return (
    <div className={styles.slide}>
      <button type="button" onClick={() => setIsLightBoxOpen(false)}>
        Close
      </button>
      <div className={styles.slide}>
        <figure>
          <GatsbyImage
            alt="project hero image"
            image={project.heroImage.gatsbyImageData}
          />
          <figcaption className={styles.caption}>{project.title}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Slide;
