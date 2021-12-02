import React, { useEffect, useRef } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const ProjectTile = ({ project, showLightbox }) => {
  const myRef = useRef();

  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, []);

  function createCircle(e) {
    const tile = e.currentTarget;
    const circle = document.createElement('div');
    const text = document.createElement('p');
    text.textContent = 'View More';
    circle.append(text);

    circle.className = 'tile-circle';

    tile.append(circle);
  }

  function moveCircle(e) {
    const circle = e.currentTarget.querySelector('.tile-circle');
    const title = e.currentTarget.querySelector('p');

    const tileRect = e.currentTarget.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();

    const x = e.clientX - tileRect.left - circleRect.width / 2;
    const y = e.clientY - tileRect.top - circleRect.height / 2;

    const cursorTransform = `translate(${x}px, ${y}px)`;

    e.target === title
      ? (circle.querySelector('p').style.opacity = 0)
      : (circle.querySelector('p').style.opacity = 1);

    if (e.target === title) {
      circle.style.width = `${titleRect.width + 20}px`;
      circle.style.height = `${titleRect.width + 20}px`;
    } else {
      circle.style.width = `100px`;
      circle.style.height = `100px`;
    }

    circle.style.transform = cursorTransform;
    circle.style.opacity = 1;
  }

  function hideCircle(e) {
    const circles = e.currentTarget.querySelectorAll('.tile-circle');
    circles.forEach((c) => e.currentTarget.removeChild(c));
  }

  function clickTile(e) {
    const tile = e.currentTarget;

    tile.style.zIndex = 99;

    const currentX = tile.getBoundingClientRect().left;
    const currentY = tile.getBoundingClientRect().top;

    const targetX =
      window.innerWidth / 2 - tile.getBoundingClientRect().width / 2;
    const targetY =
      window.innerHeight / 2 - tile.getBoundingClientRect().height / 2;

    const translateX = `${targetX - currentX}px`;
    const translateY = `${targetY - currentY}px`;

    tile.style.transform = `translate(${translateX}, ${translateY})`;
  }

  return (
    <li
      ref={myRef}
      className="tile"
      data-key={project.contentful_id}
      // onClick={clickTile}
      onMouseEnter={createCircle}
      onMouseMove={moveCircle}
      onMouseLeave={hideCircle}
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
