import React from "react" 
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import styles from "./menu.module.css"

const ListLink = props => (
    <li style={ { display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

export default ( { children } ) => (
    <ul id="main-menu" className={styles.mainMenu}>
    <ListLink to="/"><Typography>IMAN SHIELD</Typography></ListLink>
    </ul>
   
)