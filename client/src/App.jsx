import React from "react";
import './App.css';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Dashboard from "../src/components/DataAnalytics/Dashboard.jsx"
import Sidebar from "../src/components/HomeScreen/SideBar.jsx"

const App = () => {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div>
                <BrowserRouter>
                    <p>Home</p>
                    <Link to="/data-analytics">Data Analytics</Link>
                    <Switch>
                        <Route path={"/home"} exact component={Dashboard}>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>

    )
}

export default App;