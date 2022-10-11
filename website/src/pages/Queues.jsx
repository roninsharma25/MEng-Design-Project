import React, { useEffect, useState } from "react"
import { 
    TextField,
    CardContent,
    Typography,
    CardActions,
    Button,
    Card
} from "@mui/material"

// Navigation imports
import {
    useNavigate
} from "react-router-dom"

export default function Queues({
    user
}) {
    const [queueEntries, setQueueEntries] = useState("No one is in the queue");
    const [queueChanges, setQueueChanges] = useState(0);

    const navigate = useNavigate();
    const goToTAQueues = () => navigate("/instructor")
    const goToStudentQueues = () => navigate("/students")
    const joinQueue = () => navigate("/joinQueue")
    
    const postRequest = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    }

    useEffect( () => {
        fetch("http://localhost:5000/queues/getQueueDatabase?queueID=0")
            .then(resp => resp.json())
            .then(resp => setQueueEntries(resp.data.queue))
            .catch(err => console.log(err))
    }, [queueChanges])

    // function joinQueue() {
    //     fetch("http://localhost:5000/queues/addQueueEntryDatabase?queueID=0", postRequest)
    //         .then(() => setQueueChanges(queueChanges + 1))
    //         .catch(err => console.log(err))   
    // }

    function clearQueue() {
        fetch("http://localhost:5000/queues/createQueueDatabase?queueID=0", postRequest)
            .then(() => setQueueChanges(queueChanges + 1))
            .catch(err => console.log(err))   
    }

    function removeQueueEntry() {
        fetch("http://localhost:5000/queues/removeQueueEntryDatabase?queueID=0?entryID=0", postRequest)
            .then(() => setQueueChanges(queueChanges + 1))
            .catch(err => console.log(err))  
    }

    const listStyle = {
        width: 400, 
        height: 400,
        margin: 20,
        textAlign: "center",
        paddingTop: 100
    }

    const prof = (
        <React.Fragment>
          <CardContent >
            <h2>PROFESSOR'S OH (4PM - 6PM)</h2>
            <h3># Students ahead: 0</h3>
            <h3>Average wait time: 5 minutes</h3>
            <Button variant="contained" onClick={joinQueue}>View Queue!</Button>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={clearQueue}>Clear Queue!</Button>
            <p>{queueEntries}</p>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={removeQueueEntry}>Remove Queue Entry!</Button>
          </CardContent>
        </React.Fragment>
      );
 
    const ta = (
    <React.Fragment>
        <CardContent>
            <h2>TA'S OH (5PM - 9PM)</h2>
            <h3># Students ahead: 10</h3>
            <h3>Average wait time: 2 hours</h3>
            <Button variant="contained" onClick={goToTAQueues}>Join Queue!</Button>
        </CardContent>
    </React.Fragment>
    );

    const student = (
    <React.Fragment>
        <CardContent>
            <h2>TA'S OH (5PM - 9PM)</h2>
            <h3># Students ahead: 10</h3>
            <h3>Average wait time: 2 hours</h3>
            <Button variant="contained" onClick={goToStudentQueues}>Join Queue!</Button>
        </CardContent>
    </React.Fragment>
    );

    return (
        <div style={{display: "flex"}}>
            <Card variant="outlined" style={listStyle}>{prof}</Card>
            <Card variant="outlined" style={listStyle}>{ta}</Card>
            <Card variant="outlined" style={listStyle}>{student}</Card>
        </div>
        
    )
}
