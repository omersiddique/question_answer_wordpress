import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import LoginForm from "./login-form"

// import SimpleDialog from "./login-form"
import Menu from "./menu"

// accept the const state and the increment dispatch function
const AppBarFilled = () => (
    <AppBar position="static" color="primary">
        <Toolbar>
            <IconButton edge="start"  color="primary" aria-label="menu">
            </IconButton>
            <Typography component="h6" >
                
            </Typography>
            <Menu />
            <LoginForm  />
        </Toolbar>
    
    </AppBar>
)

const handleClose = () =>{
    console.log('Howdy');
}



// here we use the connect function to name two functions one for handling the received state and one provide the dispatch function
export default AppBarFilled