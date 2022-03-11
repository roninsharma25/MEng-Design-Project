// Navigation imports
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

// Component imports
import Login from "./Login"
import Signup from "./Signup"
import Welcome from "./Welcome"

export default function Unauthorized({
    authenticate,
    centerStyle
}) {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login authenticate={authenticate} centerStyle={centerStyle}/>}/>
                    <Route path="/signup" element={<Signup authenticate={authenticate} centerStyle={centerStyle}/>}/>
                    <Route path="/" element={<Welcome centerStyle={centerStyle}/>}/>
                </Routes>
            </Router>
        </div>
    )

}
