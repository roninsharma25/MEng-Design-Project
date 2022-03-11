// UI imports
import { 
    TextField,
    Button
} from "@mui/material"

// Navigation imports
import {
    useNavigate
} from "react-router-dom"


export default function Login({ 
    authenticate,
    centerStyle
 }) {
    const navigate = useNavigate();

    function goToSignup() {
        navigate("/signup")
    }

    function login() {
        authenticate(true)
        navigate("/")
    }

    return (
        <div style={centerStyle}>
            <h1>Login</h1>
            <TextField id="outlined-username-input" label="Username" variant="outlined" />
            <br/>
            <br/>
            <TextField id="outlined-password-input" label="Password" variant="outlined" type ="password"/>
            <br/>
            <br/>
            <Button variant="contained" onClick={login}>Login</Button>
            <br/>
            <br/>
            <Button variant="contained" onClick={login}>Login with Google</Button>
            <br/>
            <br/>
            <Button variant="text" onClick={goToSignup}>
                I don't have an account yet
            </Button>
        </div>
    )
}
