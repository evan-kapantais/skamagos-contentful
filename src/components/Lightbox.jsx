import React, { useEffect, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from '../style/lightbox.module.css';

import chevronLeft from '../images/chevron-left.svg';
import chevronRight from '../images/chevron-right.svg';

const Lightbox = (props) => {
  const { project, allImages, setIsLightBoxOpen, lightboxIndex } = props;

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

  function increment() {
    setIndex(index === allImages.length - 1 ? 0 : index + 1);
  }

  function decrement() {
    setIndex(index === 0 ? allImages.length - 1 : index - 1);
  }

  function handleClick(e) {
    const tag = e.target.tagName;

    (tag === 'MAIN' || tag === 'DIV') && setIsLightBoxOpen(false);
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
      increment();
    }

    if (showPrev) {
      decrement();
    }
  }

  return (
    <div
      className={styles.lightbox}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {allImages.map((image) => (
        <div
          className={styles.slide}
          key={image.contentful_id}
          id={image.contentful_id}
        >
          <header>
            <div className={styles.header}>
              <p>
                <span>{project.contentful_id.slice(0, 3)} / </span>
                {project.title}
              </p>
              <button
                type="button"
                aria-label="close button"
                onClick={() => setIsLightBoxOpen(false)}
              >
                ✕
              </button>
            </div>
          </header>
          <main>
            <button
              type="button"
              aria-label="previous project"
              className={styles.arrow}
              onClick={decrement}
            >
              <img src={chevronLeft} alt="left arrow" />
            </button>
            <GatsbyImage
              image={image.gatsbyImageData}
              alt="project image"
              className={`${styles.image} ${
                image.isLandscape ? styles.landscape : styles.portrait
              }`}
              objectFit="contain"
            />
            <button
              type="button"
              aria-label="next project"
              className={styles.arrow}
              onClick={increment}
            >
              <img src={chevronRight} alt="left arrow" />
            </button>
          </main>
        </div>
      ))}
    </div>
  );
};

export default Lightbox;
