import React, { useState, useEffect } from "react";
import { 
    TextField,
    CardContent,
    Typography,
    CardActions,
    Button,
    Card
} from "@mui/material"


export default function GlobalChat({
    user
}) {
    const [chatMessages, setChatMessages] = useState([]);
    const [numChanges, setNumChanges] = useState(0);
    const [messageBody, setMessageBody] = useState('');

    const textFieldStyle = {
        width:"98%", 
        margin:"1%"
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
                <br />
                <p>{elm.message}</p>
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

    return (
        <div>
            <h1>Global Chat</h1>
            <br />
            <br />

            <div>
                { messages }
            </div>

            <TextField id="outlined-search" label="New Message" type="search" multiline rows={5} style={textFieldStyle}
            onChange={(e) => setMessageBody(e.target.value)} value={messageBody}/>
            <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={sendMessage}>Send Message</Button>

        </div>
    );

  
}