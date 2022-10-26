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
import { curveNatural } from "d3"

export default function StudentQueues({
  user
}) {

  const [entries, setEntries] = useState([])
  const [queueEntry, setQueueEntry] = useState("")
  const [numChanges, setNumChanges] = useState(0)


  const getQueueEntry = async (criteria, value) => {
    await fetch(`http://localhost:5000/queueing/one?criteria=${criteria}&value=${value}`)
      .then(resp => resp.json())
      .then(resp => {
        setQueueEntry(resp.result)
      })
      .catch(err => console.log(err))
  };

  useEffect( () => {
    getQueueEntry('email', user.email)
  }, [numChanges])

  console.log('QUEUE ENTRY')
  console.log(queueEntry)

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

  const queue = entries.map((e) => <TAQueuePreview name={e.email} questionTitle={e.questionTitle}/>) 

  return (
    <div style={container}>
        <div style={content}>
            {/* <TAQueueHeader/> */}
            <div style={listStyle}>
                <br></br>
                <br></br>
                Your queue position is: {queueEntry.queuePosition}
                { queueEntry.assignedTA !== '' &&
                  <div>You are up! TA {queueEntry.assignedTA} will be helping you!</div>
                }
            </div>
        </div>
        
    </div>
  )
}
