import { Container, Row } from "react-bootstrap";
import React from "react";
import Sidenav from "../HomeScreen/StructuringElements/SideBar";
import { useState } from "react";

export default function Dashboard() {
    const [isOpen, setBool] = useState(false);

    const handleChildStateChange = (currentBool) => {
        setBool(currentBool);
      };

    return (<>
        <Container fluid>
            <Row>
                <Sidenav onChildStateChange={handleChildStateChange} />
                This is Dashboard
            </Row>
        </Container>
    </>)
}