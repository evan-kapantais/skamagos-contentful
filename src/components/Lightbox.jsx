import React, { useEffect, useState, useRef } from 'react';
import * as styles from './lightbox.module.css';
import { GatsbyImage } from 'gatsby-plugin-image';

const Lightbox = (props) => {
  const { allImages, setIsLightBoxOpen, lightboxIndex } = props;

  const cursorRef = useRef(null);

  const [index, setIndex] = useState(0);

  allImages.forEach(
    (image) => (image.isLandscape = image.resize.aspectRatio > 1)
  );

  // Set incoming index
  useEffect(() => {
    setIndex(lightboxIndex);
  }, []);

  // Show index slide
  useEffect(() => {
    const slides = document.querySelectorAll(`.${styles.slide}`);

    for (const slide of slides) {
      slide.style.display = 'none';
    }

    slides[index].style.display = 'flex';
  }, [index]);

  function handleClick(e) {
    if (allImages.length === 1) {
      return setIsLightBoxOpen(false);
    }

    const isTargetImage = e.target.className !== styles.slide;
    const nextArea = e.clientX > window.innerWidth / 2;

    isTargetImage && setIsLightBoxOpen(false);

    nextArea && setIndex(index === allImages.length - 1 ? 0 : index + 1);

    !nextArea && setIndex(index === 0 ? allImages.length - 1 : index - 1);
  }

  function moveCursor(e) {
    const isTargetImage = e.target.className !== styles.slide;
    const nextArea = e.clientX > window.innerWidth / 2;

    const textRect = cursorRef.current.getBoundingClientRect();

    cursorRef.current.style.opacity = 1;
    cursorRef.current.style.transform = `translate(${
      e.clientX - textRect.width / 2
    }px, ${e.clientY - textRect.height}px)`;

    if (allImages.length === 1)
      return (cursorRef.current.textContent = '✕ Close');

    if (isTargetImage) return (cursorRef.current.textContent = '✕ Close');
    if (nextArea) cursorRef.current.textContent = 'Next →';
    if (!nextArea) cursorRef.current.textContent = '← Previous';
  }

  function handleKeyDown(e) {
    console.log(e.key);

    if (e.key === 'ArrowRight') {
      setIndex(index === allImages.length - 1 ? 0 : index + 1);
    }

    if (e.key === 'ArrowLeft') {
      setIndex(index === 0 ? allImages.length - 1 : index - 1);
    }
  }

  return (
    <div
      className={styles.lightbox}
      onClick={handleClick}
      onMouseMove={moveCursor}
      onKeyDown={handleKeyDown}
    >
      {allImages.map((image, i) => (
        <div
          className={styles.slide}
          key={image.contentful_id}
          id={image.contentful_id}
          tabIndex={i}
        >
          {image.isLandscape ? (
            <GatsbyImage
              image={image.gatsbyImageData}
              alt="project image"
              className={`${styles.image} ${styles.landscape}`}
            />
          ) : (
            <GatsbyImage
              image={image.gatsbyImageData}
              alt="project image"
              className={`${styles.image} ${styles.portrait}`}
            />
          )}
        </div>
      ))}
      <p className={styles.cursor} ref={cursorRef}>
        Close
      </p>
    </div>
  );
};

export default Lightbox;
