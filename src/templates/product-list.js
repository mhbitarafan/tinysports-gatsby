import React from "react"
import { graphql, Link } from "gatsby"
import Header from "../components/header.js"

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

export default class ProductList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const current_page = parseInt(this.props.location.pathname.split('/')[2]);
    const has_prev = this.props.data.allMarkdownRemark.pageInfo.hasPreviousPage;
    const has_next = this.props.data.allMarkdownRemark.pageInfo.hasNextPage;
    return (
        <div class="container-fluid p-0">
        <Header />
        <div class="container p-0">
        <div className="row col-12 m-0">
        {posts.map(({ node }) => {
            let title
            let price
            if(node.frontmatter.stock_status == "instock"){
              price = <h4 className="product-price col-auto w-100 m-0 text-center py-3 align-self-center">{numberWithCommas(node.frontmatter.price)} تومان</h4>
            } else {
              price = <h4 className="product-price col-auto w-100 m-0 text-center py-3 align-self-center">ناموجود</h4>
            }
            if (node.frontmatter.secondName) {
              title = (
                <div className="product-title">
                  <h5 className="col-auto p-2 m-1">
                    {node.frontmatter.name}
                  </h5>
                  <h5 className="col-auto p-2 mx-1 ltr">
                    {node.frontmatter.secondName}
                  </h5>
                </div>
              )
            } else {
              title = (
                <div className="product-title">
                  <h5 className="col-auto p-2 m-1">
                    {node.frontmatter.name}
                  </h5>
                </div>
              )
            }
            return (
                <div
                  key={node.id}
                  className="col-12 col-sm-6 col-lg-4 my-3"
                >
                  <Link to={"product/" + node.frontmatter.slug + "/"}>
                    <div className="card product-card p-0 h-100 d-flex flex-column align-items-start">
                      {title}
                      <div className="d-flex flex-column justify-content-end h-100 w-100">
                        {node.frontmatter.images.length !== 0 ? (
                          <img
                            className="product-image p-0 py-2 mt-1 mb-0"
                            src={node.frontmatter.images[0].src}
                            alt={node.frontmatter.images[0].alt}
                          />
                        ) : (
                          <img
                            className="product-image p-0 pt-3 mt-1 mb-0"
                            src="https://placeimg.com/200/200/nature"
                            alt="placeholder"
                          />
                        )}
                          {price}
                      </div>
                    </div>
                  </Link>
                  </div>
              )
        })}
        </div>
        </div>
        <div className=" w-100 text-center p-2 m-0 pagination-wrapper row justify-content-center align-content-center">
        {has_next && (<Link to={`products/${current_page+1}`} className="btn btn-light rounded p-2 col-auto">
        <span><i class="fa fa-chevron-right ml-2 mr-1 p-0 align-middle" aria-hidden="true"></i></span><span>صفحه بعد </span>
        </Link>)}
            <span className="mx-2 curr_page bg-white rounded text-black p-2 col-auto">صفحه {current_page}</span>
            {has_prev && (<Link to={`products/${current_page-1}`} className="btn btn-light rounded p-2 col-auto">
                <span>صفحه قبل</span><span><i class="fa fa-chevron-left mr-2 ml-1 p-0 align-middle" aria-hidden="true"></i></span>
                </Link>)}
            </div>
        </div>
    )
  }
}

export const productListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: "/(products)/.*\\\\.md$/" } }
    ) {
      pageInfo{
          pageCount
          hasNextPage
          hasPreviousPage
      }  
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            id
            name
            secondName
            slug
            price
            stock_status
            images {
              alt
              src
            }
          }
        }
      }
    }
  }
`