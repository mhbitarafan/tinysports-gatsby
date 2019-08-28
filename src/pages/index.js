import React from "react"
import { graphql, Link } from "gatsby"
import BottomScrollListener from 'react-bottom-scroll-listener';
import Header from "../components/header.js"

function numberWithCommas(x) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default ({ data }) => {
  function a(){
    console.log("hi");
  }
  return (
    <div class="container-fluid p-0">
      <Header />
      <BottomScrollListener onBottom={a} />
      <div className="container">
        <div class="row">
        <div className="col-3 mt-3 p-0 pl-2">
          <div className="position-sticky d-flex flex-column p-0" style={{top: '152px'}}>
            <div>
            <div className="row sidebar-default">
              <div className="col-12 py-2 mb-2">برندها</div>
              <div className="col-12 col-md-6 brand-link"><Link to="" className="">دونیک</Link></div>
              <div className="col-12 col-md-6 brand-link"><Link to="" className="">باترفلای</Link></div>
              <div className="col-12 col-md-6 brand-link"><Link to="" className="">کورنلیو</Link></div>
              <div className="col-12 col-md-6 brand-link"><Link to="" className="">دبل هپینس</Link></div>
              </div>  
              </div>
              <div className="row mt-3 sidebar-default">
              <div className="col-12 py-2 mb-2">قیمت</div>
                <div className="col-12 p-2"><input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="حداقل قیمت" /></div>
                <div className="col-12 p-2"><input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="حداکثر قیمت" /></div>
              </div> 
          </div>
        </div>
        <div className="row col-9 m-0">
          {data.allMarkdownRemark.edges.map(document => {
            let title
            let price
            if(document.node.frontmatter.stock_status == "instock"){
              price = <h4 className="product-price col-auto w-100 m-0 text-center py-3 align-self-center">{document.node.frontmatter.price} تومان</h4>
            } else {
              price = <h4 className="product-price col-auto w-100 m-0 text-center py-3 align-self-center">ناموجود</h4>
            }
            if (document.node.frontmatter.secondName) {
              title = (
                <div className="product-title">
                  <h5 className="col-auto p-2 m-1">
                    {document.node.frontmatter.name}
                  </h5>
                  <h5 className="col-auto p-2 mx-1 ltr">
                    {document.node.frontmatter.secondName}
                  </h5>
                </div>
              )
            } else {
              title = (
                <div className="product-title">
                  <h5 className="col-auto p-2 m-1">
                    {document.node.frontmatter.name}
                  </h5>
                </div>
              )
            }
            return (
              <div
                key={document.node.id}
                className="col-12 col-sm-6 col-lg-4 my-3"
              >
                <Link to={"product/" + document.node.frontmatter.slug + "/"}>
                  <div className="card product-card p-0 h-100 d-flex flex-column align-items-start">
                    {title}
                    <div className="d-flex flex-column justify-content-end h-100 w-100">
                      {document.node.frontmatter.images.length !== 0 ? (
                        <img
                          className="product-image p-0 py-2 mt-1 mb-0"
                          src={document.node.frontmatter.images[0].src}
                          alt={document.node.frontmatter.images[0].alt}
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
          <div className=" w-100 text-center p-2 mb-4">
            <Link to="products/2" className="shadow btn btn-outline-danger p-2 mb-4">محصولات بیشتر</Link>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query Products {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(products)/.*\\\\.md$/" } }
      limit: 18
    ) {
      totalCount
      edges {
        node {
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
