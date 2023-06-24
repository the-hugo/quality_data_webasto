import React from "react";
import './App.css';
import LandingPage from "./components/HomeScreen/LandingPage";
import Dashboard from "./components/DataAnalytics/Dashboard";
import Dashboard2 from "./components/DataAnalytics/Dashboard2";  // <-- Import Dashboard2
import ImageGrid from "./components/HomeScreen/ErrorSubmission/ImageGrid";
import { Switch, Route } from "react-router-dom";


const App = () => {
    return (
        <>
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard2" exact component={Dashboard2} />  {/* <-- Add new route */}
            <Route path="/imagegrid" exact component={ImageGrid} />
        </Switch>
        </>
    )
}

export default App;
