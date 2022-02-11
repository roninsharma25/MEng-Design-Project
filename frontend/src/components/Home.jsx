import React, { Component } from 'react';
import { auth } from './Firebase';

export default class Home extends Component {

    render() {

        return (
            <div className="Home">
                <h1>Home Page</h1>
                <button onClick = {() => auth.signOut()}>Sign Out</button>
            </div>
        )
    }
}
