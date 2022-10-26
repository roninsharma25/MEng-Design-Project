import React, { useState, useEffect } from "react"
import { 
    TextField,
    CardContent,
    Typography,
    CardActions,
    Button,
    Card
} from "@mui/material"
import { BACKEND, SIDEBAR_WIDTH } from "../utils/constants"
import { FILL_PARENT } from "../utils/styles"
import TAQueueHeader from "../components/TAQueueHeader"
import TAQueuePreview from "../components/TAQueuePreview"

export default function TAQueues({
  user
}) {

  const [entries, setEntries] = useState([])
  const [numChanges, setNumChanges] = useState(0)

  const container = {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    overflowY: "scroll"
  }

  const content = {
    width: "60%",
    height: "auto",
    margin: "auto"
  }

  const listStyle = {
      width:"90%", 
      margin:"auto"
  }


  useEffect( () => {
    fetch("http://localhost:5000/queueing/all")
    .then(resp => resp.json())
    .then(resp => { 
      setEntries(resp.result)
      console.log(resp)
      console.log(resp)
    })
    .catch(err => console.log(err))
  }, [])

  console.log('QUEUE ENTRIES')
  console.log(entries)

  const assignFunc = async (email) => {
    let patchRequest = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: {
        'queueEntryDetails': {
          'email': email
        },
        'queueEntryModifications': {
          'assignedTA': user.email
        }
      }
    }

    patchRequest['body'] = JSON.stringify(patchRequest['body'])

    await fetch('/queueing/updateQueueEntry', patchRequest)
      .then(setNumChanges(numChanges + 1))
      .catch(err => console.log(err))
  }


  const removeFunc = async (email) => {
    let deleteRequest = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: {
          'email': email,
          'class': 1110 // HARDCODED FOR NOW
      }
    }

    deleteRequest['body'] = JSON.stringify(deleteRequest['body'])

    await fetch('/queueing/deleteQueueEntry', deleteRequest)
      .then(setNumChanges(numChanges + 1))
      .catch(err => console.log(err))
  }

  const queue = entries.map((e) => <TAQueuePreview name={e.email} questionTitle={e.questionTitle} 
                                        assignedTA={e.assignedTA}
                                        assignToMe={assignFunc} removeFromQueue={removeFunc}/>) 


  return (
    <div style={container}>
        <div style={content}>
            <TAQueueHeader/>
            <div style={listStyle}>
                {queue}
            </div>
        </div>
        
    </div>
  )
}
