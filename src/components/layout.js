import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import AppBar from "./appbar"
import Header from "./header"
import QuestionMenu from "./question-menu"
import Footer from "./footer"

const mapStateToProps = ({isLoggedIn}) =>{
    return {isLoggedIn}
}

export default connect(mapStateToProps)( ({ isLoggedIn,children }) => (
    <React.Fragment>   
        <Header />   
        <AppBar />
        <CssBaseline />
        <Container maxWidth="md" className="marginTop">    
        { isLoggedIn ? <QuestionMenu /> : '' }     
            <Typography component="div" style={{ }}>
                { children }
            </Typography>            
        </Container>
        <Footer />
    </React.Fragment>
))