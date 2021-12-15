import React from 'react';
import { Link, graphql } from 'gatsby';

import Seo from '../components/seo';
import Layout from '../components/layout';
import Hero from '../components/hero';
import * as styles from './blog-post.module.css';

const ProjectTemplate = ({ data }) => {
  const project = data.contentfulProject;
  const previous = data.previous;
  const next = data.next;

  return (
    <Layout location={window.location}>
      <Seo
        title={project.title}
        image={`http:${project.heroImage.resize.src}`}
      />
      <Hero image={project.heroImage?.gatsbyImageData} title={project.title} />
      <div className={styles.container}>
        <span className={styles.meta}>
          <time dateTime={project.rawDate}>{project.publishDate}</time>
        </span>
        <div className={styles.article}>
          {(previous || next) && (
            <nav>
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
        </div>
      </div>
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
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
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
