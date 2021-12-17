import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Hero from '../components/hero';
import Lightbox from '../components/Lightbox';

import * as styles from './project.module.css';

const ProjectTemplate = ({ data }) => {
  const project = data.contentfulProject;
  const previous = data.previous;
  const next = data.next;
  const images = project.images;

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Control document overflow
  useEffect(() => {
    if (isLightBoxOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLightBoxOpen]);

  function showLightbox(e) {
    const idsArray = images.map((image) => image.contentful_id);
    const elementPosition = idsArray.indexOf(e.currentTarget.dataset.key);
    setLightboxIndex(elementPosition);
    setIsLightBoxOpen(true);
  }

  return (
    <Layout location={window.location}>
      <Seo
        title={project.title}
        image={`http:${project.heroImage.resize.src}`}
      />
      <header className="project-header">
        <h1>{project.title}</h1>
        <time dateTime={project.rawDate}>{project.publishDate}</time>
      </header>
      <Hero image={project.heroImage?.gatsbyImageData} title={project.title} />
      <div className={styles.images}>
        {project.images?.map((image, i) => (
          <GatsbyImage
            className={styles.image}
            data-key={image.contentful_id}
            key={i}
            image={image?.gatsbyImageData}
            objectFit="contain"
            title={project.title}
            alt={project.title}
            onClick={showLightbox}
          />
        ))}
      </div>
      {(previous || next) && (
        <nav className={styles.navigation}>
          <ul className={styles.articleNavigation}>
            {previous && (
              <li>
                <Link to={`/${previous.slug}`} rel="prev">
                  ← {previous.title}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link to={`/${next.slug}`} rel="next">
                  {next.title} →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
      {isLightBoxOpen && (
        <Lightbox
          images={images}
          setIsLightBoxOpen={setIsLightBoxOpen}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      )}
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectBySlug(
    $slug: String!
    $previousProjectSlug: String
    $nextProjectSlug: String
  ) {
    contentfulProject(slug: { eq: $slug }) {
      slug
      title
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        resize(height: 630, width: 1200) {
          src
        }
      }
      images {
        contentful_id
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    previous: contentfulProject(slug: { eq: $previousProjectSlug }) {
      slug
      title
    }
    next: contentfulProject(slug: { eq: $nextProjectSlug }) {
      slug
      title
    }
  }
`;
