import React from "react"
import { 
    TextField,
    CardContent,
    Typography,
    CardActions,
    Button,
    Card
} from "@mui/material"

export default function Posts() {
    const sidebar = {
        width: 400,
        height: "100%",
        overflow: "auto"
    }

    const content = {
        width: "100%",
        height: "100%",
        overflow: "auto"
    }

    const listStyle = {
        width:"98%", 
        margin:"1%"
    }

    const card = (
        <React.Fragment>
          <CardContent>
            <h4>Question</h4>
            <p>Firstname Lastname</p>
          </CardContent>
        </React.Fragment>
    );

    const question = (
        <React.Fragment>
          <CardContent>
            <h1>Question Title</h1>
            <h3>Author Name</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
                enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
                enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
                enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </CardContent>
        </React.Fragment>
      );

      const comment = (
        <React.Fragment>
          <CardContent>
            <h3>Author Name</h3>
            <p> This is a comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
                enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, </p>
          </CardContent>
        </React.Fragment>
      );

    return (
        <div style={{display: "flex"}}>
            <div id="sidebar" style={sidebar}>
                <TextField id="outlined-search" label="Search field" type="search" style={listStyle}/>
                <Card variant="outlined" style={listStyle}>{card}</Card>
                <Card variant="outlined" style={listStyle}>{card}</Card>
                <Card variant="outlined" style={listStyle}>{card}</Card>
                <Card variant="outlined" style={listStyle}>{card}</Card>
                <Card variant="outlined" style={listStyle}>{card}</Card>
                <Card variant="outlined" style={listStyle}>{card}</Card>
                <Card variant="outlined" style={listStyle}>{card}</Card>
            </div>
            <div id="content" style={content}>
                <Card variant="outlined" style={listStyle}>{question}</Card>
                <br/>
                <h1 style={listStyle}>Comments</h1>
                <Card variant="outlined" style={listStyle}>{comment}</Card>
                <Card variant="outlined" style={listStyle}>{comment}</Card>
                <Card variant="outlined" style={listStyle}>{comment}</Card>
                <Card variant="outlined" style={listStyle}>{comment}</Card>
            </div>
        </div>
    )
}
