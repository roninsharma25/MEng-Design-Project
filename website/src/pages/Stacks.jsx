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

export default function Stacks({
    user
}) {
    const [stackEntries, setStackEntries] = useState("No one is in the stack");
    const [stackChanges, setStackChanges] = useState(0);
    const [userType, setUserType] = useState("");

    const navigate = useNavigate();
    const goToTAStacks = () => navigate("/instructor_stacks")
    const goToStudentStacks = () => navigate("/students")
    const joinStack = () => navigate("/joinStack")
    
    const postRequest = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
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
            <Button variant="contained" onClick={joinStack}>View Stack!</Button>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={joinStack}>Clear Stack!</Button>
          </CardContent>
        </React.Fragment>
      );
 
    const ta = (
    <React.Fragment>
        <CardContent>
            <h2>TA'S OH (5PM - 9PM)</h2>
            <h3># Students ahead: 10</h3>
            <h3>Average wait time: 2 hours</h3>
            <Button variant="contained" onClick={goToTAStacks}>View Stack!</Button>
        </CardContent>
    </React.Fragment>
    );

    const student = (
    <React.Fragment>
        <CardContent>
            <h2>TA'S OH (5PM - 9PM)</h2>
            <h3># Students ahead: 10</h3>
            <h3>Average wait time: 2 hours</h3>
            <Button variant="contained" onClick={joinStack}>Join Stack!</Button>
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
