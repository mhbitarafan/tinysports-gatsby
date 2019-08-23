import React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
export default ({data}) => (
  <div style={{ color: `purple` }}>
    <Link to="/contact/">Contact</Link>
    <Header headerText="Hello Gatsby!" />
    <p>Gatsby is awesome</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
    <ul>
    {data.allStrapiProduct.edges.map(document => (
        <li key={document.node.id}>
            <h2>{document.node.title}</h2>
        </li>
    ))}
    </ul>
  </div>
)

export const pageQuery = graphql`
    query indexQuery {
        allStrapiProduct {
            edges {
                node {
                    id
                    title
                }
            }
        }
    }
`