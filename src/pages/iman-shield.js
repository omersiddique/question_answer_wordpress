import React, { useState, useEffect} from "react"
import {connect} from "react-redux"
import _ from "lodash";
import Layout from "../components/layout"
import Typo from "@material-ui/core/Typography"
import QuestionCard from "../components/question"
import Backdrop from "../components/backdrop"


const IndexPage = ({questions, updateQuestions}) => {
    
    useEffect( () => {
      // get data from Wordpress
      fetch(`https://hikmahsessions.com/control-panelz/wp-json/wp/v2/question`)
      .then(async response => {
        let data = await response.json();
        updateQuestions(data);
      })
    }, [])

    return (
    <Layout>
        <Typo variant="h3">Iman Shield</Typo>
        <Typo style={{fontStyle:'italic'}}>Post a question and have it answered by the community. Login to post a question!</Typo>      
        {          
          (questions) ?
          Object.values(questions).map( item => (               
              <QuestionCard title={item.title.rendered} question={item.content.rendered} categories={item.categories} update={item.date} key={item.id} />                  
                )
            ) 
           : <Backdrop />
          }
       
    </Layout>
    )
}

const mapStateToProps = ({questions}) => {
  console.log({questions});
  return {questions};
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuestions: (newQuestions) => dispatch( {type: 'QUESTIONUPDATE', payload: newQuestions} )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

