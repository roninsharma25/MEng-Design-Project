import React, { Component } from 'react';
import { signInWithGoogle } from './Firebase';

export default class Login extends Component {

    render() {

        return (
            <div className="Login">
                <button onClick={signInWithGoogle}>Sign In</button>
            </div>
        )
    }
}
