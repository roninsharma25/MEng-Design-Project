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

export default function StudentQueues() {

  const [entries, setEntries] = useState([])

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

  const queue = entries.map((e) => <TAQueuePreview name={e.email}/>)

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
