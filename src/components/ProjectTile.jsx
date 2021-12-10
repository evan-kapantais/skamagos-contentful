import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const ProjectTile = ({ project, showLightbox }) => {
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

  function destroyCircle(e) {
    const circles = e.currentTarget.querySelectorAll('.tile-circle');
    circles.forEach((c) => e.currentTarget.removeChild(c));
  }

  return (
    <li
      className="tile"
      data-key={project.contentful_id}
      onClick={showLightbox}
      // onMouseEnter={createCircle}
      // onMouseMove={moveCircle}
      // onMouseLeave={destroyCircle}
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
