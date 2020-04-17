import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Menu from "./menu"

const AppBarFilled = () => (
    <AppBar position="static" color="primary">
        <Toolbar>
            <IconButton edge="start"  color="primary" aria-label="menu">
            </IconButton>
            <Typography component="h6" >
                Hikmah Sessions
            </Typography>
            <Menu />
            <Button variant="contained" color="primary">Login</Button>
        </Toolbar>
    </AppBar>
)

export default AppBarFilled