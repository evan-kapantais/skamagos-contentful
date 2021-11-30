import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import * as styles from './lightbox.module.css';
import { graphql, useStaticQuery } from 'gatsby';

const Lightbox = ({ projects }) => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allContentfulProject(sort: { fields: publishDate, order: DESC }) {
        nodes {
          contentful_id
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          heroImage {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
          images {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              width: 700
              height: 400
            )
          }
        }
      }
    }
  `);

  return (
    <div className={styles.lightbox}>
      <div className={styles.slide}>
        <div className={styles.slideText}>
          <h1>{projects[0].title}</h1>
        </div>
        <GatsbyImage
          alt="project hero image"
          image={projects[0].heroImage.gatsbyImageData}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Lightbox;
