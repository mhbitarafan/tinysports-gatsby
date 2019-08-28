const path = require(`path`)
const {
    createFilePath
} = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({
    node,
    getNode,
    actions
}) => {
    const {
        createNodeField
    } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({
            node,
            getNode,
            basePath: `pages`
        })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = async ({
    graphql,
    actions
}) => {
    const {
        createPage
    } = actions
    const result = await graphql(`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            slug
          }
        }
      }
    }
  }
  `)

  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 18
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/products/${i + 1}`,
      component: path.resolve("./src/templates/product-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

    result.data.allMarkdownRemark.edges.forEach(({
        node
    }) => {
        if (node.fileAbsolutePath.match(/products/g)){
            createPage({
                path: '/product/' + node.frontmatter.slug + '/',
                component: path.resolve(`./src/templates/product-single.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.frontmatter.slug,
                },
            })
        }
    })
}