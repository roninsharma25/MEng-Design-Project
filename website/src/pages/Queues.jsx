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
    const [userType, setUserType] = useState("");

    const navigate = useNavigate();
    const goToTAQueues = () => navigate("/instructor")
    const goToStudentQueues = () => navigate("/students")
    const joinQueue = () => navigate("/joinQueue")
    
    const postRequest = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    }

    const getUserType = async (email) => {
        await fetch('http://localhost:5000/users/type?email=' + email)
          .then(resp => resp.json())
          .then(resp => {
            setUserType(resp.result)
          })
          .catch(err => console.log(err))
    };

    getUserType(user.email);
    console.log(userType)

    const determineIfInQueue = async (criteria, value) => {
        await fetch(`http://localhost:5001/inQueue?criteria=${criteria}&value=${value}`)
          .then(resp => resp.json())
          .then(resp => {
            if (userType !== "Student" && resp.result) goToStudentQueues()
          })
          .catch(err => console.log(err))
    };

    determineIfInQueue('email', user.email);

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
            <Button variant="contained" onClick={joinQueue}>Clear Queue!</Button>
            <p>{queueEntries}</p>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={joinQueue}>Remove Queue Entry!</Button>
          </CardContent>
        </React.Fragment>
      );
 
    const ta = (
    <React.Fragment>
        <CardContent>
            <h2>TA'S OH (5PM - 9PM)</h2>
            <h3># Students ahead: 10</h3>
            <h3>Average wait time: 2 hours</h3>
            <Button variant="contained" onClick={goToTAQueues}>View Queue!</Button>
        </CardContent>
    </React.Fragment>
    );

    const student = (
    <React.Fragment>
        <CardContent>
            <h2>TA'S OH (5PM - 9PM)</h2>
            <h3># Students ahead: 10</h3>
            <h3>Average wait time: 2 hours</h3>
            <Button variant="contained" onClick={joinQueue}>Join Queue!</Button>
        </CardContent>
    </React.Fragment>
    );

    let middleCard = (userType === "Student") ? student : ta;
    console.log('USER TYPE')
    console.log(userType)

    return (
        <div style={{display: "flex"}}>
            <Card variant="outlined" style={listStyle}>{prof}</Card>
            <Card variant="outlined" style={listStyle}>{middleCard}</Card>
            <Card variant="outlined" style={listStyle}>{student}</Card>
        </div>
        
    )
}
