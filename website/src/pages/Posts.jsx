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
  const [text, setText] = useState("")
  const [numTextChanges, setNumTextChanges] = useState(0)

  useEffect( () => {
    fetch("/posts/all")
      .then(resp => resp.json())
      .then(resp => { 
        setPosts(resp.result)
        console.log('RESULT')
        console.log(resp.result)
      })
      .catch(err => console.log(err))
      
    console.log('ALL POSTS')
    console.log(posts_);
  }, [numTextChanges])

  let patchRequest = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: {
      '_id': '',
      'class': '',
      'email': '',
      'answer': ''
    }
  }

  function addAnswer() {
    if (text !== '') {
      let currentPost = posts_[index]
      patchRequest['body']['_id'] = currentPost._id
      patchRequest['body']['class'] = currentPost.class_
      patchRequest['body']['email'] = currentPost.email // SHOULD BE OF THE USER INSTEAD
      patchRequest['body']['answer'] = text

      patchRequest['body'] = JSON.stringify(patchRequest['body'])

      fetch('/posts/addAnswerToPost', patchRequest)
        .then(() => setNumTextChanges(numTextChanges + 1))
        .then(() => setText(''))
        .catch(err => console.log(err))
    }
  }
  
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

  const posts = [0, 1, 2, 3, 4, 5, 6]
  let previews
  let questions = []
  let instructorAnswers = []
  let studentAnswers = []

  if (posts_.length) {
    previews = posts.map((elm, i) => <PostPreview index={i} setIndex={setIndex} selectedIndex={index} author={posts_[i].author.Name}
    title={posts_[i].question} />);

    questions = posts.map((elm, i) => 
      <React.Fragment>
        <CardContent>
          <h1>{posts_[i].question}</h1>
          <h3>{posts_[i].author.Name}</h3>
          <p>Question</p>
        </CardContent>
      </React.Fragment>
    )

    posts.forEach((elm, i) => {
      instructorAnswers.push(posts_[i].instructorAnswers.map((elm) => 
        <Card variant="outlined" style={listStyle}>{elm.content}</Card>
        )
      )

      studentAnswers.push(posts_[i].studentAnswers.map((elm) => 
        <Card variant="outlined" style={listStyle}>{elm.content}</Card>
        )
      )
    })

  } else {
    previews = posts.map((elm, i) => <PostPreview index={i} setIndex={setIndex} selectedIndex={index} />)
    posts.forEach(() => questions.push(question))
    posts.forEach(() => {
      instructorAnswers.push(comment)
      studentAnswers.push(comment)
    })
  }


  console.log('CURRENT RUN')
  console.log(posts_)
  
  if (index !== -1) {
    let currentPost = posts_[index]
    console.log(currentPost._id)
    console.log(currentPost.class_)
    console.log(currentPost.email)
  }

  return (
      <div style={{display: "flex"}}>
          <div id="sidebar" style={sidebar}>
              <TextField id="outlined-search" label="Search field" type="search" style={listStyle}/>
              { previews }
          </div>
          <div id="content" style={content}>
              <Card variant="outlined" style={listStyle}>{(index === -1) ? question : questions[index]}</Card>
              <br/>
              <h1 style={listStyle}>Comments</h1>
              { (index === -1) ? <Card variant="outlined" style={listStyle}>{comment}</Card> : instructorAnswers[index] }
              { (index === -1) ? <Card variant="outlined" style={listStyle}>{comment}</Card> : studentAnswers[index] }
              {/* <Card variant="outlined" style={listStyle}>{comment}</Card>
              <Card variant="outlined" style={listStyle}>{comment}</Card> */}
              <TextField style={listStyle} value={text} onChange={(e) => setText(e.target.value)}
                id="outlined-multiline-static"
                label="Leave a comment"
                multiline
                rows={4}
                defaultValue=""
              />
              <div style={{ textAlign: "right" }}>
                <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={addAnswer}>Post Comment</Button>
              </div>
              <div style={{ height: 100 }} /> 
          </div>
      </div>
  )
}
