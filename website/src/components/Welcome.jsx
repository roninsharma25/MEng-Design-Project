// UI imports
import { 
    TextField,
    Button
} from "@mui/material"

// Navigation imports
import {
    useNavigate
} from "react-router-dom"

export default function Welcome({
    centerStyle
}) {
    const navigate = useNavigate()

    function goToSignup() {
        navigate("./signup")
    }

    function goToLogin() {
        navigate("./login")
    }
    
    return (
        <div style={centerStyle}>
            <h1>Welcome to Help Me Out</h1>
            <Button variant="contained" onClick={goToSignup}>Signup</Button>
            <br/>
            <br/>
            <Button variant="contained" onClick={goToLogin}>Login</Button>
            <br/>
        </div>
    )
}
