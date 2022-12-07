import React, { useState, useEffect } from "react"

// UI imports
import { 
    TextField,
    Button
} from "@mui/material"

// Style imports
import { 
    CENTER_CONTENT, 
    CENTER_VERTICAL, 
    CENTER_HORTIZONTAL, 
    ROUNDED_CONTAINER,
    FILL_WHITE
} from "../utils/styles";

// Navigation imports
import {
    useNavigate
} from "react-router-dom"

// Authentication imports
import { 
    signInWithGoogle
} from "./Firebase"

export default function Signup({
    setAuthenticated
}) {
    const navigate = useNavigate();
    const goToLogin = () => navigate("/login") 
    const goToWelcome = () => navigate("/")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function signUp() {
        if (password !== confirmPassword) {
            alert('The passwords do not match!')
        } else {
            let postRequest = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: {
                    'username': username,
                    'password': password
                }
            }

            postRequest['body'] = JSON.stringify(postRequest['body']);
            fetch('http://localhost:5002/', postRequest)
            .catch(err => console.log(err))
            
            // Clear the message body
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    const containerStyle = {
        ...CENTER_CONTENT,
        ...CENTER_VERTICAL,
        ...CENTER_HORTIZONTAL,
        ...ROUNDED_CONTAINER,
        ...FILL_WHITE
    }

    return (
        <div style={containerStyle}>
            <h1>Sign Up</h1>
            <TextField id="outlined-username-input" label="Username" variant="outlined" 
            onChange={(e) => setUsername(e.target.value)} value={username}/>
            <br/>
            <br/>
            <TextField id="outlined-password-input" label="Password" variant="outlined" type ="password" 
            onChange={(e) => setPassword(e.target.value)} value={password}/>
            <br/>
            <br/>
            <TextField id="outlined-password-input" label="Confirm Password" variant="outlined" type ="password" 
            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            <br/>
            <br/>
            <Button variant="contained" onClick={signUp}>Sign up</Button>
            <br/>
            <br/>
            <Button variant="contained" onClick={signInWithGoogle}>Sign up with Google</Button>
            <br/>
            <br/>
            <Button variant="text" onClick={goToLogin}>
                I already have an account
            </Button>
            <br/>
            <Button variant="text" onClick={goToWelcome}>BACK</Button>
        </div>
    )
}
