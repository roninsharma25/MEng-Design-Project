// UI imports
import { 
    TextField,
    Button
} from "@mui/material"
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

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

export default function Login({ 
    setAuthenticated
 }) {
    const navigate = useNavigate();
    const goToSignup = () => navigate("/signup")
    const goToWelcome = () => navigate("/")

    function login() {
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
            <Button variant="contained" onClick={signInWithGoogle}>Login with Google</Button>
            <br/>
            <br/>
            <Button variant="text" onClick={goToSignup}>
                I don't have an account yet
            </Button>
            <br/>
            <Button variant="text" onClick={goToWelcome}>BACK</Button>
        </div>
    )
}
