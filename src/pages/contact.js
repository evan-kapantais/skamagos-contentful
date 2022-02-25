import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Seo from '../components/seo';
import Social from '../components/Social';

import * as styles from '../style/contact.module.css';

const ContactPage = ({ data }) => {
  return (
    <div className={styles.page}>
      <Seo title="Contact" />
      <div className={styles.container}>
        <Link className={styles.home} to="/">
          <span className={styles.arrow}>⃪</span> Home
        </Link>
        <section className={styles.right}>
          <div>
            <h2>Get In Touch</h2>
            <div className={styles.via}>
              <p>Email me</p>
              <a href="mailto:konstantinos.skam@gmail.com">
                konstantinos.skam@gmail.com
              </a>
            </div>
            <div className={styles.via}>
              <p>Call me</p>
              <a href="tel:+30 693 184 4529">+30 693 184 4529</a>
            </div>
            <div className={styles.via}>
              <p>Follow me</p>
              <Social />
            </div>
          </div>
        </section>
        <section className={styles.left}>
          <GatsbyImage
            image={data.contentfulContactImage.image.gatsbyImageData}
            alt="Artemis and the dog"
            className={styles.image}
          />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;

export const ContactImageQuery = graphql`
  query ImageQuery {
    contentfulContactImage {
      image {
        gatsbyImageData
      }
    }
  }
`;
