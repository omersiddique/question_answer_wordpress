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
import Pagination from "../components/pagination/pagintation"
import getQuestions from "../components/functions/getQuestions"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/Search';
import GetSearch from '../components/functions/search'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
      paddingTop: `2rem`
    },
  },
}));

const IndexPage = ({isLoggedIn, questions, updateQuestions, pagesCount}) => {
    const [showQuestionForm, toggleQuestionForm] = React.useState(false);
    const [searchTerm, updateSearchTerm] = React.useState('');
    //const [searchActivated, updateSearchActivated] = React.useState(false);
    const [loading, changeLoading] = React.useState(false);
    const classes = useStyles();
    //console.log('INEX PAGE COUNT', pagesCount )

    const handleCloseForm = () => {
      toggleQuestionForm(false);
    };
    
    const handleClickOpen = () => {
      toggleQuestionForm(true);
    }

    const updateTerm = (event) => {
      updateSearchTerm(event.target.value);
    }

    const submitSearch = async() => {
      changeLoading(true);
      let data = await GetSearch(searchTerm);
      data = await data.json();
      updateQuestions(data);
      changeLoading(false);
    }

    const nextPage = async (event, value) => {
      //console.log('PAGINATION WIT', value);      
      getQuestions( {page: value} )
      .then(async response => {
        let data = await response.json();
        //console.log('PAGINATION PAGE', data);
        updateQuestions(data);
      });
      window.scrollTo({top:0,left:0,behavior:'smooth'});
    }

    useEffect( () => {
      // get data from Wordpress
      //fetch(`https://hikmahsessions.com/control-panelz/wp-json/iman-shield/v1/questions?page=1`)
      getQuestions({isNewQuestion : false})
      .then(async response => {
        let data = await response.json();
       // console.log('INDEX PAGE', data);
        updateQuestions(data);
      });
    }, [])


    return (
    <Layout>
        {loading ? <Backdrop /> : ''}
        <QuestionForm open={true} />        
          <img src="/images/imanshield.png" id="entry-img" />
          <Grid container>
            <Grid item xs={12}>
              <Typo style={{fontStyle:'italic'}}>Have a doubt about Islam? Chances are there is a good answer out there that you just don't know yet! Post a question and have it answered by the community.</Typo>
              { isLoggedIn ? 
              (<><QuestionForm show={showQuestionForm} hide={handleCloseForm} />      
              <Button style={{float:`right`}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Post Question
              </Button></>) : <Typo style={{fontStyle:'italic'}}>Login to post a question!</Typo>}

              <FormControl className={['searchBox', classes.root].join(' ')}>
              <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                endAdornment={
                  <Button style={{marginTop: `-1rem`}} onClick={submitSearch} color="primary" variant="outlined">Go</Button>
                }
                value={searchTerm}
                onChange={updateTerm}
              />

            </FormControl>
            </Grid> 
              
          </Grid>      
        {          
          (questions) ?
          (questions === 'empty') ? <Typo style={{color: `red`}}>No questions found! Please try again.</Typo> :
          Object.values(questions).map( item => ( 
              <>         
                {(item.post_count) ? questions['post_count'] : <QuestionCard title={item.title} question={item.question} categories={item.categories} update={item.update} key={item.id} questionID={item.id} answers={item.answers} hearts={item.hearts} /> }
              </>        
                )
            ) 
            
           : <Backdrop />
        
          }
         { (pagesCount) ? <Pagination pages={pagesCount} changeFunction={nextPage} /> : '' }
    </Layout>
    )
}

const mapStateToProps = ({isLoggedIn, questions, pages}) => {
  return {isLoggedIn, questions, pagesCount: pages};
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuestions: (newQuestions) => dispatch( {type: 'QUESTIONUPDATE', payload: newQuestions} )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

