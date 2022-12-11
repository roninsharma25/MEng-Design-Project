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


export default function GlobalChat({
    user
}) {
    const [chatMessages, setChatMessages] = useState([]);
    const [numChanges, setNumChanges] = useState(0);
    const [messageBody, setMessageBody] = useState('');

    const generalStyle = {
        marginLeft: "2%",
        position: "absolute",
        left: "35%"
    }

    const textFieldStyle = {
        width: "520px", 
    }

    useEffect( () => {
        fetch("http://localhost:5004/all")
          .then(resp => resp.json())
          .then(resp => { 
            setChatMessages(resp.result)
            console.log(resp);
          })
          .catch(err => console.log(err))
      }, [numChanges]);
    
    let messagesTemp;
    let messages;
    if (chatMessages.length) {
        messagesTemp = [...chatMessages];
        messagesTemp.forEach(elm => console.log(elm.message))
        messages = messagesTemp.map( (elm, i) =>
            <React.Fragment>
                <div style={{display: "flex"}}>
                    <div style={{width: "33.3%"}}>
                        {elm.message}
                    </div>
                    <div style={{fontSize: "10px", marginTop: "3px", width: "33.3%"}}>
                        ({elm.email})
                    </div>
                    <div style={{marginTop: "-5px", width: "33.3%"}}>
                        <Avatar sx={{ width: 30, height: 30 }}> {elm.email.charAt(0)} </Avatar>
                    </div>
                </div>
                <br />
            </React.Fragment>
        )
        console.log('MESSAGES');
        console.log(messages);
    }

    const sendMessage = () => {
        let postRequest = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                'email': user.email,
                'message': messageBody
            }
        }

        postRequest['body'] = JSON.stringify(postRequest['body']);
        fetch('http://localhost:5004/', postRequest)
        .then(() => setNumChanges(numChanges + 1)) // used to reload the messages
        .catch(err => console.log(err))
        
        // Clear the message body
        setMessageBody('');
    }

    const clearMessages = () => {
        let deleteRequest = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: { }
        }

        deleteRequest['body'] = JSON.stringify(deleteRequest['body']);
        fetch('http://localhost:5004/clearChat', deleteRequest)
        .then(() => setNumChanges(numChanges + 1)) // used to reload the messages
        .catch(err => console.log(err))
        
    }

    const pollMessages = () => {
        setNumChanges(numChanges + 1);
    }

    console.log('EMAIL ---');
    console.log(user.email)
    console.log(typeof(user.email))
    console.log(user.email.charAt(0))
    return (
        <div style={generalStyle}>
            <h1>Global Chat</h1>
            <hr />
            <br />
            <br />

            <div>
                { messages }
            </div>

            <TextField id="outlined-search" label="New Message" type="search" multiline rows={5} style={textFieldStyle}
            onChange={(e) => setMessageBody(e.target.value)} value={messageBody}/>

            <br />
            <br />

            <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={sendMessage}>Send Message</Button>
            <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={pollMessages}>Poll Messages</Button>
            <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={clearMessages}>Clear Messages</Button>

        </div>
    );

  
}