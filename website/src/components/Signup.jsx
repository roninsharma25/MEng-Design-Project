// UI imports
import { 
    TextField,
    Button
} from "@mui/material"

// Navigation imports
import {
    useNavigate
} from "react-router-dom"

export default function Signup({
    authenticate,
    centerStyle
}) {
    const navigate = useNavigate();

    function goToLogin() {
        navigate("/login")
    }

    function signUp() {
        authenticate(true)
        navigate("/")
    }

    return (
        <div style={centerStyle}>
            <h1>Sign Up</h1>
            <TextField id="outlined-username-input" label="Username" variant="outlined" />
            <br/>
            <br/>
            <TextField id="outlined-password-input" label="Password" variant="outlined" type ="password"/>
            <br/>
            <br/>
            <TextField id="outlined-password-input" label="Confirm Password" variant="outlined" type ="password"/>
            <br/>
            <br/>
            <Button variant="contained" onClick={signUp}>Sign up</Button>
            <br/>
            <br/>
            <Button variant="contained" onClick={signUp}>Sign up with Google</Button>
            <br/>
            <br/>
            <Button variant="text" onClick={goToLogin}>
                I already have an account
            </Button>
        </div>
    )
}
