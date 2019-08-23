/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://87.107.186.149:1337',
        contentTypes: [
          'product'
        ],
        queryLimit: 1000
      }
    }
  ]
}
