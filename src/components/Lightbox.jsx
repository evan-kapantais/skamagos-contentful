import React, { useEffect, useState, useRef } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from '../style/lightbox.module.css';

const Lightbox = (props) => {
  const { project, allImages, setIsLightBoxOpen, lightboxIndex } = props;

  const lightboxRef = useRef(null);
  const cursorRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  allImages.forEach(
    (image) => (image.isLandscape = image.resize.aspectRatio > 1)
  );

  // Set incoming index
  useEffect(() => {
    setIndex(lightboxIndex);
  }, [lightboxIndex]);

  // Show index slide
  useEffect(() => {
    const slides = document.querySelectorAll(`.${styles.slide}`);

    for (const slide of slides) {
      slide.style.display = 'none';
    }

    slides[index].style.display = 'flex';
  }, [index]);

  function handleClick(e) {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

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

  function handleTouchStart(e) {
    const point = e.touches[0].clientX;
    setTouchStart(point);
  }

  function handleTouchEnd(e) {
    const point = e.changedTouches[0].clientX;

    const dragMargin = 20;

    const showNext = touchStart > point && touchStart - point > dragMargin;
    const showPrev = point > touchStart && point - touchStart > dragMargin;

    if (showNext) {
      setIndex(index === allImages.length - 1 ? 0 : index + 1);
    }

    if (showPrev) {
      setIndex(index === 0 ? allImages.length - 1 : index - 1);
    }
  }

  return (
    <div
      className={styles.lightbox}
      onClick={handleClick}
      onMouseMove={moveCursor}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {allImages.map((image) => (
        <div
          className={styles.slide}
          key={image.contentful_id}
          id={image.contentful_id}
        >
          <div className={styles.header}>
            <p>
              <span>{project.contentful_id.slice(0, 3)} / </span>
              {project.title}
            </p>
            <button
              type="button"
              aria-label="close button"
              role="button"
              onClick={() => setIsLightBoxOpen(false)}
            >
              ✕
            </button>
          </div>
          <GatsbyImage
            sbyImage
            image={image.gatsbyImageData}
            alt="project image"
            className={`${styles.image} ${
              image.isLandscape ? styles.landscape : styles.portrait
            }`}
          />
        </div>
      ))}
      <p className={styles.cursor} ref={cursorRef}>
        Close
      </p>
    </div>
  );
};

export default Lightbox;
