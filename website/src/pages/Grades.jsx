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


export default function Grades({
    user
}) {
    const [grades, setGrades] = useState([]);
    const [showGrades, setShowGrades] = useState(true);
    const [numChanges, setNumChanges] = useState(0);

    const generalStyle = {
        marginLeft: "2%",
        position: "absolute",
        left: "35%"
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
    
    // let messagesTemp;
    // let messages;
    // if (chatMessages.length) {
    //     messagesTemp = [...chatMessages];
    //     messagesTemp.forEach(elm => console.log(elm.message))
    //     messages = messagesTemp.map( (elm, i) =>
    //         <React.Fragment>
    //             <div style={{display: "flex"}}>
    //                 <div style={{width: "33.3%"}}>
    //                     {elm.message}
    //                 </div>
    //                 <div style={{fontSize: "10px", marginTop: "3px", width: "33.3%"}}>
    //                     ({elm.email})
    //                 </div>
    //                 <div style={{marginTop: "-5px", width: "33.3%"}}>
    //                     <Avatar sx={{ width: 30, height: 30 }}> {elm.email.charAt(0)} </Avatar>
    //                 </div>
    //             </div>
    //             <br />
    //         </React.Fragment>
    //     )
    //     console.log('MESSAGES');
    //     console.log(messages);
    // }

    // const sendMessage = () => {
    //     let postRequest = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: {
    //             'email': user.email,
    //             'message': messageBody
    //         }
    //     }

    //     postRequest['body'] = JSON.stringify(postRequest['body']);
    //     fetch('http://localhost:5004/', postRequest)
    //     .then(() => setNumChanges(numChanges + 1)) // used to reload the messages
    //     .catch(err => console.log(err))
        
    //     // Clear the message body
    //     setMessageBody('');
    // }

    if (showGrades) {
        return (
            <div style={generalStyle}>
                <h1>Grades</h1>
                <hr />

                <div>
                    { grades_display }
                </div>

                <br />

                <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={hideGrades}>Hide Grades</Button>

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