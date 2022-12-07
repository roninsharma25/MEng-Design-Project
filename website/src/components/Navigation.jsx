import React, { useRef } from "react"
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Tooltip, 
  IconButton, 
  Avatar,
  Stack, Button
} from "@mui/material";
import { FILL_GRADIENT, FILL_WIDTH } from "../utils/styles"
import HomeIcon from "@mui/icons-material/Home"
import { Link, useNavigate } from "react-router-dom"
import { NAVBAR_HEIGHT } from "../utils/constants"

export default function Navigation({
  setAuthenticated,
  courses,
  setCourse,
  courseIndex,
  userInfo
}) {
  const navigate = useNavigate()
  const index = courseIndex
  const selector = useRef(null);

  const style = {
    ...FILL_GRADIENT,
    ...FILL_WIDTH,
    height: NAVBAR_HEIGHT,
    marginTop: 0,
    backgroundColor: "blue",
    overflow: "auto",
    display: "flex",
    flexDirection: "row"
  }

  const leftSide = {
    width: "200px",
    margin: "10px"
  }

  const rightSide = {
    margin: "8px",
    textAlign: "right",
    width: "100",
    overflow: "auto",
    display: "block",
    flexDirection: "row"
  }

  function logout() {
    setAuthenticated(false)
    navigate("/")
  }

  function handleChange() {
    setCourse(index)
    selector.label = courses[index]
  }

  function handleClick() {
    logout()
  }

  function goToPosts() {
    navigate("/posts")
  }

  function goToQueues() {
    navigate("/queues")
  }

  function goToGlobalChat() {
    navigate("/globalChat")
  }


  return (
    <div style={style}>
      <div style={leftSide}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            ref={selector}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={index}
            label={courses[index]}
            onChange={handleChange}
          >
            <MenuItem value={0}>{courses[0]}</MenuItem>
            <MenuItem value={1}>{courses[1]}</MenuItem>
            <MenuItem value={2}>{courses[2]}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={rightSide}>
        <Stack spacing={2} direction="row" style={{position:"absolute", right:0}}>
          <Button>{userInfo.Name}, {userInfo.Type}</Button>
          <Button variant="contained" onClick={goToPosts}>Posts</Button>
          <Button variant="contained" onClick={goToQueues}>Queues</Button>
          <Button variant="contained">Stacks</Button>
          <Button variant="contained" onClick={goToGlobalChat}>Global Chat</Button>
          <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ width: 50, height: 50 }}>M</Avatar>
          </IconButton>
          </Tooltip>
        </Stack>
        
      </div>
      
    </div>
      
    )

}