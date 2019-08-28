import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header.js"
import productPage from "./product-single.module.css"
// import 'bulma/sass/components/tabs.sass'

export default ({ data }) => {
  const product = data.markdownRemark
  let images
  let title
  let price

  if(product.frontmatter.stock_status === "instock"){
    price = <h4 className="text-danger">{product.frontmatter.price} تومان</h4>
  } else {
    price = <h4 className="text-danger">ناموجود</h4>
  }
  if (product.frontmatter.secondName) {
    title = (
      <div className="col px-2 px-md-0 mt-4 mt-md-0">
        <h5>{product.frontmatter.name}</h5>
        <h5>{product.frontmatter.secondName}</h5>
      </div>
    )
  } else {
    title = (
      <div className="col px-2 px-md-0 mt-4 mt-md-0">
        <h5>{product.frontmatter.name}</h5>
      </div>
    )
  }
  if (product.frontmatter.images.length !== 0) {
    product.frontmatter.images.map(img => {
      images = (
        <div className="col-12 col-md-5 col-lg-4">
          <img
            className={`${productPage.image} p-2 mt-1 mb-0 ml-2 shadow`}
            src={img.src}
            alt={img.alt}
          />
        </div>
      )
      return images
    })
  }

  return (
    <div class="container-fluid p-0">
      <Header />
      <div className="container">
        <div className={`${productPage.content} bg-white row`}>
        {product.frontmatter.attributes.length !== 0 && (
          <div className="col-12 col-md-3 order-1 order-md-0 my-3 ml-3 shadow pt-1 pb-3">
          {product.frontmatter.description && (
            <div
            className={`col-auto ml-4 py-2`}
            dangerouslySetInnerHTML={{
              __html: product.frontmatter.description,
            }}
          ></div>
          )}
          <div className="m-2">
            {product.frontmatter.attributes.length !== 0 &&
              product.frontmatter.attributes.map(attr => {
                if(attr.visible){
                  return <div className="my-3">{attr.name}:  {attr.options.join(', ')}</div>
                }
              })}
          </div>
          </div>
        )}
          <div className={`row col shadow py-4 my-3 m-0`}>
            {images}
            <div className="col py-1 px-2">
              {title}
              {price}
              {product.frontmatter.short_description && (
                <div
                  className={`col-auto mt-3 ml-4 p-0 py-2 ${productPage.shortDescription}`}
                  dangerouslySetInnerHTML={{
                    __html: product.frontmatter.short_description,
                  }}
                ></div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        id
        name
        secondName
        slug
        price
        stock_status
        description
        short_description
        images {
          alt
          src
        }
        attributes {
          name
          options
          visible
        }
        categories {
          name
        }
        tags {
          name
        }
      }
    }
  }
`
