import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const ProjectTile = ({ project, setText }) => {
  function hoverTile(e) {
    const tile = e.currentTarget;
    const line = tile.querySelector('.tile-line--fluid');

    var lineRect = line.getBoundingClientRect();

    var center_x = lineRect.left + lineRect.width / 2;
    var center_y = lineRect.top + lineRect.height / 2;

    var mouse_x = e.clientX;
    var mouse_y = e.clientY;

    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = radians * (180 / Math.PI) * -1 + 90;

    line.style.transform = `rotate(${degree}deg)`;

    const lineWidth = Math.hypot(
      e.clientX - lineRect.left,
      e.clientY - lineRect.top
    );

    line.style.width = `${lineWidth}px`;

    setText(`${project.title} \n ${project.slug}`);
  }

  function handleMouseLeave(e) {
    const tile = e.currentTarget;
    const line = tile.querySelector('.tile-line--fluid');

    line.style.width = '0px';
    setText('');
  }

  return (
    <li
      className="project-thumb"
      // onMouseMove={hoverTile}
      // onMouseLeave={handleMouseLeave}
    >
      <GatsbyImage
        image={project.heroImage.gatsbyImageData}
        alt="project thumbnail"
        loading="lazy"
      />
      <div className="tile-line--fluid"></div>
      <div className="tile-overlay">
        <p>{project.title}</p>
      </div>
    </li>
  );
};

export default ProjectTile;
