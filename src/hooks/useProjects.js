import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const useProjects = () => {
  const { allContentfulProject } = useStaticQuery(
    graphql`
      query ProjectsQuery {
        allContentfulProject(sort: { fields: featured, order: DESC }) {
          nodes {
            contentful_id
            title
            slug
            heroImage {
              gatsbyImageData
            }
            images {
              gatsbyImageData
            }
          }
        }
      }
    `
  );

  return allContentfulProject;
};

export default useProjects;
