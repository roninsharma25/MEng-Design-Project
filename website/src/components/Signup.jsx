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

    function signUp() {
        setAuthenticated(true)
        navigate("/")
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
