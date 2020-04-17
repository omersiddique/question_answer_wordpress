/*
Hold Elements
<Link to={`/iman-shield/question/${document.node.strapiId}`}>{document.node.question}</Link>


*/

  {/* {data.allStrapiQuestion.edges.map( document => (               
                    <QuestionCard question={document.node.question} categories={document.node.categories} update={document.node.updated_at} key={document.node.strapiId} />                  
                )
            )} */}

            <h3>{data.strapiQuestion.question}</h3>
            <h6>{data.strapiQuestion.updated_at}</h6>


// export const pageQuery = graphql`
// query questionQuery{
//     allStrapiQuestion {
//       edges {
//         node {
//           question
//           strapiId
//           is_approved
//           updated_at(fromNow: true)
//           categories{
//             name
//             id
//           }
//         }
//       }
//     }
//   }  
// `