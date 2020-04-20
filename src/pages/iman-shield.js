import React, { useState, useEffect} from "react"
import Layout from "../components/layout"
import Typo from "@material-ui/core/Typography"
import QuestionCard from "../components/question"


const IndexPage = () => {
    const [questions, setQuestions] = useState(false);

    useEffect( () => {
      // get data from Wordpress
      fetch(`https://hikmahsessions.com/control-panelz/wp-json/wp/v2/question`)
      .then(async response => {
        let data = await response.json();
        console.log(data);

        setQuestions(data);
      })
    }, [])

    return (
    <Layout>
        <Typo variant="h3">Iman Shield</Typo>
        <Typo style={{fontStyle:'italic'}}>Post a question and have it answered by the community.</Typo>      
        {
          questions ?
            questions.map( item => (               
              <QuestionCard title={item.title.rendered} question={item.content.rendered} categories={item.categories} update={item.date} key={item.id} />                  
                 )
             ) : 'Loading'
          }
       
    </Layout>
    )
}

export default IndexPage

