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
  const [editCommentText, setEditCommentText] = useState("Edit Comment")
  const [commentStateMatrix, setCommentStateMatrix] = useState(Array.from({length: 10},()=> Array.from({length: 10}, () => "Edit Comment")));
  const [commentValueMatrix, setCommentValueMatrix] = useState(Array.from({length: 10},()=> Array.from({length: 10}, () => "")));
  const [editPostText, setEditPostText] = useState("Edit Post")
  const [postContent, setPostContent] = useState("")
  
  const [creatingPost, setCreatingPost] = useState(false)
  const [creatingPostQuestionTitle, setCreatingPostQuestionTitle] = useState('')
  const [creatingPostQuestionBody, setCreatingPostQuestionBody] = useState('')


  useEffect( () => {
    fetch("http://localhost:5000/all")
      .then(resp => resp.json())
      .then(resp => { 
        setPosts(resp.result)
      })
      .catch(err => console.log(err))
  }, [numTextChanges])



  console.log('USER')
  console.log(user)
  console.log(user.email)
  console.log(user.displayName)

  function addAnswer() {
    if (text !== '') {
      let currentPost = posts_[index];
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

  function updateAnswer(oldAnswer, newAnswer) {
    let currentPost = posts_[index]
    let patchRequestUpdateAnswer = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: {
        'postDetails': {},
        'oldAnswer': '',
        'newAnswer': ''
      }
    }
    patchRequestUpdateAnswer['body']['postDetails']['question'] = currentPost.question
    patchRequestUpdateAnswer['body']['postDetails']['email'] = currentPost.email
    patchRequestUpdateAnswer['body']['postDetails']['name'] = currentPost.name
    patchRequestUpdateAnswer['body']['oldAnswer'] = oldAnswer
    patchRequestUpdateAnswer['body']['newAnswer'] = newAnswer

    patchRequestUpdateAnswer['body'] = JSON.stringify(patchRequestUpdateAnswer['body'])

    fetch('/updateAnswerToPost', patchRequestUpdateAnswer)
      .then(() => setNumTextChanges(numTextChanges + 1)) // used to reload the answers
      .catch(err => console.log(err))
  }

  function addNewPostToDatabase(questionTitle, questionBody) {
    let newPostDetails = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        'question': '',
        'questionBody': '',
        'email': '',
        'role': '',
        'class': '',
        'name': '',

      }
    }
    
    newPostDetails['body']['question'] = questionTitle
    newPostDetails['body']['questionBody'] = questionBody
    newPostDetails['body']['email'] = 'test@gmail' // hard-coded for now
    newPostDetails['body']['role'] = 'student' // hard-coded for now
    newPostDetails['body']['class'] = 'JAM 1110' // hard-coded for now
    newPostDetails['body']['name'] = user.displayName

    newPostDetails['body'] = JSON.stringify(newPostDetails['body'])

    fetch('/', newPostDetails)
      .then(() => setNumTextChanges(numTextChanges + 1)) // used to reload the answers
      .catch(err => console.log(err))
  }

  function getFilteredPosts(value) {
    fetch(`http://localhost:5000/some?criteria=question&value=${value}`) // only filter by the question field for now
    .then(resp => resp.json())
    .then(resp => { 
      setPosts(resp.result)
    })
    .catch(err => console.log(err))
  }

  function newPost() {
    setCreatingPost(true);
  }

  function createPost() {
    addNewPostToDatabase(creatingPostQuestionTitle, creatingPostQuestionBody)
    setCreatingPost(false)
  }

  function editPost() {
    if (editPostText === 'Edit Post') {
      setEditPostText('Update Post')
    } else {
      setEditPostText('Edit Post')
      let currentPost = posts_[index]
      let patchRequestUpdatePostContent = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: {
          'postDetails': {
            'class': currentPost.class,
            'email': currentPost.email,
            'question': currentPost.question,
            'questionBody': currentPost.questionBody
          },
          'questionBody': postContent
        }
      }

      patchRequestUpdatePostContent['body'] = JSON.stringify(patchRequestUpdatePostContent['body'])

      fetch('/', patchRequestUpdatePostContent)
        .then(() => setNumTextChanges(numTextChanges + 1)) // used to reload the answers
        .catch(err => console.log(err))
    }
      
  }

  function deletePost() {

    let currentPost = posts_[index]
    let deletePostRequest = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: {
        'class': currentPost.class,
        'email': currentPost.email,
        'question': currentPost.question,
        'questionBody': currentPost.questionBody
      }
    }
    
    deletePostRequest['body'] = JSON.stringify(deletePostRequest['body'])
    
    fetch('/', deletePostRequest)
      .then(() => setNumTextChanges(numTextChanges + 1)) // used to reload the answers
      .catch(err => console.log(err))
    
    setIndex(-1)
    
  }

  function editComment(i, j, event, postInformation) {
    let commentStateMatrixCopy = [...commentStateMatrix];
    if (commentStateMatrixCopy[i][j] === "Edit Comment") {
      commentStateMatrixCopy[i][j] = "Update Comment" 
    } else {
      commentStateMatrixCopy[i][j] = "Edit Comment";
      
      let oldAnswer = postInformation.answers[j].answer;
      let newAnswer = commentValueMatrix[i][j];
      updateAnswer(oldAnswer, newAnswer)
    }
    setCommentStateMatrix(commentStateMatrixCopy);    
  }

  function updateCommentValueMatrix(i, j, value) {
    let commentValueMatrixCopy = [...commentValueMatrix];
    commentValueMatrixCopy[i][j] = value;
    setCommentValueMatrix(commentValueMatrixCopy);
  }

  function deleteComment() {
    
  }

  const goBackToPosts = () => setCreatingPost(false)

  const getName = async (email) => {
    await fetch('http://localhost:5002/oneUser?email=' + email)
      .then(resp => resp.json())
      .then(resp => {
        return resp.result.name
      })
  }
  
  const sidebar = {
    width: SIDEBAR_WIDTH,
    maxHeight: "100%",
    overflowY: "scroll",
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

  const searchFieldStyle = {
    width:"50%", 
    margin:"1%"
  }

  const newPostStyle = {
    width:"40%",
    margin:"1%",
    top:"10px",
    left:"5px",
    height:"5%"
  }

  const questionTitleStyle = {
    width:"500px"
  }

  const questionBodyStyle = {
    width:"200%",
    height:"200%"
  }

  const postBodyStyle = {
    width:"100%",
    height:"200%"
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

  let posts = [0, 1, 2];
  let commentState = [];
  let previews;
  let questions = [];
  let answers = [];

  if (posts_.length) {
    posts = [...posts_];
    previews = posts.map((elm, i) => <PostPreview index={i} setIndex={setIndex} selectedIndex={index} author={posts_[i].email}
    title={posts_[i].question} />);

    questions = posts.map((elm, i) =>    
      <React.Fragment>
        <CardContent>
          <h1>{posts_[i].question}</h1>
          <h2>{posts_[i].name}</h2>
          <h3>{posts_[i].email}</h3>
          <h3>Role: {posts_[i].role}</h3>
          <h5>Last Updated: {Date(posts_[i].timeUpdated)} </h5>

          { (editPostText === "Edit Post") ? <p>{posts_[i].questionBody}</p> : <TextField style = {postBodyStyle} defaultValue={posts_[i].questionBody}
          multiline rows={5} onChange={(e) => setPostContent(e.target.value)}></TextField> }
          <br></br>
          <br></br>
          {/* onChange={(e) => updateCommentValueMatrix(i, j, e.target.value)}></TextField> } */}

          <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={editPost}>{editPostText}</Button>

          <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={deletePost}>Delete Post</Button>
        </CardContent>
      </React.Fragment>
    )

    commentState = [];
    posts.forEach((elm, i) => {
      commentState.push(Array(posts_[i].answers.length).fill('Edit Comment'));
      answers.push(posts_[i].answers.map((elm, j) => 
        <React.Fragment>
        <CardContent style={{ border: "1px solid blue", marginTop: "25px", marginLeft: "25px", marginRight: "25px" }}>
        
        <h3>{elm.name}</h3>
        <h3>{elm.email}</h3>
        <h3>Role: {elm.role}</h3>


        { (commentStateMatrix[i][j] === "Edit Comment") ? <p>{elm.answer}</p> : <TextField defaultValue={elm.answer} onChange={(e) => updateCommentValueMatrix(i, j, e.target.value)}></TextField> }
        <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={ (e) => editComment(i, j, e, posts_[i]) }>{commentStateMatrix[i][j]}</Button>
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

  if (!creatingPost) {
    return (
        <div style={{display: "flex"}}>
            <div id="sidebar" style={sidebar}>
                <TextField id="outlined-search" label="Search field" type="search" style={searchFieldStyle}
                onBlur={(e) => getFilteredPosts(e.target.value)} />
                <Button variant="contained" style={newPostStyle} onClick={newPost}>New Post</Button>
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
  } else {
    return (
      <div>
        <React.Fragment>
        <CardContent>
          <TextField id="outlined-search" label="Question Title" type="search" style={questionTitleStyle} 
          onChange={(e) => setCreatingPostQuestionTitle(e.target.value)}/>
          <br></br>
          <br></br>
          <TextField id="outlined-search" label="Question Body" type="search" multiline rows={5} style={questionBodyStyle}
          onChange={(e) => setCreatingPostQuestionBody(e.target.value)}/>
          <br></br>
          <br></br>
          <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={createPost}>Create Post</Button>
          <Button variant="contained" style={{marginLeft:10, marginRight:10}} onClick={goBackToPosts}>Back</Button>
        </CardContent>
        </React.Fragment>
      </div>
    )
  } 
}
