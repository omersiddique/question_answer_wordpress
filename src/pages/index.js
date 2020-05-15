import React, { useEffect} from "react"
import {connect} from "react-redux"
import Layout from "../components/layout"
import Typo from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import QuestionCard from "../components/question"
import Backdrop from "../components/backdrop"
import QuestionForm from "../components/question-form"
import "../components/iman-shield.css"


const IndexPage = ({isLoggedIn, questions, updateQuestions}) => {
    const [showQuestionForm, toggleQuestionForm] = React.useState(false);

    const handleCloseForm = () => {
      toggleQuestionForm(false);
    };
    
    const handleClickOpen = () => {
      toggleQuestionForm(true);
    }

    useEffect( () => {
      // get data from Wordpress
      fetch(`https://hikmahsessions.com/control-panelz/wp-json/iman-shield/v1/questions`)
      .then(async response => {
        let data = await response.json();
        updateQuestions([data]);
      })
    }, [])

    return (
    <Layout>
        <QuestionForm open={true} />        
          <Typo variant="h3">Iman Shield</Typo>
          <Grid container>
            <Grid item xs={6}>
              <Typo style={{fontStyle:'italic'}}>Post a question and have it answered by the community.</Typo>
            </Grid> 
            <Grid item xs={6}>
              { isLoggedIn ? 
              (<><QuestionForm show={showQuestionForm} hide={handleCloseForm} />      
              <Button style={{float:`right`}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Post Question
              </Button></>) : <Typo style={{textAlign:`right`}}>Login to post a question!</Typo>}
            </Grid>
          </Grid>      
        {          
          (questions) ?
          questions[0].map( item => ( 
              <>         
                <QuestionCard title={item.title} question={item.question} categories={item.categories} update={item.date} key={item.id} questionID={item.id} answers={item.answers} /> 
              </>        
                )
            ) 
           
           : <Backdrop />
        
          }
    </Layout>
    )
}

const mapStateToProps = ({isLoggedIn, questions}) => {
  return {isLoggedIn, questions};
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuestions: (newQuestions) => dispatch( {type: 'QUESTIONUPDATE', payload: newQuestions} )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

