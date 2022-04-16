import { useState } from "react"
import { Button } from "@mui/material"
import { POST_PREVIEW_HEIGHT, SELECTION_BORDER_WIDTH, SIDEBAR_WIDTH } from "../utils/constants"
import { FILL_GRADIENT } from "../utils/styles";

export default function TAQueuePreview() {

    // STYLES ******************************************************************

    const containerStyle = {
        borderRadius: 10,
        height: POST_PREVIEW_HEIGHT * 1.3,
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
        borderRadius: 9,
        background: "white",
        width: "100%",
        height: POST_PREVIEW_HEIGHT * 1.3,
    }    
    
    // RENDER ******************************************************************

    return (
        <div style={unselectedStyle}>
            <div style={contentStyle}>
                <h3 style={{padding: 10, margin:0}}>Student Name</h3>
                <p style={{padding: 10, margin:0}}>Question Description goes here</p>
                <Button variant="contained" style={{marginLeft: 10}}>Assign to me</Button>
                <Button variant="text" style={{marginLeft: 10}}>Mark as Inactive</Button>
                <Button variant="text" style={{marginLeft: 10}}>Move to My Queue</Button>
            </div>
        </div>
    )
}
