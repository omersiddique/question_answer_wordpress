import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"

export default () => (
    <Layout>
        <Header headerText="Contact Us" />
        <h3>I'd love to talk! Email me at the address below</h3>
        <p>
            <a href="Mailto:me@example.com">mem@example.com</a>
            <img src="https://source.unsplash.com/random/400x200" alt="" />
        </p>
    </Layout>
)