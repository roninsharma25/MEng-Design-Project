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
import HomeIcon from "@mui/icons-material/Home"
import { Link, useNavigate } from "react-router-dom"



export default function Navigation({
  authenticate,
  gradient,
  courses,
  setCourse,
  courseIndex
}) {
  const navigate = useNavigate()
  const index = courseIndex
  const selector = useRef(null);

  const style = {
    ...gradient,
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
    authenticate(false)
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


  return (
    <div style={style}>
      <div style={leftSide}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
          <Button>test</Button>
          <Button variant="contained" onClick={goToPosts}>Posts</Button>
          <Button variant="contained" onClick={goToQueues}>Queues</Button>
          <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            // aria-controls={open ? 'account-menu' : undefined}
            // aria-haspopup="true"
            // aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }}>M</Avatar>
          </IconButton>
          </Tooltip>
        </Stack>
        
      </div>
      
    </div>
      
    )

}

{/* <ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/settings">Settings</Link>
  </li>
  <li>
    <Link to="/account">Account</Link>
    <ul>
      <li onClick={logout}>
        <Link to="/">Logout</Link>
      </li>
    </ul>
  </li>
</ul> */}