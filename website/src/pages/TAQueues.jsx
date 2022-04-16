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

export default function TAQueues() {

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

  
  const entries = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
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
