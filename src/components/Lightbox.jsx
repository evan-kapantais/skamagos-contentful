import React, { useEffect, useRef } from 'react';
import * as styles from './lightbox.module.css';
import { GatsbyImage } from 'gatsby-plugin-image';

const Lightbox = (props) => {
  const { projects, setIsLightBoxOpen, lightboxIndex, setLightboxIndex } =
    props;

  const cursorRef = useRef(null);

  function handleClick(e) {
    const isTargetImage = e.target.className !== styles.lightbox;
    const nextArea = e.clientX > window.innerWidth / 2;

    isTargetImage && setIsLightBoxOpen(false);

    nextArea &&
      setLightboxIndex(
        lightboxIndex === projects.length - 1 ? 0 : lightboxIndex + 1
      );

    !nextArea &&
      setLightboxIndex(
        lightboxIndex === 0 ? projects.length - 1 : lightboxIndex - 1
      );
  }

  function moveCursor(e) {
    const isTargetImage = e.target.className !== styles.lightbox;
    const nextArea = e.clientX > window.innerWidth / 2;

    const textRect = cursorRef.current.getBoundingClientRect();

    cursorRef.current.style.opacity = 1;
    cursorRef.current.style.transform = `translate(${
      e.clientX - textRect.width / 2
    }px, ${e.clientY - textRect.height}px)`;

    if (isTargetImage) {
      cursorRef.current.textContent = '✕ Close';
    } else {
      if (nextArea) cursorRef.current.textContent = 'Next →';
      if (!nextArea) cursorRef.current.textContent = '← Previous';
    }
  }

  return (
    <div
      className={styles.lightbox}
      onClick={handleClick}
      onMouseMove={moveCursor}
    >
      <GatsbyImage
        image={projects[lightboxIndex].heroImage.gatsbyImageData}
        alt="project image"
        className={styles.image}
      />
      <p className={styles.cursor} ref={cursorRef}>
        Close
      </p>
    </div>
  );
};

export default Lightbox;
