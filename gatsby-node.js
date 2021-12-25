const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const project = path.resolve('./src/templates/project.js');

  const result = await graphql(
    `
      {
        allContentfulProject(sort: { fields: featured, order: DESC }) {
          nodes {
            title
            slug
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful projects`,
      result.errors
    );
    return;
  }

  const projects = result.data.allContentfulProject.nodes;

  if (projects.length > 0) {
    projects.forEach((projectNode, index) => {
      const previousProjectSlug = index === 0 ? null : projects[index - 1].slug;
      const nextProjectSlug =
        index === projects.length - 1 ? null : projects[index + 1].slug;

      createPage({
        path: `/${projectNode.slug}/`,
        component: project,
        context: {
          slug: projectNode.slug,
          previousProjectSlug: previousProjectSlug,
          nextProjectSlug: nextProjectSlug,
        },
      });
    });
  }
};
