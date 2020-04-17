import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from "./appbar"
import Header from "./header"


export default ({ children }) => (
    <React.Fragment>   
        <Header />   
        <AppBar />
        <CssBaseline />
        <Container maxWidth="md" className="marginTop">
            <Typography component="div" style={{ }}>
                { children }
            </Typography>
        </Container>
    </React.Fragment>
)