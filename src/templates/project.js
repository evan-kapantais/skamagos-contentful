import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Lightbox from '../components/Lightbox';
import Footer from '../components/footer';

import * as styles from './project.module.css';

const Header = ({ data }) => {
  const project = data.contentfulProject;
  const previous = data.previous;
  const next = data.next;

  return (
    <header className="project-header">
      <h1>{project.title}</h1>
      <div>
        {previous && (
          <Link to={`/${previous.slug}`} rel="prev" className={styles.navLink}>
            ← {previous.title}
          </Link>
        )}
        <span> | </span>
        {next && (
          <Link to={`/${next.slug}`} rel="next" className={styles.navLink}>
            {next.title} →
          </Link>
        )}
      </div>
    </header>
  );
};

const ProjectTemplate = ({ data }) => {
  const project = data.contentfulProject;
  const images = project.images ? project.images : [];
  const hero = project.heroImage;

  const allImages = [hero, ...images];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const lightboxProps = {
    allImages,
    setIsLightBoxOpen,
    lightboxIndex,
    setLightboxIndex,
  };

  // Add scrolling event listener
  useEffect(() => {
    document.addEventListener('scroll', showImages);
  }, []);

  // Animate hero image
  useEffect(() => {
    const hero = document.querySelector(`.${styles.hero}`);
    setTimeout(() => {});
    hero.style.opacity = 1;
  }, []);

  // Animate tiles on scroll
  function showImages(e) {
    const imgs = document.querySelectorAll(`.${styles.image}`);

    for (const img of imgs) {
      const offsetTop = img.getBoundingClientRect().top;

      if (offsetTop < window.innerHeight) {
        img.style.transform = 'translateY(0)';
        img.style.opacity = 1;
      } else {
        img.style.transform = 'translateY(2rem)';
        img.style.opacity = 0;
      }
    }
  }

  // Control document overflow
  useEffect(() => {
    if (isLightBoxOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLightBoxOpen]);

  function showLightbox(e) {
    const idsArray = allImages.map((image) => image.contentful_id);
    const elementPosition = idsArray.indexOf(e.currentTarget.dataset.key);
    setLightboxIndex(elementPosition);
    setIsLightBoxOpen(true);
  }

  return (
    <Layout
      location={window.location}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    >
      <Seo title={project.title} image={project.heroImage.seoSrc.src} />
      <Header data={data} />
      <GatsbyImage
        className={styles.hero}
        title={project.title}
        alt={project.title}
        image={hero.gatsbyImageData}
        onClick={showLightbox}
        data-key={hero.contentful_id}
      />
      {images.length < 2 ? (
        <div className={styles.singleColumn}>
          {project.images?.map((image, i) => (
            <GatsbyImage
              className={styles.singleImage}
              image={image?.gatsbyImageData}
              data-key={image.contentful_Id}
              key={i}
              objectFit="contain"
              title={project.title}
              alt={project.title}
              onClick={showLightbox}
            />
          ))}
        </div>
      ) : (
        <div className={styles.images}>
          <div className={styles.column}>
            {project.images?.slice(0, images.length / 2).map((image, i) => (
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
          <div className={styles.column}>
            {project.images?.slice(images.length / 2).map((image, i) => (
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
        </div>
      )}
      <Footer />
      {isLightBoxOpen && <Lightbox {...lightboxProps} />}
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
        contentful_id
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        resize: resize {
          src
          aspectRatio
        }
        seoSrc: resize(height: 630, width: 1200) {
          src
        }
      }
      images {
        contentful_id
        gatsbyImageData(placeholder: BLURRED)
        resize {
          aspectRatio
        }
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
