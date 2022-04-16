import { useState } from "react"
import { Button } from "@mui/material"
import { POST_PREVIEW_HEIGHT, SELECTION_BORDER_WIDTH, SIDEBAR_WIDTH } from "../utils/constants"
import { CENTER_CONTENT, FILL_GRADIENT } from "../utils/styles";

export default function TAQueueHeader() {

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
                <h1 style={{padding: 10, margin:0}}>Professor OH</h1>
                <h2 style={{padding: 10, margin:0}}>4:00PM - 6:00PM</h2>
                <h3 style={{padding: 10, margin:0}}># Students ahead: 20</h3>
                <h3 style={{padding: 10, margin:0}}>4:00PM - 6:00PM</h3>

                <Button variant="contained">Clock Out</Button> 
                <br/>
                <br/>
                <Button variant="contained">Assign me to the next student</Button>
                <br/>
                <br/>
                <Button variant="text" style={{marginLeft:10, marginRight:10}}>Active Queue</Button>
                <Button variant="text" style={{marginLeft:10, marginRight:10}}>Inactive Queue</Button>
                <Button variant="text" style={{marginLeft:10, marginRight:10}}>My Queue</Button>
                
            </div>
        </div>
    )
}
