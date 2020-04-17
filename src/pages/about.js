import React from "react"
import Header from "../components/header"
import Layout from "../components/layout"

export default () => (
    <Layout>     
        <Header headerText="About Us" />
        <p>This is about what we do here.</p>
        <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
)