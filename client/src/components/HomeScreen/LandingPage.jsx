import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from './SideBar';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import graph from '../DataAnalytics/Dashboard';

export default function LandingPage() {
    return (
        <Container style={{ marginLeft: 0, paddingLeft: 0 }}>
            <Row>
                <Col>
                    <Sidenav />
                </Col>
                <Col>
                    <BrowserRouter>
                        <p>Home</p>
                        <Link to="/data-analytics">Data Analytics</Link>
                        <Switch>
                            <Route path={"/home"} exact component={graph}>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </Col>

            </Row>
        </Container>
    )
}