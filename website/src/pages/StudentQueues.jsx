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

  
  const entries = [0]
  const queue = entries.map(() => <TAQueuePreview/>)

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
