import { useState } from "react"
import { 
    TextField,
    Button 
} from "@mui/material"

// Navigation imports
import {
    useNavigate
} from "react-router-dom"

// This appears when the student clicks the join queue button
// Stuff to include:
    // Text box for students to enter their question
    // Submit button which invokes the API endpoint
export default function JoinQueue({
    user
}) {

    const [questionTitle, setQuestionTitle] = useState("")

    const navigate = useNavigate();
    const goToStudentQueues = () => navigate("/students")

    const textFieldStyle = {
        margin:"1%",
        width: "400px"
    }
    
    const addQueueEntry = () => {
        let newQueueEntry = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
              'class': 1110, // hard-coded for now
              'email': user.email,
              'questionTitle': questionTitle
            }
        }

        newQueueEntry['body'] = JSON.stringify(newQueueEntry['body'])

        fetch('/queueing/addQueueEntry', newQueueEntry)
            .then(() => goToStudentQueues()) // used to reload the answers
            .catch(err => console.log(err))

    }

    return (
        <div style={{marginTop: "50px", marginLeft: "25px"}}>
            <TextField id="outlined-search" label="Question Title" type="search" 
            style={textFieldStyle} value={questionTitle} 
            onChange={(e) => setQuestionTitle(e.target.value)} />

            <Button variant="contained" onClick={addQueueEntry} style={{marginLeft: 10, top: "10px"}}>Join Queue!</Button>
        </div>
    )
}

