import React from "react"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"


export default ({data}) => {
    return (
    <Layout>
        <div>
        <h1>Amazing Pandas Eating Things</h1>
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
            <img 
                src ="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
                alt="Group of pandas eating bamboo"
            />
            {data.allMarkdownRemark.edges.map( ({node})  => (
                <div key={node.id}>
                  <Link
                    to={node.fields.slug}                   
                  >
                      <h3>
                              {node.frontmatter.title}{" "}
                              <span>
                                  — {node.frontmatter.date}
                              </span>
                      </h3>
                    </Link>
                    <p>{node.excerpt}</p>
                </div>
            ))}
        </div>
    </Layout>
)
}

export const query = graphql`
  query {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
            }
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
`