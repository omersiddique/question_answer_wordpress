const {createFilePath} = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
    // const { createNodeField } = actions
    // if (node.internal.type === `MarkdownRemark`){
    //     const slug = createFilePath({node,getNode,basePath: `pages`})
    //     createNodeField({
    //             node,
    //             name: `slug`,
    //             value: slug
    //         }
    //     )
    // }
    
}

// const makeRequest = (graphql, request) => 
//     new Promise( (resolve,reject) => {
//             // Query for questions to use in creating pages
//             resolve(
//                 graphql(request).then(result => {
//                     if (result.errors){
//                         reject(result.errors)
//                     }
//                     return result
//                 })
//             )
//         }
//     )

    // Implement GATSBY API "createPages". This is called once the data layer os bootstrapped to let plugins create pages from data.
exports.createPages = async ({graphql, actions}) => {
    // const { createPage } = actions
    // const result = await graphql(`
    //     query MyQuery {
    //         allStrapiQuestion {
    //         edges {
    //             node {
    //             strapiId
    //             }
    //         }
    //         }
    //     } 
    // `)
    
    // result.data.allStrapiQuestion.edges.forEach( ({node}) => {
    //     createPage({
    //         path: `/iman-shield/question/${node.strapiId}`,
    //         component: path.resolve(`./src/templates/question.js`),
    //         context:{
    //             // Data passed to context is available in page queries as GraphQL variables
    //             id: node.strapiId,
    //         },
    //     })
    // })
}
    
