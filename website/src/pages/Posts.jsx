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
import { curveNatural } from "d3"

export default function Posts({
  user
}) {

  const [index, setIndex] = useState(-1)
  const [posts_, setPosts] = useState([])
  const [text, setText] = useState("")
  const [numTextChanges, setNumTextChanges] = useState(0)

  useEffect( () => {
    fetch("http://localhost:5000/all")
      .then(resp => resp.json())
      .then(resp => { 
        setPosts(resp.result)
      })
      .catch(err => console.log(err))
  }, [numTextChanges])

  let patchRequest = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: {
      'postDetails': {
        'question': '',
        'email': '',
        'class': ''
      },
      'newAnswer': {
        'answer': '',
        'name': '',
        'email': '',
        'role': ''
      }
    }
  }

  console.log('USER')
  console.log(user)
  console.log(user.email)
  console.log(user.displayName)

  function addAnswer() {
    if (text !== '') {
      let currentPost = posts_[index]
      patchRequest['body']['postDetails']['question'] = currentPost.question
      patchRequest['body']['postDetails']['email'] = currentPost.email //user.email -- USE THE POST CREATORS EMAIL FOR NOW
      patchRequest['body']['postDetails']['class'] = currentPost.class_
      patchRequest['body']['newAnswer']['answer'] = text
      patchRequest['body']['newAnswer']['name'] = user.displayName
      patchRequest['body']['newAnswer']['email'] = user.email
      patchRequest['body']['newAnswer']['role'] = 'student' // UPDATE THIS

      patchRequest['body'] = JSON.stringify(patchRequest['body'])

      fetch('/addAnswerToPost', patchRequest)
        .then(() => setNumTextChanges(numTextChanges + 1))
        .then(() => setText(''))
        .catch(err => console.log(err))
    }
  }

  function editPost() {

  }

  function deletePost() {
    
  }

  function editComment() {

  }

  function deleteComment() {
    
  }

  const getName = async (email) => {
    await fetch('http://localhost:5002/oneUser?email=' + email)
      .then(resp => resp.json())
      .then(resp => {
        console.log('RESPONSE')
        console.log(resp.result.name)
        return resp.result.name
      })
  }
  
  //let x = getName('Test1234@gmail.com');
  //console.log('X')
  //console.log(x)


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
        <h5>Last Updated:</h5>
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

  const posts = [0, 1, 2]
  let previews
  let questions = []
  let answers = []

  if (posts_.length) {
    previews = posts.map((elm, i) => <PostPreview index={i} setIndex={setIndex} selectedIndex={index} author={posts_[i].email}
    title={posts_[i].question} />);

    questions = posts.map((elm, i) => 
      <React.Fragment>
        <CardContent>
          <h1>{posts_[i].question}</h1>
          <h2>{posts_[i].name}</h2>
          <h3>{posts_[i].email}</h3>
          <h3>Role: {posts_[i].role}</h3>
          <h5>Last Updated: {Date(posts_[i].timeUpdated)}</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.</p>

            <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={editPost}>Edit Post</Button>

            <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={deletePost}>Delete Post</Button>
        </CardContent>
      </React.Fragment>
    )

    posts.forEach((elm, i) => {
      answers.push(posts_[i].answers.map((elm) => 
        <React.Fragment>
        <CardContent>
        
        <h3>{elm.name}</h3>
        <h3>{elm.email}</h3>
        <h3>Role: {elm.role}</h3>
        <p>{elm.answer}</p>

        <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={editComment}>Edit Comment</Button>
        <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={deleteComment}>Delete Comment</Button>
        </CardContent>
        </React.Fragment>

        )
      )
    })

  } else {
    previews = posts.map((elm, i) => <PostPreview index={i} setIndex={setIndex} selectedIndex={index} />)
    posts.forEach(() => questions.push(question))
    posts.forEach(() => {
      answers.push(comment)
    })
  }

  if (index !== -1) {
    let currentPost = posts_[index]
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
              { (index === -1) ? <Card variant="outlined" style={listStyle}>{comment}</Card> : answers[index] }
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
