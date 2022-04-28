import React, { useState, useEffect } from "react"
import { 
    TextField,
    CardContent,
    Typography,
    CardActions,
    Button,
    Card
} from "@mui/material"
import PostPreview from "../components/PostPreview"
import { BACKEND, SIDEBAR_WIDTH } from "../utils/constants"

export default function Posts() {

  const [index, setIndex] = useState(-1)
  const [posts_, setPosts] = useState([])

  useEffect( () => {
    fetch("/posts/all")
      .then(resp => resp.json())
      .then(resp => setPosts(resp.result))
      .catch(err => console.log(err))
      
    console.log('ALL POSTS')
    console.log(posts_);
  }, [])
  

  const sidebar = {
    width: SIDEBAR_WIDTH,
    maxHeight: "100%",
    overflowY: "scroll"
  }

  const content = {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    overflowY: "scroll"
  }

  const listStyle = {
      width:"98%", 
      margin:"1%"
  }

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

  const posts = [0, 1, 2] //, 3, 4, 5, 6]
  const previews = posts.map((elm, i) => <PostPreview index={i} setIndex={setIndex} selectedIndex={index} author={'test'} />)
  return (
      <div style={{display: "flex"}}>
          <div id="sidebar" style={sidebar}>
              <TextField id="outlined-search" label="Search field" type="search" style={listStyle}/>
              { previews }
          </div>
          <div id="content" style={content}>
              <Card variant="outlined" style={listStyle}>{question}</Card>
              <br/>
              <h1 style={listStyle}>Comments</h1>
              <Card variant="outlined" style={listStyle}>{comment}</Card>
              <Card variant="outlined" style={listStyle}>{comment}</Card>
              <TextField style={listStyle}
                id="outlined-multiline-static"
                label="Leave a comment"
                multiline
                rows={4}
                defaultValue=""
              />
              <div style={{ textAlign: "right" }}>
                <Button variant="contained" style={{marginLeft:10, marginRight:10}}>Post Comment</Button>
              </div>
              <div style={{ height: 100 }} /> 
          </div>
      </div>
  )
}
