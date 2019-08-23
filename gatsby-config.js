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
        apiURL: 'http://pc.tinysports.ir:1337',
        contentTypes: [
          'product'
        ],
        queryLimit: 1000
      }
    }
  ]
}
