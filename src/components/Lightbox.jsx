import React, { useEffect, useRef } from 'react';
import * as styles from './lightbox.module.css';
import { GatsbyImage } from 'gatsby-plugin-image';

const Lightbox = (props) => {
  const { images, setIsLightBoxOpen, lightboxIndex, setLightboxIndex } = props;

  const cursorRef = useRef(null);

  function handleClick(e) {
    if (images.length === 1) {
      return setIsLightBoxOpen(false);
    }

    const isTargetImage = e.target.className !== styles.lightbox;
    const nextArea = e.clientX > window.innerWidth / 2;

    isTargetImage && setIsLightBoxOpen(false);

    nextArea &&
      setLightboxIndex(
        lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1
      );

    !nextArea &&
      setLightboxIndex(
        lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1
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

    if (images.length === 1) return (cursorRef.current.textContent = '✕ Close');

    if (isTargetImage) return (cursorRef.current.textContent = '✕ Close');
    if (nextArea) cursorRef.current.textContent = 'Next →';
    if (!nextArea) cursorRef.current.textContent = '← Previous';
  }

  return (
    <div
      className={styles.lightbox}
      onClick={handleClick}
      onMouseMove={moveCursor}
    >
      <GatsbyImage
        image={images[lightboxIndex].gatsbyImageData}
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
