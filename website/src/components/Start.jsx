// Navigation imports
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import { FILL_PARENT, FILL_GRADIENT } from "../utils/styles"

// Component imports
import Login from "./Login"
import Signup from "./Signup"
import Welcome from "./Welcome"

export default function Start({
    setAuthenticated
}) {

    const containerStyle = {
        ...FILL_PARENT,
        ...FILL_GRADIENT
    }

    return (
        <div style={containerStyle}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
                    <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated}/>}/>
                    <Route path="/" element={<Welcome/>}/>
                </Routes>
            </Router>
        </div>
            
    )

}
