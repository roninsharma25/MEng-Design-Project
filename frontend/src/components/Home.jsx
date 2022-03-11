import React, { Component } from 'react';
import { auth } from './Firebase';
import Memcached from './Memcached';
import { Button, ButtonGroup, ButtonToolbar, Card, CardBody, CardHeader, CardText, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from 'reactstrap';
import PageTemplate from './PageTemplate';

export default class Home extends Component {

    render() {

        return (
            <div className="Home">
                <h1>Home Page</h1>
                <button onClick = {() => auth.signOut()}>Sign Out</button>
                <Memcached />
                <Button color="primary">Left</Button>
                <PageTemplate />
            </div>
        )
    }
}
