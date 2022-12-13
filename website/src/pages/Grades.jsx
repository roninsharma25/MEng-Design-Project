import React, { useState, useEffect } from "react";
import { 
    TextField,
    CardContent,
    Typography,
    CardActions,
    Button,
    Card,
    Avatar,
} from "@mui/material"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Grades({
    user
}) {
    const [grades, setGrades] = useState([]);
    const [showGrades, setShowGrades] = useState(true);
    const [numChanges, setNumChanges] = useState(0);

    const generalStyle = {
        marginLeft: "2%",
        position: "absolute",
        left: "25%",
        top: "20%",
    }

    const textFieldStyle = {
        width: "520px", 
    }

    useEffect( () => {
        fetch(`http://localhost:5005/all?email=${user.email}`)
          .then(resp => resp.json())
          .then(resp => { 
            formatGrades(resp.result.grades)
            console.log(resp);
          })
          .catch(err => console.log(err))
      }, [numChanges]);
    
    const hideGrades = () => {
        setShowGrades(false);
    }

    const displayGrades = () => {
        setShowGrades(true);
    }

    const formatGrades = (data) => {
        let grades_formatted = [];
        data.forEach( (elm, i) => {
            let key = Object.keys(elm)[0];
            let values = Object.values(elm)[0];
            let keys2 = Object.keys(values);
            let values2 = Object.values(values);

            let temp = [ key ];
            keys2.forEach( (elm, i) => {
                temp.push(elm);
                temp.push(values2[i])
            })
            grades_formatted.push(temp);
        })

        setGrades(grades_formatted);
    }

    console.log('GRADES');
    console.log(grades)

    let grades_display = [];
    if (grades.length) {
        grades_display = grades.map( (elm, i) => 
            <React.Fragment>
                <div style={{border: "2px solid steelblue", padding: "3px"}}>
                    <h3>{ elm[0] }</h3>
                    <div>
                        { elm[1] }: { elm[2] }
                    </div>
                    <div>
                        { elm[3] }: { elm[4] }
                    </div>
                </div>
                <br />
            </React.Fragment>
        )
    }

    const data = [ 
        {
            "Assignment": "A1",
            "Grade": "A+"
        },
        {
            "Assignment": "A2",
            "Grade": "A"
        }
    ]

    if (showGrades) {
        return (
            <div>
                <div style={{position: "absolute", left: "45%"}}>
                    <h1>Grades</h1>
                </div>

                <div style={generalStyle}>
                    <hr />

                    <div>
                        { grades_display }
                    </div>

                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Assignment</TableCell>
                            <TableCell align="center">Grade</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.Assignment}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{row.Assignment}</TableCell>
                            <TableCell align="center">{row.Grade}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                    <br />
                    <div style={{marginLeft: "225px"}}>
                    <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={hideGrades}>Hide Grades</Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div style={generalStyle}>
            <h1>Grades</h1>
                
                <hr />
                <h3>You have chosen to hide your grades!</h3>

                <br />

                <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={displayGrades}>Show Grades</Button>

            </div>
        );

    }
}