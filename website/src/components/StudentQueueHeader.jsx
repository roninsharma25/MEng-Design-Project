import { useState } from "react"
import { Button } from "@mui/material"
import { POST_PREVIEW_HEIGHT, SELECTION_BORDER_WIDTH, SIDEBAR_WIDTH } from "../utils/constants"
import { CENTER_CONTENT, FILL_GRADIENT } from "../utils/styles";

export default function StudentQueueHeader({
    queuePosition,
    assignedTA
}) {

    // STYLES ******************************************************************

    const containerStyle = {
        borderRadius: 10,
        height: POST_PREVIEW_HEIGHT * 3.5,
        padding: SELECTION_BORDER_WIDTH,
        margin: 5
    }

    const selectedStyle = {
        ...containerStyle,
        ...FILL_GRADIENT
    }

    const unselectedStyle = {
        ...containerStyle,
        background: "#BBBBBB"
    }

    const contentStyle = {
        ...CENTER_CONTENT,
        borderRadius: 9,
        background: "white",
        width: "100%",
        height: POST_PREVIEW_HEIGHT * 3.5,
    }    
    
    // RENDER ******************************************************************

    return (
        <div style={selectedStyle}>
            <div style={contentStyle}>
                <h1 style={{padding: 10, margin:0}}>TA OH</h1>
                <h2 style={{padding: 10, margin:0}}>4:00PM - 6:00PM</h2>
                <h3 style={{padding: 10, margin:0}}># Students ahead: 20</h3>
                <h3 style={{padding: 10, margin:0}}>4:00PM - 6:00PM</h3>
                
                <br/>
                <br/>

                <h3 style={{padding: 10, margin:0}}>Your Queue Position: {queuePosition}</h3>


                <h3 style={{padding: 10, margin:0}}>Assigned TA: {assignedTA}</h3>


                <Button variant="text" style={{marginLeft:10, marginRight:10}}>Leave Queue</Button>

            </div>
        </div>
    )
}
