import React from "react";
import './App.css';
import LandingPage from "./components/HomeScreen/LandingPage.jsx";
import Dashboard from "./components/DataAnalytics/Dashboard.jsx";
import { Switch, Route } from "react-router-dom";


const App = () => {
    return (
        <>
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
        </>
    )
}

export default App;
