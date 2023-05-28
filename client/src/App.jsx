import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Dashboard from "../src/components/DataAnalytics/Dashboard.jsx"

const App = () => {
    return (
        <div>
            <p>Hi</p>
            <BrowserRouter>
            <Link to="/comps">Data Analytics</Link>
                <Switch>
                    <Route path={"/home"} exact component={Dashboard}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;