import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {connect} from "react-redux"

import Menu from "./menu"

// accept the const state and the increment dispatch function
const AppBarFilled = ({count, increment}) => (
    <AppBar position="static" color="primary">
        <Toolbar>
            <IconButton edge="start"  color="primary" aria-label="menu">
            </IconButton>
            <Typography component="h6" >
                Hikmah Sessions
            </Typography>
            <Menu />
            <Button variant="contained" color="primary" onClick={increment}>Login {count} times</Button>
        </Toolbar>
    </AppBar>
)

// destructure count object from state as it may have other objects in the future
const mapStateToProps = ( { count } ) => {
    return { count }
}

// dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
// action creator to dispatch a change to the state
const mapDispatchToProps = dispatch => {
    return { increment: () => dispatch({ type: `INCREMENT`, payload: 5 }) }
}

// here we use the connect function to name two functions one for handling the received state and one provide the dispatch function
export default  connect(mapStateToProps, mapDispatchToProps)(AppBarFilled)