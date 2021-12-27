import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Footer from '../components/footer';
import Burger from '../components/Burger';
import Lightbox from '../components/Lightbox';

import { showScrollItems } from '../utils/animations';

import * as styles from '../style/project.module.css';

const Header = ({ data, setIsMenuOpen }) => {
  const project = data.contentfulProject;
  const previous = data.previous;
  const next = data.next;

  return (
    <header className={styles.header}>
      <section className={styles.htop}>
        <Link to="/">
          <h1>Skamagos</h1>
        </Link>
        <Burger setIsMenuOpen={setIsMenuOpen} />
      </section>
      <section className={styles.hbottom}>
        <div>
          {previous && (
            <Link
              to={`/${previous.slug}`}
              rel="prev"
              className={styles.navLink}
            >
              ← <span className={styles.navTitle}>{previous.title}</span>{' '}
              <span className={styles.navGen}>Prev</span>
            </Link>
          )}
        </div>
        <p>
          <b>{project.title}</b>
        </p>
        <div>
          {next && (
            <Link to={`/${next.slug}`} rel="next" className={styles.navLink}>
              <span className={styles.navTitle}>{next.title}</span>{' '}
              <span className={styles.navGen}>Next</span> →
            </Link>
          )}
        </div>
      </section>
    </header>
  );
};

const WithLightbox = ({ data }) => {
  const project = data.contentfulProject;
  const images = project.images ? project.images : [];
  const hero = project.heroImage;

  const allImages = [hero, ...images];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const lightboxProps = {
    project,
    allImages,
    setIsLightBoxOpen,
    lightboxIndex,
    setLightboxIndex,
  };

  // Add scrolling event listener
  useEffect(() => {
    showScrollItems();
    document.addEventListener('scroll', showScrollItems);
  }, []);

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
      <Header data={data} setIsMenuOpen={setIsMenuOpen} />
      <GatsbyImage
        data-key={hero.contentful_id}
        className={`scroll-item ${styles.hero}`}
        image={hero.gatsbyImageData}
        alt={project.title}
        title={project.title}
        onClick={showLightbox}
      />
      {images.length < 2 && project?.images ? (
        <div className={styles.singleColumn}>
          <GatsbyImage
            data-key={project.images[0].contentful_id}
            className={`scroll-item ${styles.image}`}
            image={project.images[0].gatsbyImageData}
            alt={project.title}
            title={project.title}
            onClick={showLightbox}
            objectFit="contain"
          />
        </div>
      ) : (
        <div className={styles.images}>
          <div className={styles.column}>
            <ul>
              {project.images?.slice(0, images.length / 2).map((image, i) => (
                <li key={i}>
                  <GatsbyImage
                    data-key={image.contentful_id}
                    className={`scroll-item ${styles.image}`}
                    image={image.gatsbyImageData}
                    alt={project.title}
                    title={project.title}
                    onClick={showLightbox}
                    objectFit="contain"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <ul>
              {project.images?.slice(images.length / 2).map((image, i) => (
                <li key={i}>
                  <GatsbyImage
                    data-key={image.contentful_id}
                    className={`scroll-item ${styles.image}`}
                    image={image.gatsbyImageData}
                    objectFit="contain"
                    title={project.title}
                    alt={project.title}
                    onClick={showLightbox}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Footer />
      {isLightBoxOpen && <Lightbox {...lightboxProps} />}
    </Layout>
  );
};

const WithoutLightbox = ({ data }) => {
  const project = data.contentfulProject;
  const images = project.images ? project.images : [];
  const hero = project.heroImage;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add scrolling event listener
  useEffect(() => {
    showScrollItems();
    document.addEventListener('scroll', showScrollItems);
  }, []);

  return (
    <Layout
      location={window.location}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    >
      <Seo title={project.title} image={project.heroImage.seoSrc.src} />
      <Header data={data} setIsMenuOpen={setIsMenuOpen} />
      <GatsbyImage
        className={`scroll-item ${styles.hero}`}
        image={hero.gatsbyImageData}
        alt={project.title}
        title={project.title}
      />
      {images.length < 2 && project?.images ? (
        <div className={styles.singleColumn}>
          <GatsbyImage
            className={`scroll-item ${styles.image}`}
            image={project.images[0].gatsbyImageData}
            alt={project.title}
            title={project.title}
            objectFit="contain"
          />
        </div>
      ) : (
        <div className={styles.images}>
          <div className={styles.column}>
            <ul>
              {project.images?.slice(0, images.length / 2).map((image, i) => (
                <li key={i}>
                  <GatsbyImage
                    className={`scroll-item ${styles.image}`}
                    image={image.gatsbyImageData}
                    alt={project.title}
                    title={project.title}
                    objectFit="contain"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <ul>
              {project.images?.slice(images.length / 2).map((image, i) => (
                <li key={i}>
                  <GatsbyImage
                    className={`scroll-item ${styles.image}`}
                    image={image.gatsbyImageData}
                    objectFit="contain"
                    title={project.title}
                    alt={project.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Footer />
    </Layout>
  );
};

const ProjectTemplate = ({ data }) => {
  const isWindowDefined = typeof window !== 'undefined';

  if (!isWindowDefined) return;

  if (window.innerWidth > 700) {
    return <WithLightbox data={data} />;
  } else {
    return <WithoutLightbox data={data} />;
  }
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectBySlug(
    $slug: String!
    $previousProjectSlug: String
    $nextProjectSlug: String
  ) {
    contentfulProject(slug: { eq: $slug }) {
      contentful_id
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
        title
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
