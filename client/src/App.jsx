import React from "react";
import './App.css';
import LandingPage from "./components/HomeScreen/LandingPage";
import Dashboard from "./components/DataAnalytics/Dashboard";
import ImageGrid from "./components/HomeScreen/ErrorSubmission/ImageGrid";
import { Switch, Route } from "react-router-dom";
import errorPopupRedo from "./components/HomeScreen/ErrorSubmission/errorPopupRedo";

const App = () => {
    return (
        <>
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/imagegrid" exact component={ImageGrid} />
            <Route path="/popup" exact component={errorPopupRedo} />
        </Switch>
        </>

    )
}

export default App;